import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';
import { obtenerResumenDashboard } from '../services/dashboard.service.js';

export const obtenerDashboard = asyncHandler(async (req, res) => {
  const resumen = await obtenerResumenDashboard();

  return successResponse({
    res,
    message: 'Resumen del dashboard obtenido correctamente.',
    data: resumen
  });
});