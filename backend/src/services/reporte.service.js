import { Producto } from '../models/Producto.model.js';
import { Movimiento } from '../models/Movimiento.model.js';

const obtenerEstadoProducto = (producto) => {
  if (!producto.disponible) {
    return 'Desactivado';
  }

  if (producto.stock === 0) {
    return 'Agotado';
  }

  if (producto.stock <= producto.stockMinimo) {
    return 'Stock bajo';
  }

  return 'Normal';
};

const obtenerEstadoStock = (producto) => {
  if (!producto.disponible) {
    return 'desactivado';
  }

  if (producto.stock === 0) {
    return 'agotado';
  }

  if (producto.stock <= producto.stockMinimo) {
    return 'stock_bajo';
  }

  return 'normal';
};

const normalizarProductoReporte = (producto) => {
  const productoObjeto = producto.toObject
    ? producto.toObject()
    : producto;

  return {
    ...productoObjeto,
    estado: obtenerEstadoProducto(producto),
    estadoStock: obtenerEstadoStock(producto),
    valorTotal: producto.precio * producto.stock
  };
};

export const obtenerReporteInventario = async ({ categoria, estadoStock }) => {
  const filtros = {};

  if (categoria) {
    filtros.categoria = categoria;
  }

  const productos = await Producto.find(filtros)
    .populate('categoria', 'nombre descripcion')
    .sort({ nombre: 1 });

  const productosFiltrados = productos.filter((producto) => {
    if (!estadoStock) return true;

    if (estadoStock === 'desactivado') {
      return producto.disponible === false;
    }

    if (estadoStock === 'activo') {
      return producto.disponible === true;
    }

    if (estadoStock === 'agotado') {
      return producto.disponible && producto.stock === 0;
    }

    if (estadoStock === 'stock_bajo') {
      return (
        producto.disponible &&
        producto.stock > 0 &&
        producto.stock <= producto.stockMinimo
      );
    }

    if (estadoStock === 'normal') {
      return producto.disponible && producto.stock > producto.stockMinimo;
    }

    return true;
  });

  const productosReporte = productosFiltrados.map(normalizarProductoReporte);

  const productosActivos = productosReporte.filter(
    (producto) => producto.disponible
  );

  const productosDesactivados = productosReporte.filter(
    (producto) => !producto.disponible
  );

  const resumen = {
    totalProductos: productosReporte.length,

    totalActivos: productosActivos.length,

    totalDesactivados: productosDesactivados.length,

    totalAgotados: productosActivos.filter((producto) => producto.stock === 0)
      .length,

    totalStockBajo: productosActivos.filter((producto) => {
      return producto.stock > 0 && producto.stock <= producto.stockMinimo;
    }).length,

    valorTotalInventario: productosActivos.reduce((total, producto) => {
      return total + producto.precio * producto.stock;
    }, 0),

    valorTotalDesactivados: productosDesactivados.reduce((total, producto) => {
      return total + producto.precio * producto.stock;
    }, 0)
  };

  return {
    resumen,
    productos: productosReporte
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
    .populate(
      'producto',
      'nombre unidadMedida proveedor disponible fechaDesactivacion'
    )
    .populate('area', 'nombre')
    .populate('usuario', 'nombre rol')
    .sort({ createdAt: -1 });

  const resumen = {
    totalMovimientos: movimientos.length,
    totalEntradas: movimientos.filter(
      (movimiento) => movimiento.tipo === 'entrada'
    ).length,
    totalSalidas: movimientos.filter(
      (movimiento) => movimiento.tipo === 'salida'
    ).length
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
    const estado = producto.estado || obtenerEstadoProducto(producto);
    const valorTotal = producto.valorTotal ?? producto.precio * producto.stock;

    return [
      producto.nombre,
      producto.categoria?.nombre || 'Sin categoría',
      producto.stock,
      producto.stockMinimo,
      estado,
      producto.precio,
      valorTotal,
      producto.unidadMedida,
      producto.proveedor
    ];
  });

  const contenido = [encabezados, ...filas]
    .map((fila) => {
      return fila
        .map((campo) => {
          return `"${String(campo ?? '').replace(/"/g, '""')}"`;
        })
        .join(';');
    })
    .join('\n');

  return `\uFEFF${contenido}`;
};