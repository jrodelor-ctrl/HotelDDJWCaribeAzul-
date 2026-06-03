import type { Usuario } from '@/types/auth';

const TOKEN_KEY = 'hotel_ddjw_token';
const USER_KEY = 'hotel_ddjw_user';
const THEME_KEY = 'hotel_ddjw_theme';

export const storage = {
  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser(): Usuario | null {
    if (typeof window === 'undefined') return null;

    const user = localStorage.getItem(USER_KEY);

    if (!user) return null;

    return JSON.parse(user);
  },

  setUser(user: Usuario) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  getTheme() {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem(THEME_KEY) || 'light';
  },

  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem(THEME_KEY, theme);
  },

  clearSession() {
    this.removeToken();
    this.removeUser();
  }
};