import type { Producto } from './producto';
import type { Usuario } from './auth';

export type UsuarioSolicitud =
  | string
  | (Usuario & {
      _id: string;
      nombre?: string;
      correo?: string;
      email?: string;
      rol?: string;
    });

export type SolicitudCompra = {
  _id: string;

  producto: Producto;

  cantidadSugerida: number;

  prioridad: 'baja' | 'media' | 'alta';

  estado: 'pendiente' | 'aprobada' | 'rechazada';

  motivo: string;

  usuario: UsuarioSolicitud;

  nombreUsuario?: string;

  rolUsuario?: string;

  createdAt: string;

  updatedAt?: string;
};