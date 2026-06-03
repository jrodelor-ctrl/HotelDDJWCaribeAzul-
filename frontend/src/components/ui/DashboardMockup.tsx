"use client"

import {
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  Boxes,
  ClipboardList,
  FileSpreadsheet,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Productos", icon: Package },
  { label: "Movimientos", icon: Boxes },
  { label: "Reportes", icon: FileSpreadsheet },
  { label: "Solicitudes", icon: ShoppingCart },
]

const stockItems = [
  { name: "Toallas blancas", stock: 3, min: 10, status: "Crítico" },
  { name: "Shampoo 30 ml", stock: 25, min: 40, status: "Stock bajo" },
  { name: "Bombillos LED", stock: 4, min: 10, status: "Stock bajo" },
]

const movements = [
  { type: "Entrada", product: "Arroz blanco", qty: "+20 unidades", icon: ArrowUpCircle },
  { type: "Salida", product: "Toallas blancas", qty: "-7 unidades", icon: ArrowDownCircle },
  { type: "Salida", product: "Shampoo 30 ml", qty: "-15 unidades", icon: ArrowDownCircle },
]

export function DashboardMockup() {
  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-border bg-background text-foreground">
      <div className="grid h-full grid-cols-[180px_1fr]">
        <aside className="hidden border-r border-border bg-muted/30 p-5 md:flex md:flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple text-sm font-bold text-white">
              DD
            </div>

            <div>
              <p className="text-sm font-bold leading-none">Inventario</p>
              <p className="mt-1 text-xs text-muted-foreground">Caribe Azul</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                    item.active
                      ? "bg-brand-purple/15 text-brand-purple"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
              )
            })}
          </nav>

          <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
            <Settings className="h-4 w-4" />
            Configuración
          </div>
        </aside>

        <main className="flex min-w-0 flex-col p-4 md:p-6">
          <header className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Sistema interno · Hotel DDJW Caribe Azul S.A.S.
              </p>
              <h3 className="mt-1 text-lg font-bold">
                Resumen de inventario
              </h3>
            </div>

            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              En línea
            </div>
          </header>

          <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Productos</p>
              <p className="mt-2 text-2xl font-bold">128</p>
            </div>

            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Stock bajo</p>
              <p className="mt-2 text-2xl font-bold text-amber-500">18</p>
            </div>

            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Agotados</p>
              <p className="mt-2 text-2xl font-bold text-red-500">4</p>
            </div>

            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Movimientos</p>
              <p className="mt-2 text-2xl font-bold text-brand-sky">342</p>
            </div>
          </section>

          <section className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Productos críticos</h4>
                  <p className="text-xs text-muted-foreground">
                    Alertas generadas automáticamente
                  </p>
                </div>

                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>

              <div className="space-y-3">
                {stockItems.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-lg border border-border bg-muted/20 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Stock: {item.stock} · Mínimo: {item.min}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          item.status === "Crítico"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-xl border border-border bg-background p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-bold">Movimientos recientes</h4>
                  <ClipboardList className="h-5 w-5 text-brand-purple" />
                </div>

                <div className="space-y-3">
                  {movements.map((movement) => {
                    const Icon = movement.icon
                    const isEntrada = movement.type === "Entrada"

                    return (
                      <div
                        key={`${movement.type}-${movement.product}`}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full ${
                            isEntrada
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {movement.product}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {movement.type} · {movement.qty}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-bold">Riesgo de inventario</h4>
                  <BarChart3 className="h-5 w-5 text-brand-sky" />
                </div>

                <div className="flex h-28 items-end gap-2">
                  <div className="h-1/3 flex-1 rounded-t-md bg-emerald-300" />
                  <div className="h-1/2 flex-1 rounded-t-md bg-brand-sky" />
                  <div className="h-2/3 flex-1 rounded-t-md bg-brand-purple" />
                  <div className="h-full flex-1 rounded-t-md bg-brand-fuchsia" />
                  <div className="h-3/5 flex-1 rounded-t-md bg-amber-400" />
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Análisis basado en salidas recientes y stock actual.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}