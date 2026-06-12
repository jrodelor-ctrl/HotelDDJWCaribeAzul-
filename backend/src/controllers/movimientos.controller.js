import { Producto } from '../models/Producto.model.js';
import { Movimiento } from '../models/Movimiento.model.js';
import { Area } from '../models/Area.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';

const PRODUCTO_POPULATE_FIELDS =
  'nombre stock stockMinimo unidadMedida proveedor disponible fechaDesactivacion';

const USUARIO_POPULATE_FIELDS = 'nombre correo email rol';

export const listarMovimientos = asyncHandler(async (req, res) => {
  const { producto, tipo, area, usuario, fechaInicio, fechaFin } = req.query;

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

  if (usuario) {
    filtros.usuario = usuario;
  }

  if (fechaInicio || fechaFin) {
    filtros.createdAt = {};

    if (fechaInicio) {
      filtros.createdAt.$gte = new Date(`${fechaInicio}T00:00:00.000Z`);
    }

    if (fechaFin) {
      filtros.createdAt.$lte = new Date(`${fechaFin}T23:59:59.999Z`);
    }
  }

  const movimientos = await Movimiento.find(filtros)
    .populate('producto', PRODUCTO_POPULATE_FIELDS)
    .populate('area', 'nombre')
    .populate('usuario', USUARIO_POPULATE_FIELDS)
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
    .populate('producto', PRODUCTO_POPULATE_FIELDS)
    .populate('area', 'nombre')
    .populate('usuario', USUARIO_POPULATE_FIELDS);

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

  const usuarioSesion = req.usuario || req.user;

  if (!usuarioSesion) {
    throw new ApiError('No autorizado. Usuario no identificado.', 401);
  }

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
    throw new ApiError(
      'No se pueden registrar movimientos sobre un producto desactivado.',
      400
    );
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
    cantidad: Number(cantidad),
    area: tipo === 'salida' ? area : undefined,

    usuario: usuarioSesion._id || usuarioSesion.id,

    nombreUsuario:
      usuarioSesion.nombre ||
      usuarioSesion.correo ||
      usuarioSesion.email ||
      'Usuario no registrado',

    rolUsuario: usuarioSesion.rol || '',

    observacion,
    stockAnterior,
    stockNuevo
  });

  const movimientoPopulado = await Movimiento.findById(movimiento._id)
    .populate('producto', PRODUCTO_POPULATE_FIELDS)
    .populate('area', 'nombre')
    .populate('usuario', USUARIO_POPULATE_FIELDS);

  return successResponse({
    res,
    statusCode: 201,
    message: 'Movimiento registrado correctamente.',
    data: { movimiento: movimientoPopulado }
  });
});