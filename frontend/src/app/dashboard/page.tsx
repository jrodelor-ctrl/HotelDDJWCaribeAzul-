'use client';

import { useEffect, useState } from 'react';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/api';
import type { DashboardResumen } from '@/types/dashboard';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResumen | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest<DashboardResumen>('/dashboard/resumen')
      .then(setData)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Error al cargar dashboard.');
      });
  }, []);

  return (
    <AppLayout>
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">
            Panel principal
          </p>

          <h1 className="text-3xl font-bold">
            Dashboard de inventario
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Resumen general del inventario del Hotel DDJW Caribe Azul S.A.S.
          </p>
        </div>

        {error ? (
          <Card>
            <p className="text-red-600">{error}</p>
          </Card>
        ) : null}

        {!data ? (
          <Card>
            <p>Cargando información...</p>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Card>
                <p className="text-sm text-slate-500">Productos</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {data.indicadores.totalProductos}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Stock bajo</p>
                <h2 className="mt-2 text-3xl font-bold text-amber-600">
                  {data.indicadores.totalStockBajo}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Agotados</p>
                <h2 className="mt-2 text-3xl font-bold text-red-600">
                  {data.indicadores.totalAgotados}
                </h2>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Movimientos</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {data.indicadores.totalMovimientos}
                </h2>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <h2 className="mb-4 text-xl font-bold">
                  Productos con stock bajo
                </h2>

                <div className="space-y-3">
                  {data.productosStockBajo.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No hay productos con stock bajo.
                    </p>
                  ) : (
                    data.productosStockBajo.map((producto) => (
                      <article
                        key={producto._id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                      >
                        <div>
                          <h3 className="font-semibold">{producto.nombre}</h3>
                          <p className="text-sm text-slate-500">
                            Stock: {producto.stock} · Mínimo: {producto.stockMinimo}
                          </p>
                        </div>

                        <Badge variant="warning">Stock bajo</Badge>
                      </article>
                    ))
                  )}
                </div>
              </Card>

              <Card>
                <h2 className="mb-4 text-xl font-bold">
                  Últimos movimientos
                </h2>

                <div className="space-y-3">
                  {data.ultimosMovimientos.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No hay movimientos registrados.
                    </p>
                  ) : (
                    data.ultimosMovimientos.map((movimiento) => (
                      <article
                        key={movimiento._id}
                        className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">
                            {movimiento.producto.nombre}
                          </h3>

                          <Badge
                            variant={
                              movimiento.tipo === 'entrada' ? 'success' : 'info'
                            }
                          >
                            {movimiento.tipo}
                          </Badge>
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          Cantidad: {movimiento.cantidad} · Stock nuevo:{' '}
                          {movimiento.stockNuevo}
                        </p>
                      </article>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </>
        )}
      </section>
    </AppLayout>
  );
}