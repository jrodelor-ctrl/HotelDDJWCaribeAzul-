export const calcularStockNuevo = ({ stockActual, cantidad, tipo }) => {
  const stock = Number(stockActual);
  const cantidadMovimiento = Number(cantidad);

  if (!['entrada', 'salida'].includes(tipo)) {
    throw new Error('El tipo de movimiento debe ser entrada o salida.');
  }

  if (Number.isNaN(stock) || stock < 0) {
    throw new Error('El stock actual no es válido.');
  }

  if (Number.isNaN(cantidadMovimiento) || cantidadMovimiento <= 0) {
    throw new Error('La cantidad debe ser mayor a cero.');
  }

  if (tipo === 'entrada') {
    return stock + cantidadMovimiento;
  }

  if (cantidadMovimiento > stock) {
    throw new Error('Stock insuficiente.');
  }

  return stock - cantidadMovimiento;
};