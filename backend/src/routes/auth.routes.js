import { Router } from 'express';

import {
  login,
  obtenerPerfil,
  actualizarPerfil,
  cambiarPassword,
  renovarToken,
  logout
} from '../controllers/auth.controller.js';

import { protegerRuta } from '../middlewares/auth.middleware.js';
import { authLimiter } from '../middlewares/security.middleware.js';

const router = Router();

router.post('/login', authLimiter, login);

// Nuevas rutas para refresh token y cierre de sesión
router.post('/refresh', renovarToken);
router.post('/logout', logout);

router.get('/perfil', protegerRuta, obtenerPerfil);
router.put('/perfil', protegerRuta, actualizarPerfil);
router.put('/cambiar-password', protegerRuta, cambiarPassword);

export default router;