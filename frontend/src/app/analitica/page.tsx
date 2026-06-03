'use client';

import { useEffect, useState } from 'react';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { apiRequest } from '@/lib/api';

type ProductoAnalitica = {
  producto: {
    id: string;
    nombre: string;
    categoria: string;
    unidadMedida: string;
    proveedor: string;
  };
  stockActual: number;
  stockMinimo: number;
  totalConsumidoPeriodo: number;
  movimientosSalidaPeriodo: number;
  consumoPromedioDiario: number;
  diasEstimadosDuracion: number | null;
  riesgo: {
    nivel: 'crítico' | 'alto' | 'medio' | 'bajo';
    descripcion: string;
  };
};

type AnaliticaResponse = {
  resumen: {
    diasAnalisis: number;
    totalProductosAnalizados: number;
    totalCriticos: number;
    totalRiesgoAlto: number;
    totalRiesgoMedio: number;
    totalRiesgoBajo: number;
  };
  productos: ProductoAnalitica[];
};

export default function AnaliticaPage() {
  const [data, setData] = useState<AnaliticaResponse | null>(null);
  const [dias, setDias] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarAnalitica = async () => {
    try {
      setLoading(true);
      setError('');

      const respuesta = await apiRequest<AnaliticaResponse>(
        `/analitica/riesgo-inventario?dias=${dias}`
      );

      setData(respuesta);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al cargar la analítica.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAnalitica();
  }, []);

  const renderRiesgo = (nivel: ProductoAnalitica['riesgo']['nivel']) => {
    if (nivel === 'crítico') {
      return <Badge variant="danger">Crítico</Badge>;
    }

    if (nivel === 'alto') {
      return <Badge variant="danger">Alto</Badge>;
    }

    if (nivel === 'medio') {
      return <Badge variant="warning">Medio</Badge>;
    }

    return <Badge variant="success">Bajo</Badge>;
  };

  return (
    <AppLayout>
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">
              Analítica avanzada
            </p>

            <h1 className="text-3xl font-bold">
              Riesgo de desabastecimiento
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Estima cuántos días podría durar el stock según las salidas
              recientes del inventario.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Días de análisis
              </label>

              <input
                type="number"
                min={1}
                value={dias}
                onChange={(event) => setDias(Number(event.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:w-40"
              />
            </div>

            <Button type="button" onClick={cargarAnalitica}>
              Actualizar
            </Button>
          </div>
        </div>

        {error ? (
          <Card>
            <p className="text-sm text-red-600">{error}</p>
          </Card>
        ) : null}

        {loading || !data ? (
          <Card>
            <p className="text-sm text-slate-500">
              Cargando analítica de inventario...
            </p>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <Card>
                <p className="text-sm text-slate-500">Productos analizados</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {data.resumen.totalProductosAnalizados}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Críticos</p>
                <h2 className="mt-2 text-3xl font-bold text-red-600">
                  {data.resumen.totalCriticos}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Riesgo alto</p>
                <h2 className="mt-2 text-3xl font-bold text-orange-600">
                  {data.resumen.totalRiesgoAlto}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Riesgo medio</p>
                <h2 className="mt-2 text-3xl font-bold text-amber-600">
                  {data.resumen.totalRiesgoMedio}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Riesgo bajo</p>
                <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                  {data.resumen.totalRiesgoBajo}
                </h2>
              </Card>
            </div>

            <Card>
              <h2 className="mb-4 text-xl font-bold">
                Productos por nivel de riesgo
              </h2>

              {data.productos.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No hay productos para analizar.
                </p>
              ) : (
                <div className="space-y-3">
                  {data.productos.map((item) => (
                    <article
                      key={item.producto.id}
                      className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    >
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                        <div>
                          <h3 className="font-semibold">
                            {item.producto.nombre}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Categoría: {item.producto.categoria} · Proveedor:{' '}
                            {item.producto.proveedor}
                          </p>

                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            {item.riesgo.descripcion}
                          </p>
                        </div>

                        {renderRiesgo(item.riesgo.nivel)}
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-5">
                        <p>
                          <span className="font-semibold">Stock:</span>{' '}
                          {item.stockActual} {item.producto.unidadMedida}
                        </p>

                        <p>
                          <span className="font-semibold">Mínimo:</span>{' '}
                          {item.stockMinimo}
                        </p>

                        <p>
                          <span className="font-semibold">Consumido:</span>{' '}
                          {item.totalConsumidoPeriodo}
                        </p>

                        <p>
                          <span className="font-semibold">Promedio/día:</span>{' '}
                          {item.consumoPromedioDiario}
                        </p>

                        <p>
                          <span className="font-semibold">Duración:</span>{' '}
                          {item.diasEstimadosDuracion === null
                            ? 'Sin consumo reciente'
                            : `${item.diasEstimadosDuracion} días`}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}
      </section>
    </AppLayout>
  );
}