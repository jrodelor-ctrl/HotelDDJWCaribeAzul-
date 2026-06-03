'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { apiRequest } from '@/lib/api';
import type { Categoria, Producto } from '@/types/producto';

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(5);
  const [unidadMedida, setUnidadMedida] = useState('unidad');
  const [proveedor, setProveedor] = useState('');

  const [stockActual, setStockActual] = useState(0);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError('');

        const [productoData, categoriasData] = await Promise.all([
          apiRequest<{ producto: Producto }>(`/productos/${id}`),
          apiRequest<{ categorias: Categoria[] }>('/categorias')
        ]);

        const producto = productoData.producto;

        setNombre(producto.nombre);
        setDescripcion(producto.descripcion || '');
        setCategoria(producto.categoria?._id || '');
        setPrecio(producto.precio);
        setStockActual(producto.stock);
        setStockMinimo(producto.stockMinimo);
        setUnidadMedida(producto.unidadMedida);
        setProveedor(producto.proveedor || '');

        setCategorias(categoriasData.categorias);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al cargar producto.'
        );
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      cargarDatos();
    }
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!nombre.trim()) {
      setError('El nombre del producto es obligatorio.');
      return;
    }

    if (!categoria) {
      setError('Selecciona una categoría.');
      return;
    }

    if (precio < 0 || stockMinimo < 0) {
      setError('El precio y el stock mínimo no pueden ser negativos.');
      return;
    }

    try {
      setGuardando(true);

      await apiRequest(`/productos/${id}`, {
        method: 'PUT',
        body: {
          nombre,
          descripcion,
          categoria,
          precio,
          stockMinimo,
          unidadMedida,
          proveedor
        }
      });

      router.push('/productos');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al actualizar producto.'
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <AppLayout>
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">
            Inventario
          </p>

          <h1 className="text-3xl font-bold">
            Editar producto
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Actualiza la información general del producto. El stock se modifica
            desde el módulo de movimientos para conservar trazabilidad.
          </p>
        </div>

        {error ? (
          <Card>
            <p className="text-sm text-red-600">{error}</p>
          </Card>
        ) : null}

        {cargando ? (
          <Card>
            <p className="text-sm text-slate-500">
              Cargando producto...
            </p>
          </Card>
        ) : (
          <Card className="max-w-3xl">
            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <Input
                id="nombre"
                label="Nombre del producto"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                required
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Categoría
                </label>

                <select
                  value={categoria}
                  onChange={(event) => setCategoria(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                id="precio"
                label="Precio"
                type="number"
                min={0}
                value={precio}
                onChange={(event) => setPrecio(Number(event.target.value))}
                required
              />

              <Input
                id="stockActual"
                label="Stock actual"
                type="number"
                value={stockActual}
                disabled
              />

              <Input
                id="stockMinimo"
                label="Stock mínimo"
                type="number"
                min={0}
                value={stockMinimo}
                onChange={(event) => setStockMinimo(Number(event.target.value))}
                required
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Unidad de medida
                </label>

                <select
                  value={unidadMedida}
                  onChange={(event) => setUnidadMedida(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="unidad">Unidad</option>
                  <option value="paquete">Paquete</option>
                  <option value="caja">Caja</option>
                  <option value="litro">Litro</option>
                  <option value="galon">Galón</option>
                  <option value="kg">Kilogramo</option>
                  <option value="gramo">Gramo</option>
                </select>
              </div>

              <Input
                id="proveedor"
                label="Proveedor"
                value={proveedor}
                onChange={(event) => setProveedor(event.target.value)}
              />

              <Input
                id="descripcion"
                label="Descripción"
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
              />

              <div className="flex gap-3 md:col-span-2">
                <Button type="submit" disabled={guardando}>
                  {guardando ? 'Guardando...' : 'Guardar cambios'}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push('/productos')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}
      </section>
    </AppLayout>
  );
}