import { Router } from 'express';

import { listarAuditorias } from '../controllers/auditoria.controller.js';
import { protegerRuta } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', protegerRuta, listarAuditorias);

export default router;