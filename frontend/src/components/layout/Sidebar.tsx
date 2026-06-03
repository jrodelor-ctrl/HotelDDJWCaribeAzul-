'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/productos', label: 'Productos', icon: '📦' },
  { href: '/movimientos', label: 'Movimientos', icon: '🔁' },
  { href: '/reportes', label: 'Reportes', icon: '📄' },
  { href: '/solicitudes', label: 'Solicitudes', icon: '🛒' },
  { href: '/analitica', label: 'Analítica', icon: '🧠' },
  { href: '/ayuda', label: 'Ayuda', icon: '❓' }
];

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

export function Sidebar({ open = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white p-4 transition-transform dark:border-slate-800 dark:bg-slate-950 lg:static lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Menú principal"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-blue-600">
            Inventario DDJW
          </p>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            DDJW Caribe Azul
          </h1>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}