'use client';

import Link from 'next/link';
import { ArrowRight, HelpCircle, LockKeyhole, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/logo-ddjw-caribe-azul-dark.png')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '760px',
        }}
      />

      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl md:p-12">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300" />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Acceso interno
              </p>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Sistema de Gestión de Inventarios Hotel DDJW Caribe Azul S.A.S.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                Plataforma web de uso interno para administración, gerencia y
                personal de inventario. El acceso está protegido mediante inicio
                de sesión y roles de usuario.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="group h-12 px-7" asChild>
                  <Link href="/login">
                    Iniciar sesión
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/15 bg-white/10 px-7 text-white hover:bg-white/15 hover:text-white"
                  asChild
                >
                  <Link href="/ayuda">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Ver guía de uso
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20">
                  <LockKeyhole className="h-6 w-6" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">
                  Acceso autorizado
                </h3>

                <p className="text-sm leading-6 text-slate-300">
                  Solo usuarios internos con credenciales asignadas pueden
                  ingresar al sistema.
                </p>
              </article>

              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-300/15 text-sky-200 ring-1 ring-sky-300/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">
                  Seguridad por roles
                </h3>

                <p className="text-sm leading-6 text-slate-300">
                  El sistema maneja permisos para administrador, gerencia y
                  personal de inventario.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}