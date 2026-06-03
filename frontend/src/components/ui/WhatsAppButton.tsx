"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  // Reemplaza este número con el número de WhatsApp de ventas/soporte de la empresa
  // Formato internacional sin el símbolo + (Ej: 573001234567 para Colombia)
  const phoneNumber = "1234567890" 
  const message = "Hola, me gustaría obtener más información sobre Hotel Tech."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] focus:ring-offset-background"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20 border border-white"></span>
      </span>
    </a>
  )
}
