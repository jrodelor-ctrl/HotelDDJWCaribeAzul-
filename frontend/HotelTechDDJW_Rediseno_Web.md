

| 🏨 HOTEL TECH SOLUCIÓN DDJW *PROPUESTA TÉCNICA COMPLETA DE REDISEÑO WEB* Next.js  •  Supabase  •  Tailwind CSS  •  TypeScript |
| :---: |

| Blanco \#FFFFFF | Morado \#7B2FBE | Azul Cielo \#00AEEF | Fucsia \#D4145A |
| :---: | :---: | :---: | :---: |

Versión 1.0  —  Abril 2026

# **1\. DIAGNÓSTICO DEL SITIO ACTUAL**

*URL analizada: https://hoteltechosolucionddjw.netlify.app*

## **1.1  Problemas Críticos (deben corregirse)**

| 🔴 CRÍTICO — Sección Beneficios vacía |
| :---- |
| La sección 'Beneficios' tiene título pero cero contenido. El visitante ve un bloque en blanco que genera desconfianza inmediata. Se debe completar con al menos 4-6 beneficios concretos con íconos, cifras y texto descriptivo. |

| 🔴 CRÍTICO — Sin formulario de contacto |
| :---- |
| La sección de contacto muestra solo texto plano (correo y teléfono). No existe formulario funcional. Esto elimina la posibilidad de capturar leads desde la web. Se debe implementar un formulario conectado a Supabase para registrar prospectos. |

| 🔴 CRÍTICO — Sin llamadas a la acción (CTA) |
| :---- |
| Ningún servicio tiene botón de acción. El usuario lee el contenido y no sabe qué hacer. Se necesitan CTAs claros: 'Solicitar demo', 'Ver planes', 'Contactar asesor'. |

## **1.2  Problemas de Contenido y Confianza**

| IMPACTO | PROBLEMA | SOLUCIÓN PROPUESTA |
| :---: | :---- | :---- |
| 🟡 Alto | Sin precios ni planes | Sección de pricing con 3 planes (Básico / Pro / Empresarial) |
| 🟡 Alto | Sin testimonios ni casos de éxito | Sección de clientes con logos y reseñas verificadas |
| 🟡 Alto | Sin sección '¿Quiénes somos?' | Sección About Us con equipo, años de experiencia y misión |
| 🟡 Alto | Sin capturas del sistema | Galería/mockup del dashboard real del software |
| 🟢 Medio | Sin chat ni WhatsApp flotante | Botón WhatsApp flotante (vital en mercado latinoamericano) |
| 🟢 Medio | Sin favicon ni metadatos SEO | Configuración completa de SEO con next/head |
| 🟢 Medio | Sin pie de página real | Footer con dirección, redes sociales y políticas legales |
| 🟢 Medio | Sin modo oscuro funcional | Toggle dark mode con next-themes |

# **2\. REFERENCIAS DE DISEÑO Y COMPETENCIA**

*Páginas similares estudiadas para definir el nuevo diseño*

## **2.1  Referencia Principal — Mews (mews.com)**

Mews es el PMS hotelero valorado en $2.5 mil millones (2026). Su landing page es la referencia de diseño SaaS para hotelería moderna.

| ✅ Hero con video de fondo Sección inicial full-screen con headline directo y CTA principal | ✅ Barra de logos de clientes Strip con logos de hoteles clientes — genera confianza inmediata | ✅ Feature alternadas Imagen \+ texto alternados para describir cada módulo del sistema |
| :---- | :---- | :---- |
| **✅ Testimonios con foto** Carrusel de testimonios de hoteleros reales con foto y cargo | **✅ Métricas de impacto** Contadores animados: '12,500 propiedades', '$19.7B procesados' | **✅ CTA final con gradiente** Bloque final de conversión con fondo en gradiente y botón destacado |

## **2.2  Otras Referencias Clave**

| SITIO | ELEMENTO A ADOPTAR | URL DE REFERENCIA |
| :---- | :---- | :---- |
| **Cloudbeds** | Integración directa PMS \+ booking engine en la misma plataforma | *cloudbeds.com* |
| **Aplio Template** | Estructura de secciones SaaS Next.js con Megamenu | *themeforest.net* |
| **SaaS UI** | Layout hero \+ features \+ pricing \+ testimonials gratuito | *nextjstemplates.com/saas-ui* |
| **Finwise (Vercel)** | Template Next.js \+ Tailwind ligero y de alta conversión | *vercel.com/templates/next.js/finwise-saas-landing-page* |

# **3\. PALETA DE COLORES Y TIPOGRAFÍA**

