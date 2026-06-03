import { Router } from 'express';

import { login, obtenerPerfil } from '../controllers/auth.controller.js';
import { protegerRuta } from '../middlewares/auth.middleware.js';
import { authLimiter } from '../middlewares/security.middleware.js';

const router = Router();

router.post('/login', authLimiter, login);
router.get('/perfil', protegerRuta, obtenerPerfil);

export default router;