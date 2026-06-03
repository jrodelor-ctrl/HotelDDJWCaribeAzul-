'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ClipboardList } from 'lucide-react';

const guideItems = [
  {
    question: '1. Iniciar sesión en el sistema',
    answer:
      'El usuario debe ingresar con las credenciales asignadas por el administrador. El sistema utiliza autenticación JWT y guarda la sesión de forma local para permitir el acceso a los módulos internos.',
  },
  {
    question: '2. Registrar productos del inventario',
    answer:
      'Desde el módulo Productos se pueden crear artículos con nombre, categoría, precio, proveedor, unidad de medida, stock inicial y stock mínimo. Estos datos se almacenan en MongoDB Atlas.',
  },
  {
    question: '3. Controlar entradas y salidas',
    answer:
      'El módulo Movimientos permite registrar entradas y salidas de inventario. Las entradas aumentan el stock y las salidas lo disminuyen. Cuando se registra una salida, se debe indicar el área del hotel que utiliza el producto.',
  },
  {
    question: '4. Evitar errores de stock',
    answer:
      'Antes de registrar una salida, el sistema valida que exista stock suficiente. Si la cantidad solicitada supera el stock disponible, la operación se bloquea para evitar cantidades negativas.',
  },
  {
    question: '5. Consultar reportes',
    answer:
      'En el módulo Reportes se puede consultar el estado general del inventario, identificar productos agotados o con stock bajo, calcular el valor total del inventario y exportar la información en formato CSV.',
  },
  {
    question: '6. Gestionar solicitudes internas',
    answer:
      'El módulo Solicitudes permite crear solicitudes de compra para productos que necesitan reposición. Estas solicitudes pueden quedar pendientes, aprobarse o rechazarse según la decisión administrativa.',
  },
  {
    question: '7. Revisar analítica de riesgo',
    answer:
      'La analítica de riesgo estima cuántos días podría durar el stock actual según las salidas recientes. Esto ayuda a anticipar desabastecimientos y planificar compras con mayor precisión.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="guia-rapida"
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
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20">
            <ClipboardList className="h-8 w-8" />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Guía rápida
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Uso básico del sistema
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Conoce el flujo principal del Sistema de Gestión de Inventarios del
            Hotel DDJW Caribe Azul S.A.S.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {guideItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-3xl border bg-white/10 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-300 ${
                  isOpen
                    ? 'border-cyan-300/30'
                    : 'border-white/10 hover:border-cyan-300/30'
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white">
                    {item.question}
                  </span>

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                      isOpen
                        ? 'bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20'
                        : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="border-t border-white/10 bg-slate-950/30 px-6 pb-6 pt-5 leading-7 text-slate-300">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}