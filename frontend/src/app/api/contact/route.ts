import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Debe ser un correo válido"),
  telefono: z.string().optional(),
  hotel: z.string().optional(),
  habitaciones: z.number().optional(),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  plan_interes: z.enum(['basico', 'pro', 'empresarial']).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.format() }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from('leads').insert(parsed.data)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Contact error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
