import { Usuario } from '../models/Usuario.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';
import { successResponse } from '../utils/responses.js';

export const login = asyncHandler(async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    throw new ApiError('Correo y contraseña son obligatorios.', 400);
  }

  const usuario = await Usuario.findOne({ correo }).select('+password');

  if (!usuario) {
    throw new ApiError('Credenciales inválidas.', 401);
  }

  if (!usuario.activo) {
    throw new ApiError('El usuario se encuentra inactivo.', 403);
  }

  const passwordValido = await usuario.compararPassword(password);

  if (!passwordValido) {
    throw new ApiError('Credenciales inválidas.', 401);
  }

  const token = generateToken({
    id: usuario._id,
    rol: usuario.rol
  });

  const usuarioResponse = {
    id: usuario._id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol
  };

  return successResponse({
    res,
    message: 'Inicio de sesión exitoso.',
    data: {
      usuario: usuarioResponse,
      token
    }
  });
});

export const obtenerPerfil = asyncHandler(async (req, res) => {
  return successResponse({
    res,
    message: 'Perfil obtenido correctamente.',
    data: {
      usuario: req.usuario
    }
  });
});