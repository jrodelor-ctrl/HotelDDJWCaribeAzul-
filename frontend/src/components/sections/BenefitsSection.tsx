'use client';

import { CheckCircle2, ClipboardCheck, ShieldCheck, TrendingUp } from 'lucide-react';

const benefits = [
  'Reduce errores de stock causados por hojas de cálculo manuales.',
  'Evita pedidos duplicados mediante información centralizada.',
  'Permite consultar el inventario actualizado desde cualquier dispositivo.',
  'Registra entradas y salidas con trazabilidad por usuario y área del hotel.',
  'Detecta productos con stock bajo antes de que afecten la operación.',
  'Genera reportes y exportaciones CSV para apoyar la toma de decisiones.',
];

const metrics = [
  {
    label: 'Control operativo',
    value: '24/7',
    icon: ClipboardCheck,
  },
  {
    label: 'Trazabilidad',
    value: 'Total',
    icon: ShieldCheck,
  },
  {
    label: 'Prevención',
    value: 'Stock bajo',
    icon: TrendingUp,
  },
];

export function BenefitsSection() {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden border-y border-sky-100 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-24"
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

      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="space-y-8 lg:w-1/2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Beneficios principales
              </p>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Diseñado para mejorar el control interno del inventario hotelero
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Inventario DDJW ayuda a reemplazar el manejo manual en Excel por
              un sistema web centralizado, seguro y conectado a la nube para el
              Hotel DDJW Caribe Azul S.A.S.
            </p>

            <ul className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-cyan-300" />

                  <span className="text-sm font-medium leading-6 text-slate-100">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:w-1/2">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300" />

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      Vista operativa
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white">
                      Inventario controlado
                    </h3>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20">
                    <ClipboardCheck className="h-7 w-7" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">
                        Productos críticos
                      </p>
                      <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                        Monitoreo
                      </span>
                    </div>

                    <div className="flex h-40 items-end gap-3">
                      <div className="h-1/3 flex-1 rounded-t-xl bg-cyan-300/60" />
                      <div className="h-1/2 flex-1 rounded-t-xl bg-sky-300/70" />
                      <div className="h-3/4 flex-1 rounded-t-xl bg-blue-300/70" />
                      <div className="h-full flex-1 rounded-t-xl bg-cyan-200" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {metrics.map((metric) => {
                      const Icon = metric.icon;

                      return (
                        <div
                          key={metric.label}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <Icon className="mb-3 h-5 w-5 text-cyan-300" />
                          <p className="text-xs text-slate-400">
                            {metric.label}
                          </p>
                          <p className="mt-1 text-sm font-bold text-white">
                            {metric.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-3 h-3 w-1/2 rounded-full bg-cyan-300/40" />
                    <div className="mb-3 h-3 w-3/4 rounded-full bg-sky-300/30" />
                    <div className="h-3 w-2/3 rounded-full bg-blue-300/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}