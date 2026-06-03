'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/logo-ddjw-caribe-azul-dark.png')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '720px',
        }}
      />

      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 text-xl font-bold tracking-tight text-white"
            >
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/20 bg-white/10 p-1.5 backdrop-blur-sm">
                <Image
                  src="/logo-ddjw-caribe-azul-dark.png"
                  alt="Logo DDJW Caribe Azul"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </span>

              <span>Inventario DDJW</span>
            </Link>

            <p className="text-sm leading-6 text-slate-300">
              Sistema web interno para la gestión de inventarios, productos,
              movimientos, reportes y solicitudes de compra del Hotel DDJW
              Caribe Azul S.A.S.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white">Módulos</h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/movimientos"
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  Movimientos
                </Link>
              </li>
              <li>
                <Link
                  href="/reportes"
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  Reportes
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white">Gestión interna</h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/solicitudes"
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  Solicitudes de compra
                </Link>
              </li>
              <li>
                <Link
                  href="/analitica"
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  Analítica de riesgo
                </Link>
              </li>
              <li>
                <Link
                  href="/ayuda"
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  Acceso al sistema
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white">Información</h3>

            <ul className="space-y-2">
              <li className="text-sm leading-6 text-slate-300">
                Hotel DDJW Caribe Azul S.A.S.
              </li>
              <li className="text-sm leading-6 text-slate-300">
                Sistema de uso interno
              </li>
              <li className="text-sm leading-6 text-slate-300">
                Inventario centralizado en MongoDB Atlas
              </li>
              <li className="text-sm leading-6 text-slate-300">
                Acceso protegido con autenticación JWT
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-sm text-slate-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} Hotel DDJW Caribe Azul S.A.S. Todos los
            derechos reservados.
          </p>

          <p>Sistema de Gestión de Inventarios Hotel DDJW Caribe Azul S.A.S.</p>
        </div>
      </div>
    </footer>
  );
}