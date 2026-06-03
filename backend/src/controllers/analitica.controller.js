import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';
import { obtenerAnaliticaRiesgo } from '../services/analitica.service.js';

export const obtenerRiesgoInventario = asyncHandler(async (req, res) => {
  const { dias } = req.query;

  const analitica = await obtenerAnaliticaRiesgo({
    dias
  });

  return successResponse({
    res,
    message: 'Analítica de riesgo de inventario generada correctamente.',
    data: analitica
  });
});