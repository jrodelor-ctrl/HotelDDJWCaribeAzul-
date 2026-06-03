import { Producto } from '../models/Producto.model.js';
import { Categoria } from '../models/Categoria.model.js';
import { Area } from '../models/Area.model.js';
import { Movimiento } from '../models/Movimiento.model.js';

export const obtenerResumenDashboard = async () => {
  const [
    totalProductos,
    totalCategorias,
    totalAreas,
    totalMovimientos,
    productos,
    ultimosMovimientos,
    stockPorCategoria
  ] = await Promise.all([
    Producto.countDocuments({ disponible: true }),
    Categoria.countDocuments({ activa: true }),
    Area.countDocuments({ activa: true }),
    Movimiento.countDocuments(),
    Producto.find({ disponible: true }).populate('categoria', 'nombre'),
    Movimiento.find()
      .populate('producto', 'nombre unidadMedida')
      .populate('area', 'nombre')
      .populate('usuario', 'nombre rol')
      .sort({ createdAt: -1 })
      .limit(5),
    Producto.aggregate([
      {
        $lookup: {
          from: 'categorias',
          localField: 'categoria',
          foreignField: '_id',
          as: 'categoria'
        }
      },
      {
        $unwind: '$categoria'
      },
      {
        $match: {
          disponible: true
        }
      },
      {
        $group: {
          _id: '$categoria.nombre',
          totalStock: { $sum: '$stock' },
          totalProductos: { $sum: 1 }
        }
      },
      {
        $sort: {
          totalStock: -1
        }
      }
    ])
  ]);

  const productosStockBajo = productos.filter((producto) => {
    return producto.stock > 0 && producto.stock <= producto.stockMinimo;
  });

  const productosAgotados = productos.filter((producto) => {
    return producto.stock === 0;
  });

  return {
    indicadores: {
      totalProductos,
      totalCategorias,
      totalAreas,
      totalMovimientos,
      totalStockBajo: productosStockBajo.length,
      totalAgotados: productosAgotados.length
    },
    productosStockBajo,
    productosAgotados,
    ultimosMovimientos,
    stockPorCategoria
  };
};