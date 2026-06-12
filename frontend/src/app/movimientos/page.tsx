'use client';

import { FormEvent, useEffect, useState } from 'react';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { apiRequest } from '@/lib/api';
import { formatDate } from '@/lib/formatters';
import type { Movimiento } from '@/types/movimiento';
import type { Area, Producto } from '@/types/producto';

export default function MovimientosPage() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  const [producto, setProducto] = useState('');
  const [tipo, setTipo] = useState<'entrada' | 'salida'>('entrada');
  const [cantidad, setCantidad] = useState(1);
  const [area, setArea] = useState('');
  const [observacion, setObservacion] = useState('');

  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');

      const [productosData, areasData, movimientosData] = await Promise.all([
        apiRequest<{ productos: Producto[] }>('/productos'),
        apiRequest<{ areas: Area[] }>('/areas'),
        apiRequest<{ movimientos: Movimiento[] }>('/movimientos')
      ]);

      setProductos(productosData.productos);
      setAreas(areasData.areas);
      setMovimientos(movimientosData.movimientos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMensaje('');

    if (!producto) {
      setError('Selecciona un producto.');
      return;
    }

    if (cantidad <= 0) {
      setError('La cantidad debe ser mayor a cero.');
      return;
    }

    if (tipo === 'salida' && !area) {
      setError('Selecciona el área para registrar una salida.');
      return;
    }

    try {
      setGuardando(true);

      await apiRequest('/movimientos', {
        method: 'POST',
        body: {
          producto,
          tipo,
          cantidad,
          area: tipo === 'salida' ? area : undefined,
          observacion
        }
      });

      setMensaje('Movimiento registrado correctamente.');
      setProducto('');
      setTipo('entrada');
      setCantidad(1);
      setArea('');
      setObservacion('');

      await cargarDatos();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al registrar movimiento.'
      );
    } finally {
      setGuardando(false);
    }
  };

  const obtenerResponsableMovimiento = (movimiento: Movimiento) => {
    if (movimiento.nombreUsuario) {
      return movimiento.nombreUsuario;
    }

    if (
      movimiento.usuario &&
      typeof movimiento.usuario === 'object' &&
      'nombre' in movimiento.usuario
    ) {
      return (
        movimiento.usuario.nombre ||
        movimiento.usuario.correo ||
        movimiento.usuario.email ||
        'Usuario no registrado'
      );
    }

    return 'Usuario no registrado';
  };

  const obtenerRolMovimiento = (movimiento: Movimiento) => {
    if (movimiento.rolUsuario) {
      return movimiento.rolUsuario;
    }

    if (
      movimiento.usuario &&
      typeof movimiento.usuario === 'object' &&
      'rol' in movimiento.usuario
    ) {
      return movimiento.usuario.rol || 'Sin rol';
    }

    return 'Sin rol';
  };

  return (
    <AppLayout>
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">
            Inventario
          </p>
          <h1 className="text-3xl font-bold">Movimientos</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Registra entradas y salidas de inventario por áreas del hotel.
          </p>
        </div>

        {error ? (
          <Card>
            <p className="text-sm text-red-600">{error}</p>
          </Card>
        ) : null}

        {mensaje ? (
          <Card>
            <p className="text-sm text-emerald-600">{mensaje}</p>
          </Card>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <Card>
            <h2 className="mb-4 text-xl font-bold">Registrar movimiento</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Producto
                </label>
                <select
                  value={producto}
                  onChange={(event) => setProducto(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="">Seleccionar producto</option>
                  {productos.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre} - Stock: {item.stock}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Tipo de movimiento
                </label>
                <select
                  value={tipo}
                  onChange={(event) =>
                    setTipo(event.target.value as 'entrada' | 'salida')
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                </select>
              </div>

              <Input
                id="cantidad"
                label="Cantidad"
                type="number"
                min={1}
                value={cantidad}
                onChange={(event) => setCantidad(Number(event.target.value))}
                required
              />

              {tipo === 'salida' ? (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Área del hotel
                  </label>
                  <select
                    value={area}
                    onChange={(event) => setArea(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="">Seleccionar área</option>
                    {areas.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <Input
                id="observacion"
                label="Observación"
                type="text"
                value={observacion}
                onChange={(event) => setObservacion(event.target.value)}
                placeholder="Ej: compra inicial, reposición habitaciones..."
              />

              <Button type="submit" className="w-full" disabled={guardando}>
                {guardando ? 'Registrando...' : 'Registrar movimiento'}
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="mb-4 text-xl font-bold">Historial</h2>

            {loading ? (
              <p className="text-sm text-slate-500">Cargando movimientos...</p>
            ) : movimientos.length === 0 ? (
              <p className="text-sm text-slate-500">
                No hay movimientos registrados.
              </p>
            ) : (
              <div className="space-y-3">
                {movimientos.map((movimiento) => (
                  <article
                    key={movimiento._id}
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                  >
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                      <div>
                        <h3 className="font-semibold">
                          {movimiento.producto.nombre}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {formatDate(movimiento.createdAt)}
                        </p>
                      </div>

                      <Badge
                        variant={
                          movimiento.tipo === 'entrada' ? 'success' : 'info'
                        }
                      >
                        {movimiento.tipo}
                      </Badge>
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-4">
                      <p>Cantidad: {movimiento.cantidad}</p>
                      <p>Área: {movimiento.area?.nombre || 'No aplica'}</p>
                      <p>Stock anterior: {movimiento.stockAnterior}</p>
                      <p>Stock nuevo: {movimiento.stockNuevo}</p>
                    </div>

                    <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                      <p>
                        <span className="font-semibold">Realizado por:</span>{' '}
                        {obtenerResponsableMovimiento(movimiento)}
                      </p>
                      <p className="mt-1">
                        <span className="font-semibold">Rol:</span>{' '}
                        {obtenerRolMovimiento(movimiento)}
                      </p>
                    </div>

                    {movimiento.observacion ? (
                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold">Observación:</span>{' '}
                        {movimiento.observacion}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>
    </AppLayout>
  );
}