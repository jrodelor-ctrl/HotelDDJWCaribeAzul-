export interface UsuarioMovimiento {
  _id: string;
  nombre?: string;
  correo?: string;
  email?: string;
  rol?: string;
}

export interface ProductoMovimiento {
  _id: string;
  nombre: string;
  stock: number;
  stockMinimo: number;
  unidadMedida?: string;
  proveedor?: string;
  disponible?: boolean;
  fechaDesactivacion?: string;
}

export interface AreaMovimiento {
  _id: string;
  nombre: string;
}

export interface Movimiento {
  _id: string;

  producto: ProductoMovimiento;

  tipo: 'entrada' | 'salida';

  cantidad: number;

  area?: AreaMovimiento | null;

  usuario: string | UsuarioMovimiento;

  nombreUsuario?: string;

  rolUsuario?: string;

  observacion?: string;

  stockAnterior: number;

  stockNuevo: number;

  createdAt: string;

  updatedAt: string;
}