'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = storage.getTheme() as 'light' | 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    storage.setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={toggleTheme}
      aria-label="Cambiar modo claro u oscuro"
    >
      {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
    </Button>
  );
}
