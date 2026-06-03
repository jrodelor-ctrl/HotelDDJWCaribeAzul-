import { Producto } from '../models/Producto.model.js';
import { Movimiento } from '../models/Movimiento.model.js';

export const obtenerReporteInventario = async ({ categoria, estadoStock }) => {
  const filtros = {
    disponible: true
  };

  if (categoria) {
    filtros.categoria = categoria;
  }

  const productos = await Producto.find(filtros)
    .populate('categoria', 'nombre descripcion')
    .sort({ nombre: 1 });

  const productosFiltrados = productos.filter((producto) => {
    if (!estadoStock) return true;

    if (estadoStock === 'agotado') {
      return producto.stock === 0;
    }

    if (estadoStock === 'stock_bajo') {
      return producto.stock > 0 && producto.stock <= producto.stockMinimo;
    }

    if (estadoStock === 'normal') {
      return producto.stock > producto.stockMinimo;
    }

    return true;
  });

  const resumen = {
    totalProductos: productosFiltrados.length,
    totalAgotados: productosFiltrados.filter((producto) => producto.stock === 0)
      .length,
    totalStockBajo: productosFiltrados.filter((producto) => {
      return producto.stock > 0 && producto.stock <= producto.stockMinimo;
    }).length,
    valorTotalInventario: productosFiltrados.reduce((total, producto) => {
      return total + producto.precio * producto.stock;
    }, 0)
  };

  return {
    resumen,
    productos: productosFiltrados
  };
};

export const obtenerReporteMovimientos = async ({
  producto,
  tipo,
  area,
  fechaInicio,
  fechaFin
}) => {
  const filtros = {};

  if (producto) filtros.producto = producto;
  if (tipo) filtros.tipo = tipo;
  if (area) filtros.area = area;

  if (fechaInicio || fechaFin) {
    filtros.createdAt = {};

    if (fechaInicio) {
      filtros.createdAt.$gte = new Date(fechaInicio);
    }

    if (fechaFin) {
      filtros.createdAt.$lte = new Date(fechaFin);
    }
  }

  const movimientos = await Movimiento.find(filtros)
    .populate('producto', 'nombre unidadMedida proveedor')
    .populate('area', 'nombre')
    .populate('usuario', 'nombre rol')
    .sort({ createdAt: -1 });

  const resumen = {
    totalMovimientos: movimientos.length,
    totalEntradas: movimientos.filter((movimiento) => movimiento.tipo === 'entrada')
      .length,
    totalSalidas: movimientos.filter((movimiento) => movimiento.tipo === 'salida')
      .length
  };

  return {
    resumen,
    movimientos
  };
};

export const convertirInventarioACsv = (productos) => {
  const encabezados = [
    'Producto',
    'Categoria',
    'Stock Actual',
    'Stock Minimo',
    'Estado',
    'Precio',
    'Valor Total',
    'Unidad',
    'Proveedor'
  ];

  const filas = productos.map((producto) => {
    let estado = 'Normal';

    if (producto.stock === 0) {
      estado = 'Agotado';
    } else if (producto.stock <= producto.stockMinimo) {
      estado = 'Stock bajo';
    }

    return [
      producto.nombre,
      producto.categoria?.nombre || 'Sin categoría',
      producto.stock,
      producto.stockMinimo,
      estado,
      producto.precio,
      producto.precio * producto.stock,
      producto.unidadMedida,
      producto.proveedor
    ];
  });

  const contenido = [encabezados, ...filas]
    .map((fila) => {
      return fila
        .map((campo) => {
          return `"${String(campo).replace(/"/g, '""')}"`;
        })
        .join(',');
    })
    .join('\n');

  return contenido;
};