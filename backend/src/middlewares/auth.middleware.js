import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.model.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protegerRuta = asyncHandler(async (req, res, next) => {
  let token;

  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    token = authorizationHeader.split(' ')[1];
  }

  if (!token) {
    throw new ApiError('No autorizado. Token no proporcionado.', 401);
  }

  const decoded = jwt.verify(token, env.jwtSecret);

  const usuario = await Usuario.findById(decoded.id).select('-password');

  if (!usuario || !usuario.activo) {
    throw new ApiError('No autorizado. Usuario no válido o inactivo.', 401);
  }

  req.usuario = usuario;

  next();
});

export const autorizarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      throw new ApiError('No autorizado. Usuario no identificado.', 401);
    }

    const rolUsuario = String(req.usuario.rol || '')
      .toLowerCase()
      .trim();

    const rolesNormalizados = rolesPermitidos.map((rol) =>
      String(rol).toLowerCase().trim()
    );

    if (!rolesNormalizados.includes(rolUsuario)) {
      throw new ApiError('No tienes permisos para realizar esta acción.', 403);
    }

    next();
  };
};