import { Router } from 'express';

import { obtenerRiesgoInventario } from '../controllers/analitica.controller.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protegerRuta);

router.get(
  '/riesgo-inventario',
  autorizarRoles('admin', 'gerente', 'inventario'),
  obtenerRiesgoInventario
);

export default router;