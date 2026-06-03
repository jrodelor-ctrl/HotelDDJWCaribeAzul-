import { Router } from 'express';

import {
  listarSolicitudes,
  obtenerSolicitudPorId,
  crearSolicitud,
  generarSolicitudAutomatica,
  actualizarEstadoSolicitud
} from '../controllers/solicitudes.controller.js';

import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';
import { validateObjectId } from '../middlewares/validateObjectId.middleware.js';

const router = Router();

router.use(protegerRuta);

router.get('/', listarSolicitudes);

router.get('/:id', validateObjectId('id'), obtenerSolicitudPorId);

router.post(
  '/',
  autorizarRoles('admin', 'gerente', 'inventario'),
  crearSolicitud
);

router.post(
  '/automatica/:productoId',
  validateObjectId('productoId'),
  autorizarRoles('admin', 'gerente', 'inventario'),
  generarSolicitudAutomatica
);

router.patch(
  '/:id/estado',
  validateObjectId('id'),
  autorizarRoles('admin', 'gerente'),
  actualizarEstadoSolicitud
);

export default router;