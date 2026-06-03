import { Producto } from '../models/Producto.model.js';
import { Movimiento } from '../models/Movimiento.model.js';

const calcularNivelRiesgo = ({ stock, diasEstimados }) => {
  if (stock === 0) {
    return {
      nivel: 'crítico',
      descripcion: 'Producto agotado. Reposición inmediata requerida.'
    };
  }

  if (diasEstimados !== null && diasEstimados <= 3) {
    return {
      nivel: 'crítico',
      descripcion: 'El producto podría agotarse en 3 días o menos.'
    };
  }

  if (diasEstimados !== null && diasEstimados <= 7) {
    return {
      nivel: 'alto',
      descripcion: 'El producto podría agotarse durante la próxima semana.'
    };
  }

  if (diasEstimados !== null && diasEstimados <= 15) {
    return {
      nivel: 'medio',
      descripcion: 'El producto requiere seguimiento preventivo.'
    };
  }

  return {
    nivel: 'bajo',
    descripcion: 'El producto tiene disponibilidad suficiente.'
  };
};

export const obtenerAnaliticaRiesgo = async ({ dias = 30 }) => {
  const diasAnalisis = Number(dias) > 0 ? Number(dias) : 30;

  const fechaInicio = new Date();
  fechaInicio.setDate(fechaInicio.getDate() - diasAnalisis);

  const productos = await Producto.find({ disponible: true })
    .populate('categoria', 'nombre')
    .sort({ nombre: 1 });

  const movimientosSalida = await Movimiento.aggregate([
    {
      $match: {
        tipo: 'salida',
        createdAt: {
          $gte: fechaInicio
        }
      }
    },
    {
      $group: {
        _id: '$producto',
        totalConsumido: {
          $sum: '$cantidad'
        },
        cantidadMovimientos: {
          $sum: 1
        }
      }
    }
  ]);

  const consumoPorProducto = new Map();

  movimientosSalida.forEach((movimiento) => {
    consumoPorProducto.set(String(movimiento._id), {
      totalConsumido: movimiento.totalConsumido,
      cantidadMovimientos: movimiento.cantidadMovimientos
    });
  });

  const analitica = productos.map((producto) => {
    const consumo = consumoPorProducto.get(String(producto._id)) || {
      totalConsumido: 0,
      cantidadMovimientos: 0
    };

    const consumoPromedioDiario =
      consumo.totalConsumido > 0
        ? Number((consumo.totalConsumido / diasAnalisis).toFixed(2))
        : 0;

    const diasEstimados =
      consumoPromedioDiario > 0
        ? Number((producto.stock / consumoPromedioDiario).toFixed(1))
        : null;

    const riesgo = calcularNivelRiesgo({
      stock: producto.stock,
      diasEstimados
    });

    return {
      producto: {
        id: producto._id,
        nombre: producto.nombre,
        categoria: producto.categoria?.nombre || 'Sin categoría',
        unidadMedida: producto.unidadMedida,
        proveedor: producto.proveedor
      },
      stockActual: producto.stock,
      stockMinimo: producto.stockMinimo,
      totalConsumidoPeriodo: consumo.totalConsumido,
      movimientosSalidaPeriodo: consumo.cantidadMovimientos,
      consumoPromedioDiario,
      diasEstimadosDuracion: diasEstimados,
      riesgo
    };
  });

  const ordenRiesgo = {
    crítico: 1,
    alto: 2,
    medio: 3,
    bajo: 4
  };

  analitica.sort((a, b) => {
    return ordenRiesgo[a.riesgo.nivel] - ordenRiesgo[b.riesgo.nivel];
  });

  const resumen = {
    diasAnalisis,
    totalProductosAnalizados: analitica.length,
    totalCriticos: analitica.filter((item) => item.riesgo.nivel === 'crítico')
      .length,
    totalRiesgoAlto: analitica.filter((item) => item.riesgo.nivel === 'alto')
      .length,
    totalRiesgoMedio: analitica.filter((item) => item.riesgo.nivel === 'medio')
      .length,
    totalRiesgoBajo: analitica.filter((item) => item.riesgo.nivel === 'bajo')
      .length
  };

  return {
    resumen,
    productos: analitica
  };
};