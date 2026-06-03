# Sistema de Gestión de Inventarios Hotel DDJW Caribe Azul S.A.S.

## Nombre corto

**Inventario DDJW**

---

## Descripción

El **Sistema de Gestión de Inventarios Hotel DDJW Caribe Azul S.A.S.** es una aplicación web full-stack desarrollada para apoyar el control interno de inventario del hotel. El sistema permite gestionar productos, categorías, áreas, movimientos de entrada y salida, solicitudes internas, reportes, analítica y usuarios autenticados mediante JWT.

El objetivo principal del proyecto es centralizar la información del inventario, mejorar el seguimiento de existencias, identificar productos con stock bajo o agotado y facilitar la toma de decisiones administrativas dentro del Hotel DDJW Caribe Azul S.A.S.

Este sistema fue desarrollado como proyecto final académico de desarrollo web/full-stack.

---

## Tecnologías utilizadas

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token, JWT
* Helmet
* Express Rate Limit
* Express Mongo Sanitize
* HPP
* CORS
* Dotenv

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* React
* Componentes reutilizables
* Consumo de API REST

### Base de datos

* MongoDB Atlas

### Herramientas de apoyo

* Git
* GitHub
* Postman
* Visual Studio Code
* Render para backend
* Vercel sugerido para frontend

---

## Estructura general del proyecto

```txt
hotel-ddjw-caribe-azul/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── public/
│   ├── package.json
│   └── .env.local
│
├── docs/
├── package.json
├── README.md
└── .gitignore
```

---

## Módulos principales

El sistema incluye los siguientes módulos:

* Landing institucional
* Inicio de sesión
* Dashboard
* Gestión de productos
* Crear producto
* Editar producto
* Desactivar producto
* Gestión de categorías
* Gestión de áreas
* Movimientos de inventario
* Reportes de inventario
* Exportación CSV compatible con Excel
* Solicitudes internas
* Analítica
* Ayuda
* Rutas protegidas mediante JWT

---

## Funcionalidades principales

### Autenticación

* Inicio de sesión con correo y contraseña.
* Generación de token JWT.
* Protección de rutas privadas.
* Consulta de perfil del usuario autenticado.
* Control de acceso a módulos internos.

### Productos

* Listado de productos disponibles.
* Creación de productos.
* Edición de productos.
* Desactivación lógica de productos.
* Validación de stock actual y stock mínimo.
* Asociación de productos con categorías y áreas.
* Visualización de estado de stock: normal, stock bajo o agotado.

### Movimientos

* Registro de entradas de inventario.
* Registro de salidas de inventario.
* Historial de movimientos.
* Actualización del stock según el tipo de movimiento.

### Reportes

* Reporte general del inventario.
* Resumen de productos registrados.
* Total de productos agotados.
* Total de productos con stock bajo.
* Valor total del inventario.
* Exportación CSV optimizada para abrirse correctamente en Excel.

### Solicitudes

* Registro de solicitudes internas.
* Seguimiento de solicitudes por área.
* Control de productos requeridos.
* Apoyo a la gestión operativa del hotel.

### Analítica

* Visualización de indicadores del inventario.
* Apoyo para la toma de decisiones administrativas.
* Análisis del comportamiento general del inventario.

### Ayuda

* Página de ayuda con preguntas frecuentes.
* Accordion informativo.
* Formulario rápido con almacenamiento local mediante `localStorage`.

---

## Identidad visual

El diseño del sistema se basa en la identidad institucional del Hotel DDJW Caribe Azul S.A.S.

Características visuales principales:

* Colores predominantes azul, cyan, sky y slate.
* Fondo oscuro institucional en login y modo oscuro.
* Uso del logo del hotel como elemento visual.
* Interfaz interna orientada a un sistema administrativo.
* Landing institucional enfocada en inventario interno.
* Eliminación de textos comerciales tipo SaaS, planes, precios, reservas o facturación hotelera.

---

## Seguridad implementada

El backend incluye medidas preventivas de seguridad:

* Helmet para cabeceras HTTP seguras.
* Express Rate Limit para limitar solicitudes excesivas.
* Express Mongo Sanitize para reducir riesgos de inyección NoSQL.
* HPP para prevenir HTTP Parameter Pollution.
* Validación preventiva de patrones peligrosos relacionados con inyección de comandos.
* Límite de tamaño en solicitudes JSON.
* CORS configurado mediante variable de entorno.
* Rutas protegidas con JWT.

