import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';

import {
  obtenerReporteInventario,
  obtenerReporteMovimientos,
  convertirInventarioACsv
} from '../services/reporte.service.js';

export const reporteInventario = asyncHandler(async (req, res) => {
  const { categoria, estadoStock } = req.query;

  const reporte = await obtenerReporteInventario({
    categoria,
    estadoStock
  });

  return successResponse({
    res,
    message: 'Reporte de inventario generado correctamente.',
    data: reporte
  });
});

export const reporteMovimientos = asyncHandler(async (req, res) => {
  const { producto, tipo, area, fechaInicio, fechaFin } = req.query;

  const reporte = await obtenerReporteMovimientos({
    producto,
    tipo,
    area,
    fechaInicio,
    fechaFin
  });

  return successResponse({
    res,
    message: 'Reporte de movimientos generado correctamente.',
    data: reporte
  });
});

export const exportarInventarioCsv = asyncHandler(async (req, res) => {
  const { categoria, estadoStock } = req.query;

  const reporte = await obtenerReporteInventario({
    categoria,
    estadoStock
  });

  const csv = convertirInventarioACsv(reporte.productos);

  res.header('Content-Type', 'text/csv; charset=utf-8');
  res.attachment('reporte-inventario-hotel-ddjw.csv');

  return res.send(csv);
});