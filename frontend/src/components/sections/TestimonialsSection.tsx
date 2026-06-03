'use client';

import {
  AlertTriangle,
  ClipboardCheck,
  Database,
  FileSpreadsheet,
} from 'lucide-react';

const results = [
  {
    title: 'Menos errores de stock',
    description:
      'Al centralizar el inventario, se reduce la dependencia de hojas de cálculo separadas y se disminuyen errores de conteo.',
    icon: ClipboardCheck,
  },
  {
    title: 'Información centralizada',
    description:
      'Las áreas del hotel consultan una misma fuente de información, evitando archivos duplicados o versiones desactualizadas.',
    icon: Database,
  },
  {
    title: 'Alertas preventivas',
    description:
      'El sistema permite identificar productos con stock bajo o riesgo de agotarse antes de que afecten la operación diaria.',
    icon: AlertTriangle,
  },
  {
    title: 'Reportes disponibles',
    description:
      'La administración puede consultar reportes de inventario y exportar información en CSV para análisis o respaldo.',
    icon: FileSpreadsheet,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/logo-ddjw-caribe-azul-dark.png')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '760px',
        }}
      />

      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Impacto esperado
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Beneficios operativos para el Hotel DDJW Caribe Azul
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            La implementación del sistema busca mejorar el control interno del
            inventario, reducir errores humanos y apoyar la toma de decisiones
            de la administración.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {results.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/15"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-300/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  <span>Impacto operativo</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>Inventario DDJW</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}