Durante la revisión de seguridad se concluyó que el riesgo de **OS Command Injection** no aplica directamente al código propio del sistema, ya que el backend no utiliza `child_process`, `exec`, `spawn` ni ejecución de comandos del sistema. Aun así, se añadieron controles preventivos como parte del endurecimiento básico de seguridad.

---

## Requisitos previos

Antes de ejecutar el proyecto, se debe tener instalado:

* Node.js
* npm
* Git
* Navegador web
* Cuenta o cluster en MongoDB Atlas
* Postman, opcional para pruebas de API

---

## Instalación del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/jrodelor-ctrl/HotelDDJWCaribeAzul-.git
```

Entrar a la carpeta del proyecto:

```bash
cd HotelDDJWCaribeAzul-
```

---

## Configuración del backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` dentro de la carpeta `backend` con las variables necesarias:

```env
PORT=4000
MONGODB_URI=TU_CADENA_DE_CONEXION_MONGODB_ATLAS
JWT_SECRET=TU_SECRETO_JWT
CLIENT_URL=http://localhost:3000
```

Ejecutar el backend en modo desarrollo:

```bash
npm run dev
```

URL local del backend:

```txt
http://localhost:4000
```

URL base local de la API:

```txt
http://localhost:4000/api
```

Ruta de verificación local:

```txt
http://localhost:4000/api/health
```

---

## Configuración del frontend

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env.local` dentro de la carpeta `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Ejecutar el frontend en modo desarrollo:

```bash
npm run dev
```

URL local del frontend:

```txt
http://localhost:3000
```

---

## Credenciales de prueba

```txt
Correo: admin@hotelddjw.com
Contraseña: 123456
```

Estas credenciales son utilizadas únicamente para pruebas académicas y demostración del sistema.

---

## Rutas principales del frontend

```txt
/                         Landing institucional
/login                    Inicio de sesión
/dashboard                Panel principal
/productos                Listado de productos
/productos/nuevo          Crear producto
/productos/editar/[id]    Editar producto
/movimientos              Movimientos de inventario
/reportes                 Reportes de inventario
/solicitudes              Solicitudes internas
/analitica                Analítica
/ayuda                    Ayuda
```

---

## Endpoints principales de la API

### Autenticación

```http
POST /api/auth/login
GET  /api/auth/perfil
```

### Productos

```http
GET    /api/productos
GET    /api/productos?disponible=true
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id
```

### Categorías

```http
GET  /api/categorias
POST /api/categorias
```

### Áreas

```http
GET  /api/areas
POST /api/areas
```

### Movimientos

```http
GET  /api/movimientos
POST /api/movimientos
```

### Reportes

```http
GET /api/reportes/inventario
GET /api/reportes/inventario/csv
```

### Solicitudes

```http
GET  /api/solicitudes
POST /api/solicitudes
```

### Analítica

```http
GET /api/analitica
```

---

## Pruebas recomendadas

Antes del despliegue se recomienda validar:

* Inicio de sesión correcto.
* Inicio de sesión con credenciales incorrectas.
* Acceso a rutas protegidas sin token.
* Acceso a rutas protegidas con token válido.
* Carga del dashboard.
* Creación de producto.
* Edición de producto.
* Desactivación lógica de producto.
* Registro de movimiento de entrada.
* Registro de movimiento de salida.
* Visualización de reportes.
* Exportación CSV.
* Creación de solicitud.
* Visualización de analítica.
* Funcionamiento de la página de ayuda.
* Conexión correcta con MongoDB Atlas.
* Pruebas de endpoints en Postman.
* Compilación del frontend con `npm run build`.

---

## Comandos útiles

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Compilar frontend para producción

```bash
cd frontend
npm run build
```

---

## Despliegue

Para el despliegue del sistema se utiliza la siguiente distribución:

| Componente    | Plataforma    |
| ------------- | ------------- |
| Frontend      | Vercel        |
| Backend       | Render        |
| Base de datos | MongoDB Atlas |

---

## URLs del proyecto

