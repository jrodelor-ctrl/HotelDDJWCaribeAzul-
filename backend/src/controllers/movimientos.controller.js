import { Producto } from '../models/Producto.model.js';
import { Movimiento } from '../models/Movimiento.model.js';
import { Area } from '../models/Area.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';

export const listarMovimientos = asyncHandler(async (req, res) => {
  const { producto, tipo, area, fechaInicio, fechaFin } = req.query;

  const filtros = {};

  if (producto) {
    filtros.producto = producto;
  }

  if (tipo) {
    filtros.tipo = tipo;
  }

  if (area) {
    filtros.area = area;
  }

  if (fechaInicio || fechaFin) {
    filtros.createdAt = {};

    if (fechaInicio) {
      filtros.createdAt.$gte = new Date(fechaInicio);
    }

    if (fechaFin) {
      filtros.createdAt.$lte = new Date(fechaFin);
    }
  }

  const movimientos = await Movimiento.find(filtros)
    .populate('producto', 'nombre stock stockMinimo unidadMedida proveedor')
    .populate('area', 'nombre')
    .populate('usuario', 'nombre correo rol')
    .sort({ createdAt: -1 });

  return successResponse({
    res,
    message: 'Movimientos obtenidos correctamente.',
    data: { movimientos }
  });
});

export const obtenerMovimientoPorId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const movimiento = await Movimiento.findById(id)
    .populate('producto', 'nombre stock stockMinimo unidadMedida proveedor')
    .populate('area', 'nombre')
    .populate('usuario', 'nombre correo rol');

  if (!movimiento) {
    throw new ApiError('Movimiento no encontrado.', 404);
  }

  return successResponse({
    res,
    message: 'Movimiento obtenido correctamente.',
    data: { movimiento }
  });
});

export const registrarMovimiento = asyncHandler(async (req, res) => {
  const { producto: productoId, tipo, cantidad, area, observacion } = req.body;

  if (!productoId || !tipo || !cantidad) {
    throw new ApiError(
      'Producto, tipo y cantidad son campos obligatorios.',
      400
    );
  }

  if (!['entrada', 'salida'].includes(tipo)) {
    throw new ApiError('El tipo de movimiento debe ser entrada o salida.', 400);
  }

  if (Number(cantidad) <= 0) {
    throw new ApiError('La cantidad debe ser mayor a cero.', 400);
  }

  const producto = await Producto.findById(productoId);

  if (!producto) {
    throw new ApiError('Producto no encontrado.', 404);
  }

  if (!producto.disponible) {
    throw new ApiError('El producto no está disponible para movimientos.', 400);
  }

  if (tipo === 'salida' && !area) {
    throw new ApiError('El área es obligatoria para registrar una salida.', 400);
  }

  if (tipo === 'salida') {
    const areaExiste = await Area.findById(area);

    if (!areaExiste || !areaExiste.activa) {
      throw new ApiError('El área seleccionada no existe o está inactiva.', 404);
    }
  }

  const stockAnterior = producto.stock;
  let stockNuevo;

  if (tipo === 'entrada') {
    stockNuevo = stockAnterior + Number(cantidad);
  }

  if (tipo === 'salida') {
    if (Number(cantidad) > stockAnterior) {
      throw new ApiError(
        `Stock insuficiente. Stock actual: ${stockAnterior}. Cantidad solicitada: ${cantidad}.`,
        400
      );
    }

    stockNuevo = stockAnterior - Number(cantidad);
  }

  producto.stock = stockNuevo;
  await producto.save();

  const movimiento = await Movimiento.create({
    producto: producto._id,
    tipo,
    cantidad,
    area: tipo === 'salida' ? area : undefined,
    usuario: req.usuario._id,
    observacion,
    stockAnterior,
    stockNuevo
  });

  const movimientoPopulado = await Movimiento.findById(movimiento._id)
    .populate('producto', 'nombre stock stockMinimo unidadMedida proveedor')
    .populate('area', 'nombre')
    .populate('usuario', 'nombre correo rol');

  return successResponse({
    res,
    statusCode: 201,
    message: 'Movimiento registrado correctamente.',
    data: { movimiento: movimientoPopulado }
  });
});