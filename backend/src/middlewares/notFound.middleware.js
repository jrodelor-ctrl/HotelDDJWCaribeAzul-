import { ApiError } from '../utils/ApiError.js';

export const notFoundMiddleware = (req, res, next) => {
  next(new ApiError(`Ruta no encontrada: ${req.originalUrl}`, 404));
};