## **3.1  Colores Primarios**

| Blanco \#FFFFFF | Morado \#7B2FBE | Azul Cielo \#00AEEF | Fucsia \#D4145A |
| :---: | :---: | :---: | :---: |

| *Uso: Fondo principal, texto sobre oscuro* | *Uso: Headings, navbar, botones primarios, acentos* | *Uso: Íconos, badges, fondos de secciones alternas* | *Uso: CTAs secundarios, hover states, highlights* |
| :---: | :---: | :---: | :---: |

## **3.2  Colores Secundarios (fondos de secciones)**

| Morado Claro \#EDE7F6 | Cielo Claro \#E0F4FF | Fucsia Claro \#FCEEF4 |
| :---: | :---: | :---: |

## **3.3  Tipografía**

| ROL | FUENTE | TAMAÑO / USO |
| :---- | :---- | :---- |
| **Títulos principales** | Inter Bold / Poppins Bold | 48–72px — Hero, H1 de secciones |
| **Subtítulos** | Inter SemiBold | 28–36px — H2, nombres de features |
| **Cuerpo de texto** | Inter Regular | 16–18px — Párrafos, descripciones |
| **Badges / Tags** | Inter Medium | 12–14px — Etiquetas de precios, estados |
| **Código / Técnico** | JetBrains Mono | 14px — Snippets, documentación API |

# **4\. ARQUITECTURA COMPLETA DE SECCIONES**

La nueva web tendrá las siguientes secciones en orden de aparición:

| 01 | NAVBAR | Logo \+ Links de navegación \+ Botón CTA 'Solicitar Demo' \+ Toggle Dark Mode. Sticky con blur al hacer scroll. |
| :---: | :---- | :---- |

| 02 | HERO | Headline impactante, subtítulo, dos botones CTA ('Agendar demo' y 'Ver video'), imagen o animación del dashboard del sistema. Fondo con gradiente morado → azul cielo. |
| :---: | :---- | :---- |

| 03 | STRIP DE CONFIANZA | Barra horizontal con: '✅ \+50 hoteles activos  |  ✅ Soporte 24/7  |  ✅ Sin contratos anuales  |  ✅ Implementación en 48h'. |
| :---: | :---- | :---- |

| 04 | SERVICIOS | 6 tarjetas de servicios con ícono, título y descripción \+ botón 'Saber más'. Fondo blanco. |
| :---: | :---- | :---- |

| 05 | BENEFICIOS | 4-6 beneficios con ícono grande, cifra destacada y descripción. Ej: '40% menos tiempo en check-in', '0 dobles reservas'. Fondo azul cielo claro. |
| :---: | :---- | :---- |

| 06 | CÓMO FUNCIONA | Sección paso a paso numerada (3-4 pasos): Registro → Configuración → Capacitación → Go-Live. Fondo blanco. |
| :---: | :---- | :---- |

| 07 | CAPTURAS DEL SISTEMA | Galería tipo mockup con screenshot del dashboard, panel de reservas, y reporte de ocupación. Tabs interactivos. |
| :---: | :---- | :---- |

| 08 | PLANES Y PRECIOS | 3 columnas (Básico / Pro / Empresarial) con lista de features incluidas, precio mensual y botón de contratación. Fondo morado claro. |
| :---: | :---- | :---- |

| 09 | TESTIMONIOS | Carrusel con 3-5 testimonios de hoteleros reales: foto, nombre, cargo, hotel, texto de testimonio y estrellas. |
| :---: | :---- | :---- |

| 10 | MÉTRICAS | Contadores animados: Hoteles activos / Reservas procesadas / Satisfacción de clientes / Años de experiencia. |
| :---: | :---- | :---- |

| 11 | QUIÉNES SOMOS | Breve historia de la empresa, misión, visión y foto del equipo fundador. Fondo blanco. |
| :---: | :---- | :---- |

| 12 | CONTACTO | FORMULARIO COMPLETO: Nombre \+ Email \+ Teléfono \+ Hotel \+ N° habitaciones \+ Mensaje \+ Botón enviar. Conectado a Supabase. \+ Mapa de ubicación. |
| :---: | :---- | :---- |

| 13 | FAQ | Acordeón con 6-8 preguntas frecuentes. Fondo gris claro. |
| :---: | :---- | :---- |

| 14 | CTA FINAL | Bloque de conversión: '¿Listo para transformar tu hotel?' \+ botón grande. Fondo con gradiente morado-fucsia. |
| :---: | :---- | :---- |

