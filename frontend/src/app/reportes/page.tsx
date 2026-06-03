'use client';

import { useEffect, useState } from 'react';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { apiRequest } from '@/lib/api';
import { formatCurrency, getStockStatus } from '@/lib/formatters';
import type { Producto } from '@/types/producto';

type ReporteInventario = {
  resumen: {
    totalProductos: number;
    totalAgotados: number;
    totalStockBajo: number;
    valorTotalInventario: number;
  };
  productos: Producto[];
};

export default function ReportesPage() {
  const [reporte, setReporte] = useState<ReporteInventario | null>(null);
  const [estadoStock, setEstadoStock] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarReporte = async () => {
    try {
      setLoading(true);
      setError('');

      const query = estadoStock ? `?estadoStock=${estadoStock}` : '';
      const data = await apiRequest<ReporteInventario>(
        `/reportes/inventario${query}`
      );

      setReporte(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al cargar el reporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReporte();
  }, []);

  const limpiarCampoCsv = (valor: unknown) => {
    if (valor === null || valor === undefined) {
      return '""';
    }

    const texto = String(valor)
      .replace(/"/g, '""')
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .trim();

    return `"${texto}"`;
  };

  const obtenerEstadoTexto = (producto: Producto) => {
    const estado = getStockStatus(producto.stock, producto.stockMinimo);

    if (estado === 'agotado') {
      return 'Agotado';
    }

    if (estado === 'stock_bajo') {
      return 'Stock bajo';
    }

    return 'Normal';
  };

  const exportarCsv = () => {
    if (!reporte || reporte.productos.length === 0) {
      setError('No hay productos disponibles para exportar.');
      return;
    }

    setError('');

    const encabezados = [
      'Producto',
      'Categoría',
      'Stock Actual',
      'Stock Mínimo',
      'Estado',
      'Precio Unitario',
      'Valor Total',
      'Unidad de Medida',
      'Proveedor'
    ];

    const filas = reporte.productos.map((producto) => {
      const stockActual = Number(producto.stock || 0);
      const stockMinimo = Number(producto.stockMinimo || 0);
      const precio = Number(producto.precio || 0);
      const valorTotal = stockActual * precio;

      return [
        producto.nombre || 'Sin nombre',
        producto.categoria?.nombre || 'Sin categoría',
        stockActual,
        stockMinimo,
        obtenerEstadoTexto(producto),
        precio,
        valorTotal,
        producto.unidadMedida || 'unidad',
        producto.proveedor || 'Sin proveedor'
      ];
    });

    const separador = ';';

    const contenidoCsv = [
      encabezados.map(limpiarCampoCsv).join(separador),
      ...filas.map((fila) => fila.map(limpiarCampoCsv).join(separador))
    ].join('\n');

    const contenidoConBom = `\uFEFF${contenidoCsv}`;

    const blob = new Blob([contenidoConBom], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    const fecha = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `reporte-inventario-hotel-ddjw-${fecha}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  const renderEstado = (producto: Producto) => {
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
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">
              Reportes
            </p>

            <h1 className="text-3xl font-bold">
              Reporte de inventario
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Consulta el estado del inventario y exporta información en formato
              CSV compatible con Excel.
            </p>
          </div>

          <Button type="button" onClick={exportarCsv}>
            Exportar CSV
          </Button>
        </div>

        <Card>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Filtrar por estado de stock
              </label>

              <select
                value={estadoStock}
                onChange={(event) => setEstadoStock(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white md:w-72"
              >
                <option value="">Todos</option>
                <option value="normal">Normal</option>
                <option value="stock_bajo">Stock bajo</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>

            <Button type="button" variant="secondary" onClick={cargarReporte}>
              Aplicar filtro
            </Button>
          </div>
        </Card>

        {error ? (
          <Card>
            <p className="text-sm text-red-600">{error}</p>
          </Card>
        ) : null}

        {loading || !reporte ? (
          <Card>
            <p className="text-sm text-slate-500">
              Cargando reporte...
            </p>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Card>
                <p className="text-sm text-slate-500">Productos reportados</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {reporte.resumen.totalProductos}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Stock bajo</p>
                <h2 className="mt-2 text-3xl font-bold text-amber-600">
                  {reporte.resumen.totalStockBajo}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Agotados</p>
                <h2 className="mt-2 text-3xl font-bold text-red-600">
                  {reporte.resumen.totalAgotados}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Valor inventario</p>
                <h2 className="mt-2 text-2xl font-bold text-emerald-600">
                  {formatCurrency(reporte.resumen.valorTotalInventario)}
                </h2>
              </Card>
            </div>

            <Card>
              <h2 className="mb-4 text-xl font-bold">
                Detalle de productos
              </h2>

              {reporte.productos.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No hay productos para este filtro.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800">
                        <th className="px-3 py-3">Producto</th>
                        <th className="px-3 py-3">Categoría</th>
                        <th className="px-3 py-3">Stock</th>
                        <th className="px-3 py-3">Mínimo</th>
                        <th className="px-3 py-3">Precio</th>
                        <th className="px-3 py-3">Valor total</th>
                        <th className="px-3 py-3">Estado</th>
                      </tr>
                    </thead>

                    <tbody>
                      {reporte.productos.map((producto) => (
                        <tr
                          key={producto._id}
                          className="border-b border-slate-100 dark:border-slate-800"
                        >
                          <td className="px-3 py-4 font-semibold">
                            {producto.nombre}
                          </td>

                          <td className="px-3 py-4">
                            {producto.categoria?.nombre || 'Sin categoría'}
                          </td>

                          <td className="px-3 py-4">
                            {producto.stock} {producto.unidadMedida}
                          </td>

                          <td className="px-3 py-4">
                            {producto.stockMinimo}
                          </td>

                          <td className="px-3 py-4">
                            {formatCurrency(producto.precio)}
                          </td>

                          <td className="px-3 py-4 font-semibold">
                            {formatCurrency(producto.precio * producto.stock)}
                          </td>

                          <td className="px-3 py-4">
                            {renderEstado(producto)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </>
        )}
      </section>
    </AppLayout>
  );
}