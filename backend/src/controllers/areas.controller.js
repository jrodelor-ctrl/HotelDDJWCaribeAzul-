import { Area } from '../models/Area.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responses.js';

export const listarAreas = asyncHandler(async (req, res) => {
  const areas = await Area.find().sort({ nombre: 1 });

  return successResponse({
    res,
    message: 'Áreas obtenidas correctamente.',
    data: { areas }
  });
});

export const crearArea = asyncHandler(async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    throw new ApiError('El nombre del área es obligatorio.', 400);
  }

  const areaExistente = await Area.findOne({
    nombre: nombre.trim()
  });

  if (areaExistente) {
    throw new ApiError('Ya existe un área con ese nombre.', 409);
  }

  const area = await Area.create({
    nombre,
    descripcion
  });

  return successResponse({
    res,
    statusCode: 201,
    message: 'Área creada correctamente.',
    data: { area }
  });
});

export const actualizarArea = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const area = await Area.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!area) {
    throw new ApiError('Área no encontrada.', 404);
  }

  return successResponse({
    res,
    message: 'Área actualizada correctamente.',
    data: { area }
  });
});

export const eliminarArea = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const area = await Area.findByIdAndUpdate(
    id,
    { activa: false },
    { new: true }
  );

  if (!area) {
    throw new ApiError('Área no encontrada.', 404);
  }

  return successResponse({
    res,
    message: 'Área desactivada correctamente.',
    data: { area }
  });
});