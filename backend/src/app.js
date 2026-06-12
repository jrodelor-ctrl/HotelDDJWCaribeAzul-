import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { env } from './config/env.js';

import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import areasRoutes from './routes/areas.routes.js';
import movimientosRoutes from './routes/movimientos.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import reportesRoutes from './routes/reportes.routes.js';
import solicitudesRoutes from './routes/solicitudes.routes.js';
import analiticaRoutes from './routes/analitica.routes.js';

import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { registrarAuditoria } from './middlewares/auditoria.middleware.js';
import auditoriaRoutes from './routes/auditoria.routes.js';

import {
  generalLimiter,
  mongoSanitizer,
  parameterPollutionProtection,
  securityHeaders,
  validateNoShellInjection
} from './middlewares/security.middleware.js';

const app = express();

app.use(securityHeaders);

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(registrarAuditoria);

app.use(mongoSanitizer);
app.use(parameterPollutionProtection);
app.use(generalLimiter);
app.use(validateNoShellInjection);

if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API Inventario DDJW funcionando correctamente',
    version: '1.0.0',
    security: {
      headers: true,
      rateLimit: true,
      inputValidation: true,
      mongoSanitize: true
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'API Inventario DDJW funcionando correctamente',
    status: 'healthy',
    version: '1.0.0'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/areas', areasRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/solicitudes', solicitudesRoutes);
app.use('/api/analitica', analiticaRoutes);
app.use('/api/auditoria', auditoriaRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;