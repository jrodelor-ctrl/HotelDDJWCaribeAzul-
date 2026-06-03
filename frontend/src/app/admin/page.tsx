import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Esta página será dinámica ya que lee de la base de datos
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const supabase = await createClient()
  
  // Obtener los leads ordenados por el más reciente
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error cargando los leads</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-purple mb-2">Panel Administrativo</h1>
        <p className="text-muted-foreground">Listado de prospectos recibidos desde la Landing Page.</p>
      </div>

      <div className="bg-background border border-border/50 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Fecha</th>
                <th className="px-6 py-4 font-semibold">Nombre</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Teléfono</th>
                <th className="px-6 py-4 font-semibold">Hotel/Empresa</th>
                <th className="px-6 py-4 font-semibold">Mensaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {leads && leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(lead.created_at), "dd MMM yyyy, HH:mm", { locale: es })}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">{lead.nombre}</td>
                    <td className="px-6 py-4">{lead.email}</td>
                    <td className="px-6 py-4">{lead.telefono || "-"}</td>
                    <td className="px-6 py-4">{lead.empresa || "-"}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={lead.mensaje}>
                      {lead.mensaje || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    Aún no hay leads registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
