import { Categoria } from '../models/Categoria.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';

export const listarCategorias = asyncHandler(async (req, res) => {
  const categorias = await Categoria.find().sort({ nombre: 1 });

  return successResponse({
    res,
    message: 'Categorías obtenidas correctamente.',
    data: { categorias }
  });
});

export const crearCategoria = asyncHandler(async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    throw new ApiError('El nombre de la categoría es obligatorio.', 400);
  }

  const categoriaExistente = await Categoria.findOne({
    nombre: nombre.trim()
  });

  if (categoriaExistente) {
    throw new ApiError('Ya existe una categoría con ese nombre.', 409);
  }

  const categoria = await Categoria.create({
    nombre,
    descripcion
  });

  return successResponse({
    res,
    statusCode: 201,
    message: 'Categoría creada correctamente.',
    data: { categoria }
  });
});

export const actualizarCategoria = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!categoria) {
    throw new ApiError('Categoría no encontrada.', 404);
  }

  return successResponse({
    res,
    message: 'Categoría actualizada correctamente.',
    data: { categoria }
  });
});

export const eliminarCategoria = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { activa: false },
    { new: true }
  );

  if (!categoria) {
    throw new ApiError('Categoría no encontrada.', 404);
  }

  return successResponse({
    res,
    message: 'Categoría desactivada correctamente.',
    data: { categoria }
  });
});