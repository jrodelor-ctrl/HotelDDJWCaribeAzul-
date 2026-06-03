import { Router } from 'express';

import {
  listarMovimientos,
  obtenerMovimientoPorId,
  registrarMovimiento
} from '../controllers/movimientos.controller.js';

import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';
import { validateObjectId } from '../middlewares/validateObjectId.middleware.js';

const router = Router();

router.use(protegerRuta);

router.get('/', listarMovimientos);

router.get('/:id', validateObjectId('id'), obtenerMovimientoPorId);

router.post(
  '/',
  autorizarRoles('admin', 'gerente', 'inventario'),
  registrarMovimiento
);

export default router;