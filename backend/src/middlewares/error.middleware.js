export const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  const response = {
    ok: false,
    message: error.message || 'Error interno del servidor'
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};