'use client';

import { Building2, Database, ShieldCheck, Target } from 'lucide-react';

const items = [
  {
    title: 'Enfoque hotelero',
    description:
      'Diseñado para áreas como cocina, recepción, lavandería, mantenimiento y administración.',
    icon: Building2,
  },
  {
    title: 'Datos centralizados',
    description:
      'La información se almacena en MongoDB Atlas para evitar archivos duplicados y versiones desactualizadas.',
    icon: Database,
  },
  {
    title: 'Acceso protegido',
    description:
      'El sistema utiliza autenticación JWT, rutas protegidas y controles de seguridad para el acceso interno.',
    icon: ShieldCheck,
  },
  {
    title: 'Mejor control interno',
    description:
      'Permite anticipar faltantes, reducir errores humanos y mejorar la eficiencia operativa del hotel.',
    icon: Target,
  },
];

export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-24"
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

      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Acerca del sistema
            </p>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Una solución interna para centralizar el inventario del hotel
            </h2>

            <p className="text-lg leading-8 text-slate-300">
              El Sistema de Gestión de Inventarios del Hotel DDJW Caribe Azul
              S.A.S. fue desarrollado para reemplazar el manejo manual en hojas
              de cálculo y ofrecer una plataforma web centralizada, segura y
              accesible para la administración del inventario.
            </p>

            <p className="text-lg leading-8 text-slate-300">
              La solución permite controlar productos, entradas, salidas,
              solicitudes internas, reportes y alertas de stock bajo, apoyando
              la toma de decisiones y reduciendo errores operativos.
            </p>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Objetivo principal
              </p>

              <p className="mt-3 text-base leading-7 text-slate-300">
                Fortalecer el control interno del inventario mediante una
                herramienta web segura, organizada y adaptada a las necesidades
                operativas del Hotel DDJW Caribe Azul S.A.S.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/15"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                    <span>Inventario DDJW</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}