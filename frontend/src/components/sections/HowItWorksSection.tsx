'use client';

import {
  ArrowRightLeft,
  ClipboardList,
  FileBarChart,
  PackagePlus,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Registrar productos',
    description:
      'El administrador registra los productos del inventario con categoría, precio, proveedor, unidad de medida, stock inicial y stock mínimo.',
    icon: PackagePlus,
  },
  {
    number: '02',
    title: 'Controlar movimientos',
    description:
      'El personal autorizado registra entradas y salidas de productos. El sistema actualiza automáticamente el stock y conserva la trazabilidad.',
    icon: ArrowRightLeft,
  },
  {
    number: '03',
    title: 'Detectar necesidades',
    description:
      'Cuando un producto llega a niveles bajos, el sistema permite generar solicitudes internas de compra para evitar desabastecimiento.',
    icon: ClipboardList,
  },
  {
    number: '04',
    title: 'Consultar reportes',
    description:
      'La administración consulta reportes, exporta información en CSV y revisa la analítica de riesgo para tomar mejores decisiones.',
    icon: FileBarChart,
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden border-y border-sky-100 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-24">
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
      <div className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Cómo funciona
          </p>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Un flujo simple para controlar el inventario del hotel
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            El sistema organiza el inventario en un proceso claro: registrar
            productos, controlar movimientos, detectar necesidades y consultar
            información para la toma de decisiones.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/15"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-6 flex items-center justify-between">
                  <span className="text-5xl font-bold text-white/10">
                    {step.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  <span>Flujo operativo</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{step.number}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}