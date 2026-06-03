import mongoose from 'mongoose';

import { Producto } from '../models/Producto.model.js';
import { Categoria } from '../models/Categoria.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const escapeRegex = (value = '') => {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const normalizeText = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  return String(value).trim();
};

const normalizeNumber = (value, fieldName) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    throw new ApiError(`El campo ${fieldName} debe ser un número válido.`, 400);
  }

  if (numberValue < 0) {
    throw new ApiError(`El campo ${fieldName} no puede ser negativo.`, 400);
  }

  return numberValue;
};

const validarCategoria = async (categoriaId) => {
  if (!isValidObjectId(categoriaId)) {
    throw new ApiError('El ID de la categoría no es válido.', 400);
  }

  const categoriaExiste = await Categoria.findById(categoriaId);

  if (!categoriaExiste) {
    throw new ApiError('La categoría seleccionada no existe.', 404);
  }
};

const buildProductoPayload = (body, partial = false) => {
  const payload = {};

  if (!partial || body.nombre !== undefined) {
    const nombre = normalizeText(body.nombre);

    if (!nombre) {
      throw new ApiError('El nombre del producto es obligatorio.', 400);
    }

    if (nombre.length < 2 || nombre.length > 100) {
      throw new ApiError(
        'El nombre del producto debe tener entre 2 y 100 caracteres.',
        400
      );
    }

    payload.nombre = nombre;
  }

  if (!partial || body.descripcion !== undefined) {
    const descripcion = normalizeText(body.descripcion);

    if (descripcion !== undefined && descripcion.length > 300) {
      throw new ApiError(
        'La descripción no puede superar los 300 caracteres.',
        400
      );
    }

    payload.descripcion = descripcion || '';
  }

  if (!partial || body.categoria !== undefined) {
    const categoria = normalizeText(body.categoria);

    if (!categoria) {
      throw new ApiError('La categoría es obligatoria.', 400);
    }

    payload.categoria = categoria;
  }

  if (!partial || body.precio !== undefined) {
    const precio = normalizeNumber(body.precio, 'precio');

    if (precio === undefined) {
      throw new ApiError('El precio es obligatorio.', 400);
    }

    payload.precio = precio;
  }

  if (!partial || body.stock !== undefined) {
    payload.stock = normalizeNumber(body.stock, 'stock') ?? 0;
  }

  if (!partial || body.stockMinimo !== undefined) {
    payload.stockMinimo = normalizeNumber(body.stockMinimo, 'stock mínimo') ?? 0;
  }

  if (!partial || body.unidadMedida !== undefined) {
    const unidadMedida = normalizeText(body.unidadMedida);

    payload.unidadMedida = unidadMedida || 'unidad';
  }

  if (!partial || body.proveedor !== undefined) {
    const proveedor = normalizeText(body.proveedor);

    if (proveedor !== undefined && proveedor.length > 120) {
      throw new ApiError(
        'El proveedor no puede superar los 120 caracteres.',
        400
      );
    }

    payload.proveedor = proveedor || '';
  }

  if (body.disponible !== undefined) {
    payload.disponible = Boolean(body.disponible);
  }

  return payload;
};

export const listarProductos = asyncHandler(async (req, res) => {
  const { categoria, disponible, busqueda, stockBajo } = req.query;

  const filtros = {};

  if (categoria) {
    if (!isValidObjectId(categoria)) {
      throw new ApiError('El ID de la categoría no es válido.', 400);
    }

    filtros.categoria = categoria;
  }

  if (disponible !== undefined) {
    filtros.disponible = disponible === 'true';
  }

  if (busqueda) {
    const busquedaLimpia = normalizeText(busqueda);

    if (busquedaLimpia.length > 80) {
      throw new ApiError(
        'El término de búsqueda no puede superar los 80 caracteres.',
        400
      );
    }

    filtros.nombre = {
      $regex: escapeRegex(busquedaLimpia),
      $options: 'i'
    };
  }

  if (stockBajo === 'true') {
    filtros.$expr = {
      $lte: ['$stock', '$stockMinimo']
    };
  }

  const productos = await Producto.find(filtros)
    .populate('categoria', 'nombre descripcion')
    .sort({ createdAt: -1 });

  return successResponse({
    res,
    message: 'Productos obtenidos correctamente.',
    data: { productos }
  });
});

export const obtenerProductoPorId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError('El ID del producto no es válido.', 400);
  }

  const producto = await Producto.findById(id).populate(
    'categoria',
    'nombre descripcion'
  );

  if (!producto) {
    throw new ApiError('Producto no encontrado.', 404);
  }

  return successResponse({
    res,
    message: 'Producto obtenido correctamente.',
    data: { producto }
  });
});

export const crearProducto = asyncHandler(async (req, res) => {
  const payload = buildProductoPayload(req.body);

  await validarCategoria(payload.categoria);

  const producto = await Producto.create(payload);

  const productoPopulado = await Producto.findById(producto._id).populate(
    'categoria',
    'nombre descripcion'
  );

  return successResponse({
    res,
    statusCode: 201,
    message: 'Producto creado correctamente.',
    data: { producto: productoPopulado }
  });
});

export const actualizarProducto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError('El ID del producto no es válido.', 400);
  }

  const payload = buildProductoPayload(req.body, true);

  if (payload.categoria) {
    await validarCategoria(payload.categoria);
  }

  const producto = await Producto.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  }).populate('categoria', 'nombre descripcion');

  if (!producto) {
    throw new ApiError('Producto no encontrado.', 404);
  }

  return successResponse({
    res,
    message: 'Producto actualizado correctamente.',
    data: { producto }
  });
});

export const eliminarProducto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError('El ID del producto no es válido.', 400);
  }

  const producto = await Producto.findByIdAndUpdate(
    id,
    { disponible: false },
    {
      new: true,
      runValidators: true
    }
  ).populate('categoria', 'nombre descripcion');

  if (!producto) {
    throw new ApiError('Producto no encontrado.', 404);
  }

  return successResponse({
    res,
    message: 'Producto desactivado correctamente.',
    data: { producto }
  });
});