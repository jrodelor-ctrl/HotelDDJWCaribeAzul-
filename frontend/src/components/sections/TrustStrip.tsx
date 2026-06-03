"use client"

import { Check } from "lucide-react"

const items = [
  "Inventario centralizado",
  "Acceso protegido por roles",
  "Reportes exportables en CSV",
  "Alertas de stock bajo",
]

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-sky/20 text-brand-sky">
                <Check className="h-4 w-4" />
              </span>

              <span className="font-semibold text-foreground">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
