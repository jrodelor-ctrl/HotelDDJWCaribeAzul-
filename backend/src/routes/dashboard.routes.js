import { Router } from 'express';

import { obtenerDashboard } from '../controllers/dashboard.controller.js';
import { protegerRuta } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protegerRuta);

router.get('/resumen', obtenerDashboard);

export default router;