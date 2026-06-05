'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { authService } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailNormalizado = email.trim().toLowerCase();

    if (!emailNormalizado || !password) {
      setError('Ingresa tu correo electrónico y contraseña.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await authService.login(emailNormalizado, password);
      router.push('/dashboard');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No fue posible iniciar sesión.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Link
        href="/"
        className="absolute left-6 top-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20"
        aria-label="Volver a la página principal"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "url('/logo-ddjw-caribe-azul-dark.png')",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '720px',
            }}
          />

          <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 pt-24 xl:p-16 xl:pt-24">
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/5 p-2 shadow-lg backdrop-blur-sm">
                <Image
                  src="/logo-ddjw-caribe-azul-dark.png"
                  alt="Logo DDJW Caribe Azul"
                  width={72}
                  height={72}
                  className="h-16 w-16 object-contain"
                  priority
                />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Hotel DDJW Caribe Azul
                </p>
                <h1 className="text-2xl font-bold text-white">
                  Inventario DDJW
                </h1>
              </div>
            </div>

            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Sistema interno
              </p>

              <h2 className="text-5xl font-bold leading-tight text-white xl:text-6xl">
                Gestión inteligente de inventarios para el Hotel DDJW Caribe Azul
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Acceso autorizado para administración, gerencia y personal de
                inventario. Controla productos, movimientos, reportes y
                solicitudes internas desde una plataforma web centralizada.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-sm font-medium text-slate-300">
                    Inventario
                  </p>
                  <p className="mt-2 text-2xl font-bold text-cyan-300">
                    Centralizado
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-sm font-medium text-slate-300">
                    Movimientos
                  </p>
                  <p className="mt-2 text-2xl font-bold text-sky-300">
                    Trazables
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-sm font-medium text-slate-300">
                    Reportes
                  </p>
                  <p className="mt-2 text-2xl font-bold text-cyan-200">CSV</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-400">
              Sistema de Gestión de Inventarios · Hotel DDJW Caribe Azul S.A.S.
            </p>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50 lg:bg-none" />

          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-sky-100 bg-white p-8 shadow-2xl shadow-sky-100/70 sm:p-10">
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-sky-100 bg-white p-2 shadow-sm">
                <Image
                  src="/logo-ddjw-caribe-azul.png"
                  alt="Logo DDJW Caribe Azul"
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Acceso seguro
            </p>

            <h3 className="mt-2 text-4xl font-bold text-slate-900">
              Iniciar sesión
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Ingresa con las credenciales asignadas por el administrador del sistema.
            </p>

            {error ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">{error}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@dominio.com"
                  autoComplete="username"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Contraseña
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-2xl bg-gradient-to-r from-blue-800 via-sky-700 to-cyan-600 text-base font-semibold text-white shadow-lg shadow-sky-200 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Ingresando...' : 'Ingresar al sistema'}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}