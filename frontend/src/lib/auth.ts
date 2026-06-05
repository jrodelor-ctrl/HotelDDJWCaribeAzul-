import type { LoginResponse } from '@/types/auth';
import { apiRequest } from './api';
import { storage } from './storage';

type RolUsuario = 'admin' | 'gerente' | 'inventario';

export type PerfilUsuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: RolUsuario;
  cargo?: string;
  telefono?: string;
  area?: string;
  fotoPerfil?: string;
  proveedorAuth?: 'local' | 'google';
  activo?: boolean;
};

export type ActualizarPerfilPayload = {
  nombre: string;
  cargo: string;
  telefono: string;
  area: string;
};

export type CambiarPasswordPayload = {
  passwordActual: string;
  passwordNueva: string;
  confirmarPassword: string;
};

type PerfilResponse = {
  usuario: PerfilUsuario;
};

export const authService = {
  async login(correo: string, password: string) {
    const data = await apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { correo, password },
      auth: false
    });

    storage.setToken(data.token);
    storage.setUser(data.usuario);

    return data;
  },

  async getProfile() {
    const data = await apiRequest<PerfilResponse>('/auth/perfil');

    storage.setUser(data.usuario);

    return data.usuario;
  },

  async updateProfile(payload: ActualizarPerfilPayload) {
    const data = await apiRequest<PerfilResponse>('/auth/perfil', {
      method: 'PUT',
      body: payload
    });

    storage.setUser(data.usuario);

    return data.usuario;
  },

  async changePassword(payload: CambiarPasswordPayload) {
    return apiRequest<null>('/auth/cambiar-password', {
      method: 'PUT',
      body: payload
    });
  },

  logout() {
    storage.clearSession();
  },

  isAuthenticated() {
    return Boolean(storage.getToken());
  },

  getUser() {
    return storage.getUser();
  }
};