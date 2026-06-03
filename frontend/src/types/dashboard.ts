import type { Movimiento } from './movimiento';
import type { Producto } from './producto';

export type DashboardResumen = {
  indicadores: {
    totalProductos: number;
    totalCategorias: number;
    totalAreas: number;
    totalMovimientos: number;
    totalStockBajo: number;
    totalAgotados: number;
  };
  productosStockBajo: Producto[];
  productosAgotados: Producto[];
  ultimosMovimientos: Movimiento[];
  stockPorCategoria: {
    _id: string;
    totalStock: number;
    totalProductos: number;
  }[];
};