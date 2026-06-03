export type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: 'admin' | 'gerente' | 'inventario';
};

export type LoginResponse = {
  usuario: Usuario;
  token: string;
};