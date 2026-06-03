'use client';

import {
  AlertTriangle,
  ArrowRightLeft,
  BrainCircuit,
  FileSpreadsheet,
  Package,
  ShoppingCart,
} from 'lucide-react';

const services = [
  {
    title: 'Gestión de productos',
    description:
      'Registra productos con categoría, precio, proveedor, unidad de medida, stock actual y stock mínimo.',
    icon: Package,
  },
  {
    title: 'Control de entradas y salidas',
    description:
      'Registra movimientos de inventario por área del hotel y actualiza el stock automáticamente.',
    icon: ArrowRightLeft,
  },
  {
    title: 'Alertas de stock bajo',
    description:
      'Identifica productos próximos a agotarse para evitar faltantes y compras tardías.',
    icon: AlertTriangle,
  },
  {
    title: 'Reportes de inventario',
    description:
      'Consulta el estado del inventario, valor total y productos críticos con exportación en CSV.',
    icon: FileSpreadsheet,
  },
  {
    title: 'Solicitudes de compra',
    description:
      'Genera solicitudes internas para reponer productos con bajo inventario y controlar aprobaciones.',
    icon: ShoppingCart,
  },
  {
    title: 'Analítica de riesgo',
    description:
      'Calcula el riesgo de desabastecimiento según el consumo reciente y los días estimados de duración.',
    icon: BrainCircuit,
  },
];

export function ServicesSection() {
  return (
    <section
      id="servicios"
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
            Funcionalidades del sistema
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Control centralizado del inventario hotelero
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Inventario DDJW reemplaza el manejo manual en Excel por una
            plataforma web interna conectada a la nube, con inventario
            actualizado, trazabilidad de movimientos, reportes y alertas para
            apoyar la toma de decisiones.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/15"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-300">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <span>Módulo incluido</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}