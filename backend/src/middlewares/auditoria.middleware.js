import { Auditoria } from '../models/Auditoria.model.js';

const obtenerModuloDesdeRuta = (ruta = '') => {
  if (ruta.includes('/productos')) return 'Productos';
  if (ruta.includes('/movimientos')) return 'Movimientos';
  if (ruta.includes('/solicitudes')) return 'Solicitudes';
  if (ruta.includes('/reportes')) return 'Reportes';
  if (ruta.includes('/analitica')) return 'Analítica';
  if (ruta.includes('/auth')) return 'Autenticación';
  if (ruta.includes('/categorias')) return 'Categorías';
  if (ruta.includes('/areas')) return 'Áreas';

  return 'General';
};

const obtenerAccion = (metodo, ruta = '') => {
  if (ruta.includes('/auth/login')) return 'Inicio de sesión';
  if (ruta.includes('/auth/logout')) return 'Cierre de sesión';
  if (ruta.includes('/auth/refresh')) return 'Renovación de token';

  if (metodo === 'POST') return 'Creación de registro';
  if (metodo === 'PUT' || metodo === 'PATCH') return 'Actualización de registro';
  if (metodo === 'DELETE') return 'Desactivación o eliminación de registro';
  if (metodo === 'GET') return 'Consulta de información';

  return 'Acción no clasificada';
};

const limpiarDatosSensibles = (body = {}) => {
  const copia = { ...body };

  delete copia.password;
  delete copia.passwordActual;
  delete copia.passwordNueva;
  delete copia.confirmarPassword;
  delete copia.token;
  delete copia.refreshToken;

  return copia;
};

const obtenerIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (forwardedFor) {
    return String(forwardedFor).split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || '';
};

export const registrarAuditoria = (req, res, next) => {
  const metodosAuditables = ['POST', 'PUT', 'PATCH', 'DELETE'];

  if (!metodosAuditables.includes(req.method)) {
    return next();
  }

  res.on('finish', async () => {
    try {
      const usuario = req.usuario || req.usuarioAuditoria || null;

      await Auditoria.create({
        usuario: usuario?._id || usuario?.id || null,
        nombreUsuario: usuario?.nombre || 'Usuario no identificado',
        rolUsuario: usuario?.rol || '',
        accion: obtenerAccion(req.method, req.originalUrl),
        metodo: req.method,
        ruta: req.originalUrl,
        modulo: obtenerModuloDesdeRuta(req.originalUrl),
        recursoId: req.params?.id || '',
        ip: obtenerIp(req),
        userAgent: req.headers['user-agent'] || '',
        estadoRespuesta: res.statusCode,
        detalle: {
          body: limpiarDatosSensibles(req.body),
          params: req.params,
          query: req.query
        }
      });
    } catch (error) {
      console.error('Error registrando auditoría:', error.message);
    }
  });

  next();
};