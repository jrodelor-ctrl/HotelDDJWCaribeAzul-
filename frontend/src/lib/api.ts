import { storage } from './storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  auth?: boolean;
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, auth = true } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (auth) {
    const token = storage.getToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al procesar la solicitud.');
  }

  return data.data;
}