| 15 | FOOTER | Logo, descripción, links de navegación, redes sociales, políticas de privacidad, términos de uso, copyright. |
| :---: | :---- | :---- |

# **5\. STACK TECNOLÓGICO**

## **5.1  Frontend — Next.js 14+ (App Router)**

| ⚡ Next.js 14 App Router, SSR, ISR, Server Components para máximo SEO y velocidad | 🎨 Tailwind CSS 3 Utility-first styling con configuración de colores personalizada | 🔷 TypeScript Tipado estricto para reducir bugs y mejorar mantenibilidad |
| :---- | :---- | :---- |
| **🖱 Framer Motion** Animaciones scroll-trigger, contadores animados, transiciones suaves | **🎡 Swiper.js** Carrusel de testimonios táctil y responsivo | **🌙 next-themes** Modo oscuro/claro sin parpadeo (SSR-safe) |

## **5.2  Backend — Supabase**

| 🗄 PostgreSQL Base de datos relacional gestionada. Tablas: leads, contactos, testimonios | 🔐 Auth Autenticación para panel admin: ver leads, gestionar testimonios | 📬 Edge Functions Envío de email de confirmación al prospecto tras llenar formulario |
| :---- | :---- | :---- |
| **🔔 Realtime** Panel admin con notificaciones en tiempo real de nuevos leads | **📁 Storage** Almacenamiento de capturas de pantalla del sistema y logos de clientes | **🛡 RLS** Row Level Security para proteger datos de leads y solo permitir al admin |

## **5.3  Herramientas Adicionales**

| 📧 Resend Envío de emails transaccionales al recibir leads | ✅ Zod Validación de formularios tanto en cliente como servidor | 📊 Vercel Analytics Métricas de visitas, conversión y rendimiento del sitio | 🚀 Vercel Deploy CI/CD automático con preview URLs por cada branch de Git |
| :---- | :---- | :---- | :---- |

# **6\. ESTRUCTURA DE CARPETAS DEL PROYECTO**

Estructura recomendada para Next.js 14 con App Router:

| hotel-tech-ddjw/ ├── app/ │   ├── layout.tsx           ← Layout raíz con navbar y footer │   ├── page.tsx             ← Landing page principal │   ├── globals.css          ← Variables CSS y estilos globales │   └── api/ │       └── contact/route.ts ← API Route para formulario de contacto ├── components/ │   ├── layout/ │   │   ├── Navbar.tsx │   │   └── Footer.tsx │   ├── sections/ │   │   ├── HeroSection.tsx │   │   ├── TrustStrip.tsx │   │   ├── ServicesSection.tsx │   │   ├── BenefitsSection.tsx │   │   ├── HowItWorksSection.tsx │   │   ├── ScreenshotsSection.tsx │   │   ├── PricingSection.tsx │   │   ├── TestimonialsSection.tsx │   │   ├── MetricsSection.tsx │   │   ├── AboutSection.tsx │   │   ├── ContactSection.tsx │   │   ├── FaqSection.tsx │   │   └── CtaFinalSection.tsx │   └── ui/ │       ├── Button.tsx │       ├── Badge.tsx │       ├── Card.tsx │       └── WhatsAppButton.tsx ├── lib/ │   ├── supabase/ │   │   ├── client.ts        ← Supabase browser client │   │   └── server.ts        ← Supabase server client │   ├── validations.ts       ← Esquemas Zod │   └── constants.ts         ← Textos, planes, servicios ├── public/ │   ├── images/ │   ├── screenshots/ │   └── logos-clientes/ ├── tailwind.config.ts       ← Paleta de colores personalizada ├── .env.local               ← Variables de entorno Supabase └── next.config.js |
| :---- |

# **7\. ESQUEMA DE BASE DE DATOS — SUPABASE**

## **7.1  Tabla: leads (prospectos del formulario de contacto)**

| CREATE TABLE leads (   id          UUID DEFAULT gen\_random\_uuid() PRIMARY KEY,   nombre      TEXT NOT NULL,   email       TEXT NOT NULL,   telefono    TEXT,   hotel       TEXT,   habitaciones INTEGER,   mensaje     TEXT,   plan\_interes TEXT,     \-- 'basico' | 'pro' | 'empresarial'   estado      TEXT DEFAULT 'nuevo',  \-- 'nuevo' | 'contactado' | 'cerrado'   created\_at  TIMESTAMPTZ DEFAULT NOW() ); \-- RLS: Solo el admin autenticado puede leer leads ALTER TABLE leads ENABLE ROW LEVEL SECURITY; CREATE POLICY 'admin\_only' ON leads   FOR ALL USING (auth.role() \= 'authenticated'); \-- Inserción pública (formulario de contacto sin login) CREATE POLICY 'public\_insert' ON leads   FOR INSERT WITH CHECK (true); |
| :---- |

