'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

import { apiRequest } from '@/lib/api';
import { formatCurrency, getStockStatus } from '@/lib/formatters';
import type { Producto } from '@/types/producto';

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await apiRequest<{ productos: Producto[] }>(
        '/productos?disponible=true'
      );

      setProductos(data.productos);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al cargar productos.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const resumen = useMemo(() => {
    const total = productos.length;

    const stockBajo = productos.filter(
      (producto) =>
        getStockStatus(producto.stock, producto.stockMinimo) === 'stock_bajo'
    ).length;

    const agotados = productos.filter(
      (producto) =>
        getStockStatus(producto.stock, producto.stockMinimo) === 'agotado'
    ).length;

    const valorInventario = productos.reduce((totalActual, producto) => {
      return totalActual + producto.stock * producto.precio;
    }, 0);

    return {
      total,
      stockBajo,
      agotados,
      valorInventario,
    };
  }, [productos]);

  const abrirModalEliminar = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    if (procesando) return;

    setModalOpen(false);
    setProductoSeleccionado(null);
  };

  const desactivarProducto = async () => {
    if (!productoSeleccionado) return;

    try {
      setProcesando(true);
      setError('');

      await apiRequest(`/productos/${productoSeleccionado._id}`, {
        method: 'DELETE',
      });

      setProductos((productosActuales) =>
        productosActuales.filter(
          (producto) => producto._id !== productoSeleccionado._id
        )
      );

      setModalOpen(false);
      setProductoSeleccionado(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al desactivar producto.'
      );
    } finally {
      setProcesando(false);
    }
  };

  const renderEstado = (producto: Producto) => {
    if (producto.disponible === false) {
      return <Badge variant="danger">Inactivo</Badge>;
    }

    const estado = getStockStatus(producto.stock, producto.stockMinimo);

    if (estado === 'agotado') {
      return <Badge variant="danger">Agotado</Badge>;
    }

    if (estado === 'stock_bajo') {
      return <Badge variant="warning">Stock bajo</Badge>;
    }

    return <Badge variant="success">Normal</Badge>;
  };

  return (
    <AppLayout>
      <section className="space-y-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Inventario
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Productos activos
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Consulta, administra y controla los productos disponibles del
                Hotel DDJW Caribe Azul S.A.S. desde una vista centralizada.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                onClick={cargarProductos}
              >
                Actualizar
              </Button>

              <Link href="/productos/nuevo">
                <Button type="button">Nuevo producto</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Productos activos
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              {resumen.total}
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Registrados como disponibles
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Stock bajo
            </p>

            <p className="mt-3 text-3xl font-bold text-amber-600">
              {resumen.stockBajo}
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Requieren revisión preventiva
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Agotados
            </p>

            <p className="mt-3 text-3xl font-bold text-red-600">
              {resumen.agotados}
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Sin unidades disponibles
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Valor estimado
            </p>

            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(resumen.valorInventario)}
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Stock actual por precio
            </p>
          </Card>
        </div>

        {error ? (
          <Card className="p-4">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/30">
              <p className="text-sm font-medium text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>
          </Card>
        ) : null}

        <Card className="overflow-hidden">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 dark:border-slate-800 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Listado de productos
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Visualiza el stock, proveedor, estado y acciones disponibles.
              </p>
            </div>

            <Badge variant="success">{resumen.total} activos</Badge>
          </div>

          {loading ? (
            <div className="m-5 flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500">Cargando productos...</p>
            </div>
          ) : productos.length === 0 ? (
            <div className="m-5 flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/40">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl dark:bg-blue-950/50">
                📦
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                No hay productos activos
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Cuando registres productos disponibles para las áreas del hotel,
                aparecerán en esta tabla.
              </p>

              <Link href="/productos/nuevo" className="mt-5">
                <Button type="button">Registrar primer producto</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/60">
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <th className="px-5 py-4 font-semibold">Producto</th>
                    <th className="px-5 py-4 font-semibold">Categoría</th>
                    <th className="px-5 py-4 font-semibold">Stock</th>
                    <th className="px-5 py-4 font-semibold">Mínimo</th>
                    <th className="px-5 py-4 font-semibold">Precio</th>
                    <th className="px-5 py-4 font-semibold">Proveedor</th>
                    <th className="px-5 py-4 font-semibold">Estado</th>
                    <th className="w-[230px] px-5 py-4 font-semibold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map((producto) => (
                    <tr
                      key={producto._id}
                      className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {producto.nombre}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                            {producto.descripcion || 'Sin descripción'}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                        {producto.categoria?.nombre || 'Sin categoría'}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {producto.stock}
                        </p>

                        <p className="text-xs text-slate-500">
                          {producto.unidadMedida}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                        {producto.stockMinimo}
                      </td>

                      <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                        {formatCurrency(producto.precio)}
                      </td>

                      <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                        {producto.proveedor || 'Sin proveedor'}
                      </td>

                      <td className="px-5 py-4">{renderEstado(producto)}</td>

                      <td className="w-[230px] px-5 py-4">
                        <div className="flex flex-nowrap items-center gap-2">
                          <Link href={`/productos/editar/${producto._id}`}>
                            <Button
                              type="button"
                              className="h-11 px-5"
                            >
                              Editar
                            </Button>
                          </Link>

                          <Button
                            type="button"
                            className="h-11 px-5"
                            onClick={() => abrirModalEliminar(producto)}
                          >
                            Desactivar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>

      <Modal
        open={modalOpen}
        title="Desactivar producto"
        description="Esta acción conserva el registro en la base de datos y solo lo oculta de la lista principal de productos activos."
        confirmText="Desactivar"
        cancelText="Cancelar"
        variant="danger"
        loading={procesando}
        onClose={cerrarModal}
        onConfirm={desactivarProducto}
      >
        {productoSeleccionado ? (
          <div className="space-y-3">
            <p>
              ¿Deseas desactivar el producto{' '}
              <strong>{productoSeleccionado.nombre}</strong>?
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              El producto no será eliminado permanentemente. Quedará marcado
              como no disponible para conservar el historial del inventario.
            </p>
          </div>
        ) : null}
      </Modal>
    </AppLayout>
  );
}