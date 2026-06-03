import { Router } from 'express';

import {
  listarProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/productos.controller.js';

import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';
import { validateObjectId } from '../middlewares/validateObjectId.middleware.js';

const router = Router();

router.use(protegerRuta);

router.get('/', listarProductos);
router.get('/:id', validateObjectId('id'), obtenerProductoPorId);

router.post(
  '/',
  autorizarRoles('admin', 'gerente', 'inventario'),
  crearProducto
);

router.put(
  '/:id',
  validateObjectId('id'),
  autorizarRoles('admin', 'gerente', 'inventario'),
  actualizarProducto
);

router.delete(
  '/:id',
  validateObjectId('id'),
  autorizarRoles('admin', 'gerente'),
  eliminarProducto
);

export default router;