"use client"

import { motion } from "framer-motion"

export function MetricsSection() {
  const metrics = [
    { value: "+30%", label: "Aumento en Reservas Directas" },
    { value: "-40%", label: "Tiempo Administrativo" },
    { value: "0", label: "Errores de Overbooking" },
    { value: "99.9%", label: "Uptime del Sistema" },
  ]

  return (
    <section className="py-20 bg-brand-purple text-brand-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-fuchsia/30 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-sky/30 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <h4 className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter">
                {metric.value}
              </h4>
              <p className="text-brand-purple-light font-medium text-sm md:text-base">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
