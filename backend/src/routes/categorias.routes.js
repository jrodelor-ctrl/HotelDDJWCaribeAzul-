import { Router } from 'express';

import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from '../controllers/categorias.controller.js';

import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';
import { validateObjectId } from '../middlewares/validateObjectId.middleware.js';

const router = Router();

router.use(protegerRuta);

router.get('/', listarCategorias);
router.post('/', autorizarRoles('admin', 'gerente'), crearCategoria);
router.put('/:id', validateObjectId('id'), autorizarRoles('admin', 'gerente'), actualizarCategoria);
router.delete('/:id', validateObjectId('id'), autorizarRoles('admin'), eliminarCategoria);

export default router;