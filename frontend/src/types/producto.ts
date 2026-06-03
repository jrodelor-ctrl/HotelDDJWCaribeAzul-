export type Categoria = {
  _id: string;
  nombre: string;
  descripcion?: string;
  activa?: boolean;
};

export type Area = {
  _id: string;
  nombre: string;
  descripcion?: string;
  activa?: boolean;
};

export type Producto = {
  _id: string;
  nombre: string;
  descripcion?: string;
  categoria: Categoria;
  precio: number;
  stock: number;
  stockMinimo: number;
  unidadMedida: string;
  proveedor: string;
  disponible: boolean;
  estadoStock?: 'normal' | 'stock_bajo' | 'agotado';
};