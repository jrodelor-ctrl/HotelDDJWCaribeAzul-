'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import type { Usuario } from '@/types/auth';

type NavbarProps = {
  onOpenMenu: () => void;
};

export function Navbar({ onOpenMenu }: NavbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<Usuario | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUser(storage.getUser());
    setMounted(true);
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onOpenMenu}
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Abrir menú principal"
        >
          ☰
        </button>

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Sistema de Gestión de Inventarios Hotel DDJW Caribe Azul S.A.S.
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mounted && user
              ? `${user.nombre} · ${user.rol}`
              : 'Cargando usuario...'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button type="button" variant="ghost" onClick={handleLogout}>
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
}