'use client';

import { useEffect, useState } from 'react';
import { Eye, EyeOff, KeyRound, Save, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  authService,
  type ActualizarPerfilPayload,
  type CambiarPasswordPayload,
  type PerfilUsuario
} from '@/lib/auth';

export default function PerfilPage() {
  const router = useRouter();

  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);

  const [formPerfil, setFormPerfil] = useState<ActualizarPerfilPayload>({
    nombre: '',
    cargo: '',
    telefono: '',
    area: ''
  });

  const [formPassword, setFormPassword] = useState<CambiarPasswordPayload>({
    passwordActual: '',
    passwordNueva: '',
    confirmarPassword: ''
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [loadingPerfil, setLoadingPerfil] = useState(true);
  const [savingPerfil, setSavingPerfil] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [errorPerfil, setErrorPerfil] = useState('');
  const [successPerfil, setSuccessPerfil] = useState('');

  const [errorPassword, setErrorPassword] = useState('');
  const [successPassword, setSuccessPassword] = useState('');

  const cargarPerfil = async () => {
    try {
      setLoadingPerfil(true);
      setErrorPerfil('');
      setSuccessPerfil('');

      const usuario = await authService.getProfile();

      setPerfil(usuario);
      setFormPerfil({
        nombre: usuario.nombre || '',
        cargo: usuario.cargo || '',
        telefono: usuario.telefono || '',
        area: usuario.area || ''
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'No fue posible cargar el perfil.';

      setErrorPerfil(message);

      if (
        message.toLowerCase().includes('token') ||
        message.toLowerCase().includes('no autorizado')
      ) {
        authService.logout();
        router.push('/login');
      }
    } finally {
      setLoadingPerfil(false);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const handlePerfilChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormPerfil((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormPassword((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarPerfil = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSavingPerfil(true);
      setErrorPerfil('');
      setSuccessPerfil('');

      const usuarioActualizado = await authService.updateProfile({
        nombre: formPerfil.nombre.trim(),
        cargo: formPerfil.cargo.trim(),
        telefono: formPerfil.telefono.trim(),
        area: formPerfil.area.trim()
      });

      setPerfil(usuarioActualizado);
      setSuccessPerfil('Perfil actualizado correctamente.');
    } catch (err) {
      setErrorPerfil(
        err instanceof Error ? err.message : 'No fue posible actualizar el perfil.'
      );
    } finally {
      setSavingPerfil(false);
    }
  };

  const cambiarPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSavingPassword(true);
      setErrorPassword('');
      setSuccessPassword('');

      await authService.changePassword(formPassword);

      setFormPassword({
        passwordActual: '',
        passwordNueva: '',
        confirmarPassword: ''
      });

      setSuccessPassword('Contraseña actualizada correctamente.');
    } catch (err) {
      setErrorPassword(
        err instanceof Error
          ? err.message
          : 'No fue posible cambiar la contraseña.'
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const rolTexto =
    perfil?.rol === 'admin'
      ? 'Administrador'
      : perfil?.rol === 'gerente'
        ? 'Gerente'
        : 'Inventario';

  return (
    <AppLayout>
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">
            Mi perfil
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Perfil de usuario
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Consulta y actualiza tu información interna del sistema. El correo y
            el rol son datos protegidos y solo pueden ser modificados por un
            administrador.
          </p>
        </div>

        {loadingPerfil ? (
          <Card>
            <p className="text-sm text-slate-500">Cargando perfil...</p>
          </Card>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6">
              <Card>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-800 via-sky-700 to-cyan-600 text-white shadow-lg shadow-sky-200">
                    <UserCircle className="h-11 w-11" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold">
                        {perfil?.nombre || 'Usuario del sistema'}
                      </h2>

                      <Badge variant="success">
                        {rolTexto}
                      </Badge>
                    </div>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {perfil?.correo}
                    </p>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Autenticación:{' '}
                      <span className="font-semibold">
                        {perfil?.proveedorAuth === 'google'
                          ? 'Google'
                          : 'Correo y contraseña'}
                      </span>
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="mb-5">
                  <h2 className="text-xl font-bold">
                    Información interna
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Actualiza tus datos básicos para mantener el registro interno
                    del hotel.
                  </p>
                </div>

                {errorPerfil ? (
                  <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-600">
                      {errorPerfil}
                    </p>
                  </div>
                ) : null}

                {successPerfil ? (
                  <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <p className="text-sm font-medium text-emerald-700">
                      {successPerfil}
                    </p>
                  </div>
                ) : null}

                <form onSubmit={guardarPerfil} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Nombre completo
                      </label>

                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={formPerfil.nombre}
                        onChange={handlePerfilChange}
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cargo"
                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Cargo
                      </label>

                      <input
                        id="cargo"
                        name="cargo"
                        type="text"
                        value={formPerfil.cargo}
                        onChange={handlePerfilChange}
                        placeholder="Ej: Administrador del sistema"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="telefono"
                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Teléfono
                      </label>

                      <input
                        id="telefono"
                        name="telefono"
                        type="text"
                        value={formPerfil.telefono}
                        onChange={handlePerfilChange}
                        placeholder="Ej: 3000000000"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="area"
                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Área
                      </label>

                      <input
                        id="area"
                        name="area"
                        type="text"
                        value={formPerfil.area}
                        onChange={handlePerfilChange}
                        placeholder="Ej: Inventario"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                        Correo
                      </label>

                      <input
                        type="text"
                        value={perfil?.correo || ''}
                        disabled
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                        Rol
                      </label>

                      <input
                        type="text"
                        value={rolTexto}
                        disabled
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={savingPerfil}
                      className="inline-flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {savingPerfil ? 'Guardando...' : 'Guardar cambios'}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            <Card>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  <KeyRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Cambiar contraseña
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Actualiza tu contraseña de acceso local.
                  </p>
                </div>
              </div>

              {perfil?.proveedorAuth === 'google' ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-sm text-amber-700">
                    Este usuario inicia sesión con Google. La contraseña debe
                    gestionarse desde la cuenta de Google asociada.
                  </p>
                </div>
              ) : (
                <form onSubmit={cambiarPassword} className="space-y-5">
                  {errorPassword ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                      <p className="text-sm font-medium text-red-600">
                        {errorPassword}
                      </p>
                    </div>
                  ) : null}

                  {successPassword ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <p className="text-sm font-medium text-emerald-700">
                        {successPassword}
                      </p>
                    </div>
                  ) : null}

                  <div>
                    <label
                      htmlFor="passwordActual"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Contraseña actual
                    </label>

                    <input
                      id="passwordActual"
                      name="passwordActual"
                      type={mostrarPassword ? 'text' : 'password'}
                      value={formPassword.passwordActual}
                      onChange={handlePasswordChange}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="passwordNueva"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Nueva contraseña
                    </label>

                    <input
                      id="passwordNueva"
                      name="passwordNueva"
                      type={mostrarPassword ? 'text' : 'password'}
                      value={formPassword.passwordNueva}
                      onChange={handlePasswordChange}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmarPassword"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Confirmar nueva contraseña
                    </label>

                    <input
                      id="confirmarPassword"
                      name="confirmarPassword"
                      type={mostrarPassword ? 'text' : 'password'}
                      value={formPassword.confirmarPassword}
                      onChange={handlePasswordChange}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setMostrarPassword((prev) => !prev)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition hover:text-sky-900 dark:text-sky-300"
                  >
                    {mostrarPassword ? (
                      <>
                        <EyeOff className="h-4 w-4" />
                        Ocultar contraseñas
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Mostrar contraseñas
                      </>
                    )}
                  </button>

                  <Button
                    type="submit"
                    disabled={savingPassword}
                    className="w-full"
                  >
                    {savingPassword
                      ? 'Actualizando contraseña...'
                      : 'Cambiar contraseña'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        )}
      </section>
    </AppLayout>
  );
}