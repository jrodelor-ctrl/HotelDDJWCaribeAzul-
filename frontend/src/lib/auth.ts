import type { LoginResponse } from '@/types/auth';
import { apiRequest } from './api';
import { storage } from './storage';

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