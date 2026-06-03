'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Boxes } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DashboardMockup } from '@/components/ui/DashboardMockup';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-32 md:pt-48">
      <div className="absolute inset-0 h-full w-full bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-20 dark:opacity-30"
        >
          <source src="/Man_entering_hotel_202604291733.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background dark:from-background/60" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-sky/20 opacity-50 blur-3xl dark:bg-brand-sky/10" />
      <div className="pointer-events-none absolute left-0 top-40 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand-fuchsia/20 opacity-50 blur-3xl dark:bg-brand-fuchsia/10" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl space-y-8"
        >
          <div className="inline-flex items-center rounded-full border border-brand-purple/20 bg-background/50 px-3 py-1 text-sm font-medium text-brand-purple backdrop-blur-sm dark:text-brand-purple-light">
            <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-brand-purple" />
            Sistema interno de inventario hotelero
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Sistema de Gestión de Inventarios del{' '}
            <span className="bg-gradient-to-r from-brand-purple to-brand-sky bg-clip-text text-transparent">
              Hotel DDJW Caribe Azul S.A.S.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Plataforma web interna para registrar productos, controlar entradas
            y salidas, consultar stock actualizado, generar reportes y anticipar
            riesgos de desabastecimiento en las áreas del hotel.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              size="lg"
              className="group h-14 w-full px-8 text-base sm:w-auto"
              asChild
            >
              <Link href="/login">
                Iniciar sesión
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full px-8 text-base sm:w-auto"
              asChild
            >
              <a href="#servicios">
                <Boxes className="mr-2" />
                Ver funcionalidades
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl md:mt-24"
        >
          <div className="mx-auto h-[400px] max-w-5xl rounded-xl border border-border/50 bg-background/50 p-1.5 shadow-2xl shadow-brand-purple/10 backdrop-blur-sm md:h-[600px] md:p-3">
            <DashboardMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
}