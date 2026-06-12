import { Auditoria } from '../models/Auditoria.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';

export const listarAuditorias = asyncHandler(async (req, res) => {
  if (req.usuario?.rol !== 'admin') {
    throw new ApiError('No tienes permisos para consultar la auditoría.', 403);
  }

  const {
    page = 1,
    limit = 20,
    modulo,
    metodo,
    usuario
  } = req.query;

  const paginaActual = Math.max(Number(page) || 1, 1);
  const limitePorPagina = Math.min(Math.max(Number(limit) || 20, 1), 100);
  const skip = (paginaActual - 1) * limitePorPagina;

  const filtros = {};

  if (modulo) filtros.modulo = modulo;
  if (metodo) filtros.metodo = metodo;
  if (usuario) filtros.usuario = usuario;

  const [auditorias, totalAuditorias] = await Promise.all([
    Auditoria.find(filtros)
      .populate('usuario', 'nombre correo rol')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitePorPagina),

    Auditoria.countDocuments(filtros)
  ]);

  const totalPaginas = Math.ceil(totalAuditorias / limitePorPagina);

  return successResponse({
    res,
    message: 'Registros de auditoría obtenidos correctamente.',
    data: {
      auditorias,
      pagination: {
        totalAuditorias,
        totalPaginas,
        paginaActual,
        limitePorPagina,
        tienePaginaAnterior: paginaActual > 1,
        tienePaginaSiguiente: paginaActual < totalPaginas
      }
    }
  });
});