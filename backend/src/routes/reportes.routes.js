import { Router } from 'express';

import {
  reporteInventario,
  reporteMovimientos,
  exportarInventarioCsv
} from '../controllers/reportes.controller.js';

import { protegerRuta } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protegerRuta);

router.get('/inventario', reporteInventario);
router.get('/inventario/csv', exportarInventarioCsv);
router.get('/movimientos', reporteMovimientos);

export default router;