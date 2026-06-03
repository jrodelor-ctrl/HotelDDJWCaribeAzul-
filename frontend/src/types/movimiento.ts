import type { Area, Producto } from './producto';
import type { Usuario } from './auth';

export type Movimiento = {
  _id: string;
  producto: Producto;
  tipo: 'entrada' | 'salida';
  cantidad: number;
  area?: Area;
  usuario: Usuario;
  observacion?: string;
  stockAnterior: number;
  stockNuevo: number;
  createdAt: string;
};