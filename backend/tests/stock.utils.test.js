import { calcularStockNuevo } from '../src/utils/stock.utils.js';

describe('calcularStockNuevo', () => {
  test('Debe sumar la cantidad cuando el movimiento es una entrada', () => {
    const resultado = calcularStockNuevo({
      stockActual: 10,
      cantidad: 5,
      tipo: 'entrada'
    });

    expect(resultado).toBe(15);
  });

  test('Debe restar la cantidad cuando el movimiento es una salida', () => {
    const resultado = calcularStockNuevo({
      stockActual: 10,
      cantidad: 3,
      tipo: 'salida'
    });

    expect(resultado).toBe(7);
  });

  test('Debe lanzar error si la salida supera el stock disponible', () => {
    expect(() =>
      calcularStockNuevo({
        stockActual: 5,
        cantidad: 10,
        tipo: 'salida'
      })
    ).toThrow('Stock insuficiente.');
  });

  test('Debe lanzar error si el tipo de movimiento no es válido', () => {
    expect(() =>
      calcularStockNuevo({
        stockActual: 5,
        cantidad: 1,
        tipo: 'ajuste'
      })
    ).toThrow('El tipo de movimiento debe ser entrada o salida.');
  });

  test('Debe lanzar error si la cantidad es menor o igual a cero', () => {
    expect(() =>
      calcularStockNuevo({
        stockActual: 5,
        cantidad: 0,
        tipo: 'entrada'
      })
    ).toThrow('La cantidad debe ser mayor a cero.');
  });
});