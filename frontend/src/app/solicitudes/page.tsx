'use client';

import { FormEvent, useEffect, useState } from 'react';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';

import { apiRequest } from '@/lib/api';
import { authService, type PerfilUsuario } from '@/lib/auth';
import { formatDate } from '@/lib/formatters';
import type { Producto } from '@/types/producto';
import type { SolicitudCompra } from '@/types/solicitud';

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<SolicitudCompra[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<PerfilUsuario | null>(
    null
  );

  const [producto, setProducto] = useState('');
  const [cantidadSugerida, setCantidadSugerida] = useState(1);
  const [prioridad, setPrioridad] = useState<'baja' | 'media' | 'alta'>(
    'media'
  );
  const [motivo, setMotivo] = useState('');

  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] =
    useState<SolicitudCompra | null>(null);
  const [nuevoEstado, setNuevoEstado] =
    useState<'aprobada' | 'rechazada' | null>(null);

  const rolUsuarioActual = String(usuarioActual?.rol || '')
    .toLowerCase()
    .trim();

  const puedeGestionarSolicitudes =
    rolUsuarioActual === 'admin' || rolUsuarioActual === 'gerente';

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');

      const [solicitudesData, productosData] = await Promise.all([
        apiRequest<{ solicitudes: SolicitudCompra[] }>('/solicitudes'),
        apiRequest<{ productos: Producto[] }>('/productos')
      ]);

      setSolicitudes(solicitudesData.solicitudes);
      setProductos(productosData.productos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const usuarioGuardado = authService.getUser();

    if (usuarioGuardado) {
      setUsuarioActual(usuarioGuardado as PerfilUsuario);
    }

    cargarDatos();
  }, []);

  const crearSolicitud = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMensaje('');

    if (!producto) {
      setError('Selecciona un producto.');
      return;
    }

    if (cantidadSugerida <= 0) {
      setError('La cantidad sugerida debe ser mayor a cero.');
      return;
    }

    try {
      setGuardando(true);

      await apiRequest('/solicitudes', {
        method: 'POST',
        body: {
          producto,
          cantidadSugerida,
          prioridad,
          motivo
        }
      });

      setMensaje('Solicitud creada correctamente.');
      setProducto('');
      setCantidadSugerida(1);
      setPrioridad('media');
      setMotivo('');

      await cargarDatos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear solicitud.');
    } finally {
      setGuardando(false);
    }
  };

  const abrirModalEstado = (
    solicitud: SolicitudCompra,
    estado: 'aprobada' | 'rechazada'
  ) => {
    if (!puedeGestionarSolicitudes) {
      setError('No tienes permisos para aprobar o rechazar solicitudes.');
      return;
    }

    setSolicitudSeleccionada(solicitud);
    setNuevoEstado(estado);
    setModalOpen(true);
  };

  const actualizarEstado = async () => {
    if (!solicitudSeleccionada || !nuevoEstado) return;

    if (!puedeGestionarSolicitudes) {
      setError('No tienes permisos para aprobar o rechazar solicitudes.');
      setModalOpen(false);
      return;
    }

    try {
      setGuardando(true);
      setError('');

      await apiRequest(`/solicitudes/${solicitudSeleccionada._id}/estado`, {
        method: 'PATCH',
        body: {
          estado: nuevoEstado
        }
      });

      setMensaje(`Solicitud ${nuevoEstado} correctamente.`);
      setModalOpen(false);
      setSolicitudSeleccionada(null);
      setNuevoEstado(null);

      await cargarDatos();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al actualizar la solicitud.'
      );
    } finally {
      setGuardando(false);
    }
  };

  const renderPrioridad = (valor: string) => {
    if (valor === 'alta') return <Badge variant="danger">Alta</Badge>;
    if (valor === 'media') return <Badge variant="warning">Media</Badge>;
    return <Badge variant="info">Baja</Badge>;
  };

  const renderEstado = (valor: string) => {
    if (valor === 'aprobada') return <Badge variant="success">Aprobada</Badge>;
    if (valor === 'rechazada') return <Badge variant="danger">Rechazada</Badge>;
    return <Badge variant="warning">Pendiente</Badge>;
  };

  const obtenerResponsableSolicitud = (solicitud: SolicitudCompra) => {
    if (solicitud.nombreUsuario) {
      return solicitud.nombreUsuario;
    }

    if (solicitud.usuario && typeof solicitud.usuario === 'object') {
      return (
        solicitud.usuario.nombre ||
        solicitud.usuario.correo ||
        solicitud.usuario.email ||
        'Usuario no registrado'
      );
    }

    return 'Usuario no registrado';
  };

  const obtenerRolSolicitud = (solicitud: SolicitudCompra) => {
    if (solicitud.rolUsuario) {
      return solicitud.rolUsuario;
    }

    if (solicitud.usuario && typeof solicitud.usuario === 'object') {
      return solicitud.usuario.rol || 'Sin rol';
    }

    return 'Sin rol';
  };

  return (
    <AppLayout>
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">
            Compras internas
          </p>

          <h1 className="text-3xl font-bold">Solicitudes de compra</h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Gestiona solicitudes internas para reposición de productos con bajo
            inventario.
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
            <h2 className="mb-4 text-xl font-bold">Nueva solicitud</h2>

            <form onSubmit={crearSolicitud} className="space-y-4">
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

              <Input
                id="cantidadSugerida"
                label="Cantidad sugerida"
                type="number"
                min={1}
                value={cantidadSugerida}
                onChange={(event) =>
                  setCantidadSugerida(Number(event.target.value))
                }
                required
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Prioridad
                </label>

                <select
                  value={prioridad}
                  onChange={(event) =>
                    setPrioridad(
                      event.target.value as 'baja' | 'media' | 'alta'
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <Input
                id="motivo"
                label="Motivo"
                type="text"
                value={motivo}
                onChange={(event) => setMotivo(event.target.value)}
                placeholder="Ej: reposición preventiva de stock"
              />

              <Button type="submit" className="w-full" disabled={guardando}>
                {guardando ? 'Creando...' : 'Crear solicitud'}
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="mb-4 text-xl font-bold">
              Historial de solicitudes
            </h2>

            {loading ? (
              <p className="text-sm text-slate-500">
                Cargando solicitudes...
              </p>
            ) : solicitudes.length === 0 ? (
              <p className="text-sm text-slate-500">
                No hay solicitudes registradas.
              </p>
            ) : (
              <div className="space-y-3">
                {solicitudes.map((solicitud) => (
                  <article
                    key={solicitud._id}
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                  >
                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                      <div>
                        <h3 className="font-semibold">
                          {solicitud.producto.nombre}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Cantidad sugerida: {solicitud.cantidadSugerida}
                        </p>

                        <p className="text-sm text-slate-500">
                          Fecha: {formatDate(solicitud.createdAt)}
                        </p>

                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                          {solicitud.motivo}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {renderPrioridad(solicitud.prioridad)}
                        {renderEstado(solicitud.estado)}
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                      <p>
                        <span className="font-semibold">Solicitado por:</span>{' '}
                        {obtenerResponsableSolicitud(solicitud)}
                      </p>

                      <p className="mt-1">
                        <span className="font-semibold">Rol:</span>{' '}
                        {obtenerRolSolicitud(solicitud)}
                      </p>
                    </div>

                    {solicitud.estado === 'pendiente' &&
                    puedeGestionarSolicitudes ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() =>
                            abrirModalEstado(solicitud, 'aprobada')
                          }
                        >
                          Aprobar
                        </Button>

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() =>
                            abrirModalEstado(solicitud, 'rechazada')
                          }
                        >
                          Rechazar
                        </Button>
                      </div>
                    ) : null}

                    {solicitud.estado === 'pendiente' &&
                    !puedeGestionarSolicitudes ? (
                      <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                        Esta solicitud está pendiente de aprobación por un
                        usuario con rol admin o gerente.
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>

      <Modal
        open={modalOpen}
        title={
          nuevoEstado === 'aprobada'
            ? 'Aprobar solicitud'
            : 'Rechazar solicitud'
        }
        description="Esta acción cambiará el estado de la solicitud seleccionada."
        confirmText={nuevoEstado === 'aprobada' ? 'Aprobar' : 'Rechazar'}
        cancelText="Cancelar"
        variant={nuevoEstado === 'rechazada' ? 'danger' : 'default'}
        loading={guardando}
        onClose={() => setModalOpen(false)}
        onConfirm={actualizarEstado}
      >
        {solicitudSeleccionada ? (
          <p>
            Producto: <strong>{solicitudSeleccionada.producto.nombre}</strong>
          </p>
        ) : null}
      </Modal>
    </AppLayout>
  );
}