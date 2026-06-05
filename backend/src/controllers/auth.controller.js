import { Usuario } from '../models/Usuario.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';
import { successResponse } from '../utils/responses.js';

const construirUsuarioResponse = (usuario) => {
  return {
    id: usuario._id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol,
    cargo: usuario.cargo || '',
    telefono: usuario.telefono || '',
    area: usuario.area || '',
    fotoPerfil: usuario.fotoPerfil || '',
    proveedorAuth: usuario.proveedorAuth || 'local',
    activo: usuario.activo
  };
};

const limpiarTexto = (valor) => {
  if (typeof valor !== 'string') {
    return '';
  }

  return valor.trim();
};

export const login = asyncHandler(async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    throw new ApiError('Correo y contraseña son obligatorios.', 400);
  }

  const correoNormalizado = String(correo).trim().toLowerCase();

  const usuario = await Usuario.findOne({ correo: correoNormalizado }).select(
    '+password'
  );

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

  return successResponse({
    res,
    message: 'Inicio de sesión exitoso.',
    data: {
      usuario: construirUsuarioResponse(usuario),
      token
    }
  });
});

export const obtenerPerfil = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);

  if (!usuario) {
    throw new ApiError('Usuario no encontrado.', 404);
  }

  return successResponse({
    res,
    message: 'Perfil obtenido correctamente.',
    data: {
      usuario: construirUsuarioResponse(usuario)
    }
  });
});

export const actualizarPerfil = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);

  if (!usuario) {
    throw new ApiError('Usuario no encontrado.', 404);
  }

  const nombre = limpiarTexto(req.body.nombre);
  const cargo = limpiarTexto(req.body.cargo);
  const telefono = limpiarTexto(req.body.telefono);
  const area = limpiarTexto(req.body.area);
  const fotoPerfil = limpiarTexto(req.body.fotoPerfil);

  if (!nombre || nombre.length < 3) {
    throw new ApiError('El nombre debe tener al menos 3 caracteres.', 400);
  }

  usuario.nombre = nombre;
  usuario.cargo = cargo;
  usuario.telefono = telefono;
  usuario.area = area;

  if (fotoPerfil) {
  const esImagenBase64 = fotoPerfil.startsWith('data:image/');
  const esUrlImagen = fotoPerfil.startsWith('http://') || fotoPerfil.startsWith('https://');

  if (!esImagenBase64 && !esUrlImagen) {
    throw new ApiError('La foto de perfil debe ser una imagen válida.', 400);
  }

  if (fotoPerfil.length > 900000) {
    throw new ApiError('La foto de perfil no puede superar el tamaño permitido.', 400);
  }

  usuario.fotoPerfil = fotoPerfil;
}

  await usuario.save();

  return successResponse({
    res,
    message: 'Perfil actualizado correctamente.',
    data: {
      usuario: construirUsuarioResponse(usuario)
    }
  });
});

export const cambiarPassword = asyncHandler(async (req, res) => {
  const { passwordActual, passwordNueva, confirmarPassword } = req.body;

  if (!passwordActual || !passwordNueva || !confirmarPassword) {
    throw new ApiError(
      'La contraseña actual, la nueva contraseña y la confirmación son obligatorias.',
      400
    );
  }

  if (passwordNueva.length < 6) {
    throw new ApiError(
      'La nueva contraseña debe tener al menos 6 caracteres.',
      400
    );
  }

  if (passwordNueva !== confirmarPassword) {
    throw new ApiError('La confirmación de contraseña no coincide.', 400);
  }

  if (passwordActual === passwordNueva) {
    throw new ApiError(
      'La nueva contraseña debe ser diferente a la contraseña actual.',
      400
    );
  }

  const usuario = await Usuario.findById(req.usuario._id).select('+password');

  if (!usuario) {
    throw new ApiError('Usuario no encontrado.', 404);
  }

  if (usuario.proveedorAuth === 'google') {
    throw new ApiError(
      'Este usuario inicia sesión con Google. La contraseña debe gestionarse desde su cuenta de Google.',
      400
    );
  }

  const passwordValido = await usuario.compararPassword(passwordActual);

  if (!passwordValido) {
    throw new ApiError('La contraseña actual no es correcta.', 401);
  }

  usuario.password = passwordNueva;
  await usuario.save();

  return successResponse({
    res,
    message: 'Contraseña actualizada correctamente.',
    data: null
  });
});