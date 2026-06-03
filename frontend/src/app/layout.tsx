import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de Inventarios Hotel DDJW Caribe Azul S.A.S.",
  description:
    "Sistema web interno para la gestión de inventarios, entradas, salidas, reportes y solicitudes de compra del Hotel DDJW Caribe Azul S.A.S.",
  keywords: [
    "inventario hotelero",
    "gestión de inventarios",
    "Hotel DDJW Caribe Azul",
    "sistema web de inventario",
    "MongoDB",
    "React",
    "Node.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}