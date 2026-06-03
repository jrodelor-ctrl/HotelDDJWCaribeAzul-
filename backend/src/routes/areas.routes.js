import { Router } from 'express';

import {
  listarAreas,
  crearArea,
  actualizarArea,
  eliminarArea
} from '../controllers/areas.controller.js';

import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';
import { validateObjectId } from '../middlewares/validateObjectId.middleware.js';

const router = Router();

router.use(protegerRuta);

router.get('/', listarAreas);
router.post('/', autorizarRoles('admin', 'gerente'), crearArea);
router.put('/:id', validateObjectId('id'), autorizarRoles('admin', 'gerente'), actualizarArea);
router.delete('/:id', validateObjectId('id'), autorizarRoles('admin'), eliminarArea);

export default router;