## **7.2  Tabla: testimonios**

| CREATE TABLE testimonios (   id          UUID DEFAULT gen\_random\_uuid() PRIMARY KEY,   nombre      TEXT NOT NULL,   cargo       TEXT,   hotel       TEXT,   texto       TEXT NOT NULL,   estrellas   INTEGER DEFAULT 5,   foto\_url    TEXT,   activo      BOOLEAN DEFAULT true,   created\_at  TIMESTAMPTZ DEFAULT NOW() ); |
| :---- |

## **7.3  Variables de Entorno (.env.local)**

| NEXT\_PUBLIC\_SUPABASE\_URL=https://tu-proyecto.supabase.co NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=tu-anon-key SUPABASE\_SERVICE\_ROLE\_KEY=tu-service-role-key RESEND\_API\_KEY=tu-resend-api-key CONTACT\_EMAIL=atencionalcliente@hoteltechddjw.com |
| :---- |

# **8\. CÓDIGO CLAVE DEL PROYECTO**

## **8.1  Configuración Tailwind con colores de marca**

| // tailwind.config.ts import type { Config } from 'tailwindcss' const config: Config \= {   darkMode: 'class',   content: \['./app/\*\*/\*.{ts,tsx}', './components/\*\*/\*.{ts,tsx}'\],   theme: {     extend: {       colors: {         brand: {           purple:  '\#7B2FBE',           fuchsia: '\#D4145A',           sky:     '\#00AEEF',           white:   '\#FFFFFF',           'purple-light': '\#EDE7F6',           'sky-light':    '\#E0F4FF',           'fuchsia-light':'\#FCEEF4',         }       },       fontFamily: {         sans: \['Inter', 'sans-serif'\],       }     }   },   plugins: \[\], } export default config |
| :---- |

## **8.2  API Route — Formulario de Contacto**

| // app/api/contact/route.ts import { createClient } from '@/lib/supabase/server' import { NextRequest, NextResponse } from 'next/server' import { z } from 'zod' const schema \= z.object({   nombre:      z.string().min(2),   email:       z.string().email(),   telefono:    z.string().optional(),   hotel:       z.string().optional(),   habitaciones:z.number().optional(),   mensaje:     z.string().min(10),   plan\_interes:z.enum(\['basico','pro','empresarial'\]).optional(), }) export async function POST(req: NextRequest) {   const body \= await req.json()   const parsed \= schema.safeParse(body)   if (\!parsed.success) {     return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })   }   const supabase \= createClient()   const { error } \= await supabase.from('leads').insert(parsed.data)   if (error) return NextResponse.json({ error: error.message }, { status: 500 })   return NextResponse.json({ success: true }) } |
| :---- |

## **8.3  Componente ContactSection.tsx**

| 'use client' import { useState } from 'react' export default function ContactSection() {   const \[form, setForm\] \= useState({     nombre: '', email: '', telefono: '',     hotel: '', habitaciones: '', mensaje: '', plan\_interes: ''   })   const \[loading, setLoading\] \= useState(false)   const \[success, setSuccess\] \= useState(false)   const handleSubmit \= async (e: React.FormEvent) \=\> {     e.preventDefault()     setLoading(true)     const res \= await fetch('/api/contact', {       method: 'POST',       headers: { 'Content-Type': 'application/json' },       body: JSON.stringify({ ...form, habitaciones: Number(form.habitaciones) })     })     setLoading(false)     if (res.ok) setSuccess(true)   }   return (     \<section id='contacto' className='bg-brand-purple-light py-20'\>       \<div className='max-w-2xl mx-auto px-4'\>         \<h2 className='text-4xl font-bold text-brand-purple mb-8'\>Contáctenos\</h2\>         {success ? (           \<p className='text-brand-fuchsia font-bold text-xl'\>             ✅ ¡Mensaje enviado\! Nos comunicaremos pronto.           \</p\>         ) : (           \<form onSubmit={handleSubmit} className='space-y-4'\>             {/\* Campos: nombre, email, telefono, hotel, habitaciones \*/}             {/\* mensaje, plan\_interes, botón de envío \*/}             \<button type='submit' disabled={loading}               className='w-full bg-brand-fuchsia text-white py-3 rounded-xl                          hover:bg-brand-purple transition-colors font-semibold'\>               {loading ? 'Enviando...' : 'Enviar mensaje →'}             \</button\>           \</form\>         )}       \</div\>     \</section\>   ) } |
| :---- |

