export const successResponse = ({
  res,
  statusCode = 200,
  message = 'Operación realizada correctamente',
  data = null
}) => {
  return res.status(statusCode).json({
    ok: true,
    message,
    data
  });
};