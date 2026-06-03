'use client';

import { FormEvent, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/lib/validators';

const helpItems = [
  {
    title: '¿Cómo registrar un producto?',
    content:
      'Ingresa al módulo Productos, selecciona Nuevo producto y completa nombre, categoría, precio, stock inicial, stock mínimo, unidad de medida y proveedor. Al guardar, el producto queda almacenado en MongoDB Atlas y aparece en el listado general.'
  },
  {
    title: '¿Cómo actualizar el stock?',
    content:
      'El stock no se edita manualmente desde el formulario del producto. Para mantener trazabilidad, se actualiza mediante el módulo Movimientos. Una entrada aumenta el stock y una salida lo disminuye.'
  },
  {
    title: '¿Cómo registrar una salida de inventario?',
    content:
      'En el módulo Movimientos selecciona el producto, elige tipo Salida, ingresa la cantidad y selecciona el área del hotel que consumió el producto. El sistema valida que exista stock suficiente antes de registrar la operación.'
  },
  {
    title: '¿Qué sucede si no hay stock suficiente?',
    content:
      'El backend valida la cantidad disponible. Si la salida supera el stock actual, el sistema muestra un mensaje de error y evita que el inventario quede con cantidades negativas.'
  },
  {
    title: '¿Para qué sirven las solicitudes de compra?',
    content:
      'Permiten generar solicitudes internas de reposición cuando un producto está bajo de stock. Estas solicitudes pueden quedar pendientes, aprobarse o rechazarse según la decisión administrativa.'
  },
  {
    title: '¿Qué muestra la analítica de riesgo?',
    content:
      'La analítica calcula el consumo reciente de los productos y estima cuántos días podría durar el stock actual. Con esto se identifican productos con riesgo crítico, alto, medio o bajo.'
  },
  {
    title: '¿Cómo se exportan reportes?',
    content:
      'Desde el módulo Reportes puedes consultar el estado del inventario, filtrar por estado de stock y exportar un archivo CSV con la información principal de los productos.'
  },
  {
    title: '¿Qué roles maneja el sistema?',
    content:
      'El sistema maneja roles como administrador, gerente e inventario. Las rutas del backend están protegidas con JWT y algunas acciones se controlan según el rol del usuario.'
  }
];

type SoporteRequest = {
  correo: string;
  telefono: string;
  mensaje: string;
  fecha: string;
};

export default function AyudaPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [confirmacion, setConfirmacion] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setConfirmacion('');

    if (!isValidEmail(correo)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    if (!telefono.trim()) {
      setError('Ingresa un número de teléfono.');
      return;
    }

    if (mensaje.trim().length < 10) {
      setError('La pregunta o problema debe tener al menos 10 caracteres.');
      return;
    }

    const solicitud: SoporteRequest = {
      correo,
      telefono,
      mensaje,
      fecha: new Date().toISOString()
    };

    const solicitudesPrevias = localStorage.getItem('hotel_ddjw_soporte');
    const solicitudes: SoporteRequest[] = solicitudesPrevias
      ? JSON.parse(solicitudesPrevias)
      : [];

    solicitudes.push(solicitud);

    localStorage.setItem('hotel_ddjw_soporte', JSON.stringify(solicitudes));

    setCorreo('');
    setTelefono('');
    setMensaje('');
    setConfirmacion(
      'Tu solicitud fue registrada localmente. El equipo de soporte podrá revisarla en una futura integración.'
    );
  };

  return (
    <AppLayout>
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">
            Centro de ayuda
          </p>

          <h1 className="text-3xl font-bold">
            Guía de uso del sistema
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Consulta cómo usar los principales módulos del Sistema de Gestión de
            Inventarios del Hotel DDJW Caribe Azul S.A.S.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <Card>
            <h2 className="mb-4 text-xl font-bold">
              Preguntas frecuentes internas
            </h2>

            <div className="space-y-3">
              {helpItems.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <article
                    key={item.title}
                    className="rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </span>

                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-500 transition ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen ? (
                      <div className="border-t border-slate-200 px-4 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                        {item.content}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">
              Contacto rápido de soporte
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Registra una duda, pregunta o problema sobre el sistema.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <Input
                id="correo"
                label="Correo electrónico"
                type="email"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                required
                placeholder="usuario@hotel.com"
              />

              <Input
                id="telefono"
                label="Teléfono"
                type="tel"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                required
                placeholder="3001234567"
              />

              <div className="space-y-1">
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Duda, pregunta o problema
                </label>

                <textarea
                  id="mensaje"
                  value={mensaje}
                  onChange={(event) => setMensaje(event.target.value)}
                  required
                  rows={5}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-900"
                  placeholder="Describe brevemente lo que necesitas..."
                />
              </div>

              {error ? (
                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
                  {error}
                </p>
              ) : null}

              {confirmacion ? (
                <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {confirmacion}
                </p>
              ) : null}

              <Button type="submit" className="w-full">
                Enviar solicitud
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </AppLayout>
  );
}