```txt
Repositorio GitHub: https://github.com/jrodelor-ctrl/HotelDDJWCaribeAzul-
Backend desplegado: https://inventario-ddjw-backend.onrender.com
API desplegada: https://inventario-ddjw-backend.onrender.com/api
Health Check: https://inventario-ddjw-backend.onrender.com/api/health
Frontend desplegado: Pendiente
Base de datos: MongoDB Atlas
```

---

## Variables de entorno para producción

### Backend en Render

```env
PORT=4000
MONGODB_URI=CADENA_DE_CONEXION_DE_MONGODB_ATLAS
JWT_SECRET=SECRETO_JWT_PRODUCCION
CLIENT_URL=URL_DEL_FRONTEND_EN_VERCEL
```

Mientras el frontend no esté desplegado, `CLIENT_URL` puede mantenerse temporalmente como:

```env
CLIENT_URL=http://localhost:3000
```

Después de desplegar el frontend en Vercel, debe actualizarse por la URL real del frontend.

### Frontend en Vercel

```env
NEXT_PUBLIC_API_URL=https://inventario-ddjw-backend.onrender.com/api
```

---

## Consideraciones para despliegue

Antes y después de desplegar se debe verificar:

1. Que el backend funcione localmente.
2. Que el frontend funcione localmente.
3. Que el frontend compile correctamente con `npm run build`.
4. Que los archivos `.env` y `.env.local` no estén subidos al repositorio.
5. Que MongoDB Atlas permita conexiones desde los servicios desplegados.
6. Que CORS esté configurado con la URL del frontend.
7. Que `NEXT_PUBLIC_API_URL` apunte al backend desplegado.
8. Que el login y las rutas protegidas funcionen en producción.
9. Que la ruta `/api/health` responda correctamente en Render.

---

## Repositorio GitHub

El proyecto se encuentra publicado en GitHub como parte del proceso de entrega y despliegue.

Antes de cada actualización del repositorio se debe verificar:

* Que no se incluyan archivos `.env`.
* Que no se suban carpetas `node_modules`.
* Que no se suban carpetas `.next`, `build`, `dist` o `.vercel`.
* Que el archivo `.gitignore` esté correctamente configurado.
* Que el proyecto compile correctamente.
* Que el README esté actualizado.

Comandos sugeridos para guardar cambios:

```bash
git status
git add .
git commit -m "Descripcion del cambio realizado"
git push
```

---

## Documentación de API

La API REST debe documentarse en Postman mediante una colección llamada:

```txt
Inventario DDJW - API REST
```

La colección debe incluir:

* Login.
* Perfil autenticado.
* Productos.
* Categorías.
* Áreas.
* Movimientos.
* Reportes.
* Solicitudes.
* Analítica.

Se recomienda usar una variable de entorno en Postman para pruebas locales:

```txt
base_url=http://localhost:4000/api
```

Para pruebas en producción:

```txt
base_url=https://inventario-ddjw-backend.onrender.com/api
```

---

## Evidencias sugeridas para el informe

Para el informe final se recomienda incluir capturas de:

* Landing institucional.
* Login.
* Dashboard.
* Productos.
* Crear producto.
* Editar producto.
* Movimientos.
* Reportes.
* Exportación CSV.
* Solicitudes.
* Analítica.
* Ayuda.
* Pruebas en Postman.
* MongoDB Atlas.
* Backend desplegado en Render.
* Sistema desplegado.
* Repositorio en GitHub.

---

## Estado del proyecto

El sistema se encuentra en etapa final de cierre, pruebas, publicación en GitHub y despliegue.

Estado general:

* Backend funcional.
* Backend desplegado en Render.
* Frontend funcional en entorno local.
* Base de datos conectada en MongoDB Atlas.
* Autenticación JWT implementada.
* Módulos principales desarrollados.
* Seguridad preventiva aplicada.
* Exportación de reportes implementada.
* Pendiente o en proceso: despliegue del frontend en Vercel, documentación Postman, pruebas finales y evidencias del informe.

---

## Autores

**CIPAS DDJW**

Integrantes:

* DANIS DANIEL BARRERO RODRIGUEZ
* DANIELA RAMOS ESCUDERO
* JAIME ALBERTO RODELO RAMIREZ
* WANDA CAROLINA CASTILLO PEREZ

---

## Institución

IV semestre Ingeniería de Software
Centro Tutorial El Carmen
Universidad de Cartagena

---

## Licencia

Este proyecto fue desarrollado con fines académicos.