# **9\. PLANES Y PRECIOS SUGERIDOS**

Definir los planes de precios es esencial para que los visitantes puedan tomar una decisión. Se recomienda:

| 🥉 BÁSICO Desde $49 USD/mes Hoteles hasta 20 habitaciones | 🥇 PRO ⭐ MÁS POPULAR Desde $99 USD/mes Hoteles hasta 80 habitaciones | 🏆 EMPRESARIAL Desde $199 USD/mes Sin límite de habitaciones |
| ----- | ----- | ----- |
| Gestión de reservas Control de habitaciones Registro de huéspedes Reportes básicos Soporte por email | Todo lo del plan Básico Facturación electrónica Panel de monitoreo avanzado Integración con OTAs Soporte 24/7 por WhatsApp Capacitación incluida | Todo lo del plan Pro Multi-propiedad API personalizada Revenue management Gerente de cuenta dedicado SLA de 99.9% uptime |

# **10\. SEO Y RENDIMIENTO**

## **10.1  Configuración SEO con Next.js Metadata API**

| // app/layout.tsx import type { Metadata } from 'next' export const metadata: Metadata \= {   title: 'Hotel Tech Solución DDJW | Software de Gestión Hotelera',   description: 'Automatiza la gestión de tu hotel: reservas, habitaciones,                facturación y reportes en una sola plataforma. Prueba gratis.',   keywords: \['software hotelero Colombia', 'PMS hotel', 'gestión hotelera',              'sistema reservas hotel', 'hotel tech'\],   openGraph: {     title: 'Hotel Tech Solución DDJW',     description: 'Transforma la gestión de tu hotel con tecnología.',     url: 'https://hoteltechddjw.com',     siteName: 'Hotel Tech DDJW',     images: \[{ url: '/og-image.png', width: 1200, height: 630 }\],     locale: 'es\_CO',     type: 'website',   },   twitter: { card: 'summary\_large\_image' },   robots: { index: true, follow: true }, } |
| :---- |

## **10.2  Checklist de Rendimiento**

| OPTIMIZACIÓN | IMPLEMENTACIÓN |
| :---- | :---- |
| **Imágenes optimizadas** | next/image con lazy loading, WebP automático y tamaños responsive |
| **Fuentes web optimizadas** | next/font/google para Inter — elimina layout shift (CLS) |
| **Componentes dinámicos** | dynamic() con loading skeleton para secciones pesadas |
| **Caché y revalidación** | ISR con revalidate para testimonios y contenido dinámico |
| **Sitemap automático** | app/sitemap.ts generado automáticamente por Next.js |
| **Web Vitals objetivo** | LCP \< 2.5s  |  FID \< 100ms  |  CLS \< 0.1 |

# **11\. PLAN DE DESARROLLO — SPRINTS**

| SPRINT | DURACIÓN | TAREAS | ENTREGABLE |
| :---: | :---- | :---- | :---- |
| **1** | Semana 1 | Setup Next.js \+ Tailwind \+ Supabase. Paleta de colores. Navbar y Footer. Hero Section y Trust Strip. | **Landing base funcional** |
| **2** | Semana 2 | Servicios, Beneficios, Cómo Funciona, Métricas con animaciones. Modo oscuro. | **Secciones de contenido** |
| **3** | Semana 3 | Screenshots/mockups. Testimonios con Swiper. Planes de precios. FAQ accordion. | **Conversión y confianza** |
| **4** | Semana 4 | Formulario de contacto \+ API \+ Supabase. Panel admin leads. Botón WhatsApp. About. | **Backend funcional** |
| **5** | Semana 5 | SEO completo. Sitemap. Meta tags OG. Optimización de imágenes. Tests de velocidad. Deploy Vercel. | **Producción lista** |

# **12\. RESUMEN EJECUTIVO**

| 🎯 OBJETIVO DEL PROYECTO Rediseñar completamente el sitio web de Hotel Tech Solución DDJW en Next.js 14 \+ Supabase, corrigiendo todos los problemas identificados y añadiendo las secciones que convierten visitantes en clientes. |
| :---: |

| 📐 15 Secciones Arquitectura completa de contenido desde Hero hasta Footer | ⚡ 5 Semanas Plan de desarrollo estructurado en 5 sprints con entregables claros | 🚀 100% Listo Código, BD, SEO y deploy en Vercel completamente documentados |
| :---: | :---: | :---: |

*— Documento generado para Hotel Tech Solución DDJW — Abril 2026 —*