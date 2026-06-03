'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { storage } from '@/lib/storage';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = storage.getToken();

    if (!token) {
      router.push('/login');
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: "url('/logo-ddjw-caribe-azul.png')",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '520px',
          }}
        />

        <p className="relative z-10 text-sm text-slate-600 dark:text-slate-300">
          Cargando sistema...
        </p>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 text-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 dark:text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.100] dark:opacity-[0.050]"
  style={{
    backgroundImage: "url('/logo-ddjw-caribe-azul.png')",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '820px',
        }}
      />

      <div className="pointer-events-none fixed -left-32 top-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/10" />
      <div className="pointer-events-none fixed -right-32 bottom-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />

      <div className="relative z-10 lg:flex">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

        {menuOpen ? (
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        ) : null}

        <div className="min-h-screen flex-1">
          <Navbar onOpenMenu={() => setMenuOpen(true)} />

          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}