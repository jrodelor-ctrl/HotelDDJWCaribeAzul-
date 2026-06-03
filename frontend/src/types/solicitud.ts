import type { Producto } from './producto';
import type { Usuario } from './auth';

export type SolicitudCompra = {
  _id: string;
  producto: Producto;
  cantidadSugerida: number;
  prioridad: 'baja' | 'media' | 'alta';
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  motivo: string;
  usuario: Usuario;
  createdAt: string;
};