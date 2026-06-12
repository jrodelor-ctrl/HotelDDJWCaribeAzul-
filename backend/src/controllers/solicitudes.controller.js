import { Producto } from '../models/Producto.model.js';
import { SolicitudCompra } from '../models/SolicitudCompra.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';

const PRODUCTO_POPULATE_FIELDS =
  'nombre stock stockMinimo unidadMedida proveedor disponible fechaDesactivacion';

const USUARIO_POPULATE_FIELDS = 'nombre correo email rol';

const obtenerDatosUsuarioSesion = (req) => {
  const usuarioSesion = req.usuario || req.user;

  if (!usuarioSesion) {
    throw new ApiError('No autorizado. Usuario no identificado.', 401);
  }

  return {
    id: usuarioSesion._id || usuarioSesion.id,
    nombre:
      usuarioSesion.nombre ||
      usuarioSesion.correo ||
      usuarioSesion.email ||
      'Usuario no registrado',
    rol: usuarioSesion.rol || ''
  };
};

const validarProductoDisponible = async (productoId) => {
  const producto = await Producto.findById(productoId);

  if (!producto) {
    throw new ApiError('Producto no encontrado.', 404);
  }

  if (!producto.disponible) {
    throw new ApiError(
      'No se pueden crear solicitudes sobre un producto desactivado.',
      400
    );
  }

  return producto;
};

export const listarSolicitudes = asyncHandler(async (req, res) => {
  const {
    estado,
    prioridad,
    producto,
    usuario,
    fechaInicio,
    fechaFin
  } = req.query;

  const filtros = {};

  if (estado) {
    filtros.estado = estado;
  }

  if (prioridad) {
    filtros.prioridad = prioridad;
  }

  if (producto) {
    filtros.producto = producto;
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

  const solicitudes = await SolicitudCompra.find(filtros)
    .populate('producto', PRODUCTO_POPULATE_FIELDS)
    .populate('usuario', USUARIO_POPULATE_FIELDS)
    .sort({ createdAt: -1 });

  return successResponse({
    res,
    message: 'Solicitudes de compra obtenidas correctamente.',
    data: { solicitudes }
  });
});

export const obtenerSolicitudPorId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const solicitud = await SolicitudCompra.findById(id)
    .populate('producto', PRODUCTO_POPULATE_FIELDS)
    .populate('usuario', USUARIO_POPULATE_FIELDS);

  if (!solicitud) {
    throw new ApiError('Solicitud de compra no encontrada.', 404);
  }

  return successResponse({
    res,
    message: 'Solicitud de compra obtenida correctamente.',
    data: { solicitud }
  });
});

export const crearSolicitud = asyncHandler(async (req, res) => {
  const { producto: productoId, cantidadSugerida, prioridad, motivo } = req.body;

  const usuarioSesion = obtenerDatosUsuarioSesion(req);

  if (!productoId) {
    throw new ApiError('El producto es obligatorio.', 400);
  }

  if (cantidadSugerida && Number(cantidadSugerida) <= 0) {
    throw new ApiError('La cantidad sugerida debe ser mayor a cero.', 400);
  }

  const producto = await validarProductoDisponible(productoId);

  const solicitudPendiente = await SolicitudCompra.findOne({
    producto: productoId,
    estado: 'pendiente'
  });

  if (solicitudPendiente) {
    throw new ApiError(
      'Ya existe una solicitud pendiente para este producto.',
      409
    );
  }

  const cantidadCalculada =
    Number(cantidadSugerida) ||
    Math.max(producto.stockMinimo * 2 - producto.stock, 1);

  let prioridadCalculada = prioridad || 'media';

  if (!['baja', 'media', 'alta'].includes(prioridadCalculada)) {
    throw new ApiError('La prioridad debe ser baja, media o alta.', 400);
  }

  if (producto.stock === 0) {
    prioridadCalculada = 'alta';
  } else if (producto.stock <= producto.stockMinimo) {
    prioridadCalculada = 'alta';
  }

  const solicitud = await SolicitudCompra.create({
    producto: producto._id,
    cantidadSugerida: cantidadCalculada,
    prioridad: prioridadCalculada,
    motivo: motivo || 'Producto con stock bajo o necesidad de reposición',
    usuario: usuarioSesion.id,
    nombreUsuario: usuarioSesion.nombre,
    rolUsuario: usuarioSesion.rol
  });

  const solicitudPopulada = await SolicitudCompra.findById(solicitud._id)
    .populate('producto', PRODUCTO_POPULATE_FIELDS)
    .populate('usuario', USUARIO_POPULATE_FIELDS);

  return successResponse({
    res,
    statusCode: 201,
    message: 'Solicitud de compra creada correctamente.',
    data: { solicitud: solicitudPopulada }
  });
});

export const generarSolicitudAutomatica = asyncHandler(async (req, res) => {
  const { productoId } = req.params;

  const usuarioSesion = obtenerDatosUsuarioSesion(req);

  const producto = await validarProductoDisponible(productoId);

  if (producto.stock > producto.stockMinimo) {
    throw new ApiError(
      'Este producto aún no requiere solicitud automática de compra.',
      400
    );
  }

  const solicitudPendiente = await SolicitudCompra.findOne({
    producto: productoId,
    estado: 'pendiente'
  });

  if (solicitudPendiente) {
    throw new ApiError(
      'Ya existe una solicitud pendiente para este producto.',
      409
    );
  }

  const cantidadSugerida = Math.max(producto.stockMinimo * 2 - producto.stock, 1);

  const prioridad = producto.stock === 0 ? 'alta' : 'media';

  const solicitud = await SolicitudCompra.create({
    producto: producto._id,
    cantidadSugerida,
    prioridad,
    motivo: `Solicitud automática: stock actual (${producto.stock}) menor o igual al stock mínimo (${producto.stockMinimo}).`,
    usuario: usuarioSesion.id,
    nombreUsuario: usuarioSesion.nombre,
    rolUsuario: usuarioSesion.rol
  });

  const solicitudPopulada = await SolicitudCompra.findById(solicitud._id)
    .populate('producto', PRODUCTO_POPULATE_FIELDS)
    .populate('usuario', USUARIO_POPULATE_FIELDS);

  return successResponse({
    res,
    statusCode: 201,
    message: 'Solicitud automática generada correctamente.',
    data: { solicitud: solicitudPopulada }
  });
});

export const actualizarEstadoSolicitud = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado) {
    throw new ApiError('El estado es obligatorio.', 400);
  }

  if (!['pendiente', 'aprobada', 'rechazada'].includes(estado)) {
    throw new ApiError(
      'El estado debe ser pendiente, aprobada o rechazada.',
      400
    );
  }

  const solicitud = await SolicitudCompra.findByIdAndUpdate(
    id,
    { estado },
    {
      new: true,
      runValidators: true
    }
  )
    .populate('producto', PRODUCTO_POPULATE_FIELDS)
    .populate('usuario', USUARIO_POPULATE_FIELDS);

  if (!solicitud) {
    throw new ApiError('Solicitud de compra no encontrada.', 404);
  }

  return successResponse({
    res,
    message: 'Estado de solicitud actualizado correctamente.',
    data: { solicitud }
  });
});