'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { apiRequest } from '@/lib/api';
import type { Categoria } from '@/types/producto';

export default function NuevoProductoPage() {
  const router = useRouter();

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(5);
  const [unidadMedida, setUnidadMedida] = useState('unidad');
  const [proveedor, setProveedor] = useState('');

  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    apiRequest<{ categorias: Categoria[] }>('/categorias')
      .then((data) => setCategorias(data.categorias))
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : 'Error al cargar categorías.'
        );
      });
  }, []);

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

    if (precio < 0 || stock < 0 || stockMinimo < 0) {
      setError('Precio, stock y stock mínimo no pueden ser negativos.');
      return;
    }

    try {
      setGuardando(true);

      await apiRequest('/productos', {
        method: 'POST',
        body: {
          nombre,
          descripcion,
          categoria,
          precio,
          stock,
          stockMinimo,
          unidadMedida,
          proveedor
        }
      });

      router.push('/productos');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al crear el producto.'
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

          <h1 className="text-3xl font-bold">Nuevo producto</h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Registra un nuevo artículo del inventario hotelero.
          </p>
        </div>

        {error ? (
          <Card>
            <p className="text-sm text-red-600">{error}</p>
          </Card>
        ) : null}

        <Card className="max-w-3xl">
          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <Input
              id="nombre"
              label="Nombre del producto"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
              placeholder="Ej: Toallas blancas"
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
              id="stock"
              label="Stock inicial"
              type="number"
              min={0}
              value={stock}
              onChange={(event) => setStock(Number(event.target.value))}
              required
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
              placeholder="Ej: Distribuidora Caribe"
            />

            <Input
              id="descripcion"
              label="Descripción"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              placeholder="Descripción breve del producto"
            />

            <div className="flex gap-3 md:col-span-2">
              <Button type="submit" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar producto'}
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
      </section>
    </AppLayout>
  );
}