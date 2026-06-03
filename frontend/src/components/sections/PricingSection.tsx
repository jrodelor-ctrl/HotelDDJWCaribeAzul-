'use client';

import {
  ArrowRightLeft,
  BrainCircuit,
  FileSpreadsheet,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from 'lucide-react';

const modules = [
  {
    title: 'Dashboard',
    description:
      'Visualiza indicadores generales del inventario, productos con stock bajo, agotados y últimos movimientos.',
    features: [
      'Indicadores principales',
      'Stock bajo y agotados',
      'Últimos movimientos',
      'Resumen operativo',
    ],
    icon: LayoutDashboard,
  },
  {
    title: 'Productos',
    description:
      'Administra los productos del hotel con categoría, precio, proveedor, unidad de medida y stock mínimo.',
    features: [
      'Crear productos',
      'Editar información',
      'Desactivar productos',
      'Consultar stock actual',
    ],
    icon: Package,
  },
  {
    title: 'Movimientos',
    description:
      'Registra entradas y salidas de inventario por área del hotel, conservando trazabilidad completa.',
    features: [
      'Entradas de inventario',
      'Salidas por área',
      'Validación de stock',
      'Historial de movimientos',
    ],
    icon: ArrowRightLeft,
  },
  {
    title: 'Reportes',
    description:
      'Consulta el estado del inventario y exporta información en formato CSV para respaldo administrativo.',
    features: [
      'Reporte de inventario',
      'Filtro por estado',
      'Valor total del stock',
      'Exportación CSV',
    ],
    icon: FileSpreadsheet,
  },
  {
    title: 'Solicitudes',
    description:
      'Gestiona solicitudes internas de compra para productos con bajo inventario o riesgo de agotarse.',
    features: [
      'Crear solicitudes',
      'Prioridades',
      'Aprobar o rechazar',
      'Historial interno',
    ],
    icon: ShoppingCart,
  },
  {
    title: 'Analítica',
    description:
      'Evalúa el riesgo de desabastecimiento según el consumo reciente y los días estimados de duración.',
    features: [
      'Riesgo crítico',
      'Consumo promedio',
      'Duración estimada',
      'Apoyo a decisiones',
    ],
    icon: BrainCircuit,
  },
];

export function PricingSection() {
  return (
    <section
      id="modulos"
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

      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Módulos incluidos
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Funciones principales del sistema interno
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            El sistema integra los módulos necesarios para controlar el
            inventario del Hotel DDJW Caribe Azul S.A.S. desde una plataforma
            web centralizada.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <article
                key={module.title}
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
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {module.description}
                </p>

                <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <ul className="space-y-3">
                  {module.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-cyan-300">
                  Módulo operativo de Inventario DDJW
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}