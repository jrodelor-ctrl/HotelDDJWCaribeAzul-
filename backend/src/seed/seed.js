import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Usuario } from '../models/Usuario.model.js';
import { Categoria } from '../models/Categoria.model.js';
import { Area } from '../models/Area.model.js';
import { Producto } from '../models/Producto.model.js';
import { Movimiento } from '../models/Movimiento.model.js';
import { SolicitudCompra } from '../models/SolicitudCompra.model.js';


dotenv.config();

const usuarios = [
  {
    nombre: 'Jaime Rodelo',
    correo: 'admin@hotelddjw.com',
    password: '123456',
    rol: 'admin'
  },
  {
    nombre: 'Daniel Barrero',
    correo: 'admin2@hotelddjw.com',
    password: '123456',
    rol: 'admin'
  },
  
  {
    nombre: 'Daniela Ramos Gerente Hotel DDJW',
    correo: 'gerente@hotelddjw.com',
    password: '123456',
    rol: 'gerente'
  },
  {
    nombre: 'Wanda Encargada de Inventario',
    correo: 'inventario@hotelddjw.com',
    password: '123456',
    rol: 'inventario'
  }
];

const categorias = [
  {
    nombre: 'Limpieza',
    descripcion: 'Productos de aseo y limpieza general del hotel'
  },
  {
    nombre: 'Alimentos',
    descripcion: 'Insumos alimenticios utilizados en cocina y restaurante'
  },
  {
    nombre: 'Lencería',
    descripcion: 'Toallas, sábanas, fundas y elementos textiles'
  },
  {
    nombre: 'Amenities',
    descripcion: 'Productos de cortesía para habitaciones'
  },
  {
    nombre: 'Mantenimiento',
    descripcion: 'Materiales y herramientas para mantenimiento hotelero'
  }
];

const areas = [
  {
    nombre: 'Cocina',
    descripcion: 'Área encargada de preparación de alimentos'
  },
  {
    nombre: 'Recepción',
    descripcion: 'Área de atención inicial al huésped'
  },
  {
    nombre: 'Lavandería',
    descripcion: 'Área encargada del lavado y control de lencería'
  },
  {
    nombre: 'Habitaciones',
    descripcion: 'Área de consumo de amenities y elementos de aseo'
  },
  {
    nombre: 'Mantenimiento',
    descripcion: 'Área encargada de reparaciones y soporte interno'
  }
];

const productosBase = [
  {
    nombre: 'Toallas blancas',
    descripcion: 'Toallas blancas para habitaciones y baños',
    categoriaNombre: 'Lencería',
    precio: 18000,
    stock: 3,
    stockMinimo: 10,
    unidadMedida: 'unidad',
    proveedor: 'Textiles Caribe S.A.S.'
  },
  {
    nombre: 'Shampoo 30 ml',
    descripcion: 'Shampoo individual para huéspedes',
    categoriaNombre: 'Amenities',
    precio: 1200,
    stock: 25,
    stockMinimo: 40,
    unidadMedida: 'unidad',
    proveedor: 'Amenities del Norte'
  },
  {
    nombre: 'Jabón líquido antibacterial',
    descripcion: 'Jabón líquido para baños y zonas comunes',
    categoriaNombre: 'Limpieza',
    precio: 15000,
    stock: 12,
    stockMinimo: 8,
    unidadMedida: 'litro',
    proveedor: 'Aseo Total Cartagena'
  },
  {
    nombre: 'Arroz blanco',
    descripcion: 'Insumo alimenticio para cocina',
    categoriaNombre: 'Alimentos',
    precio: 5200,
    stock: 30,
    stockMinimo: 10,
    unidadMedida: 'kg',
    proveedor: 'Distribuidora Caribe'
  },
  {
    nombre: 'Bombillos LED',
    descripcion: 'Bombillos para mantenimiento de habitaciones',
    categoriaNombre: 'Mantenimiento',
    precio: 9500,
    stock: 4,
    stockMinimo: 10,
    unidadMedida: 'unidad',
    proveedor: 'Eléctricos Bolívar'
  }
];

const importarDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Usuario.deleteMany();
    await Categoria.deleteMany();
    await Area.deleteMany();
    await Producto.deleteMany();
    await Movimiento.deleteMany();
    await SolicitudCompra.deleteMany();

    const usuariosCreados = [];
    for (const usuario of usuarios) {
        const usuarioCreado = await Usuario.create(usuario);
          usuariosCreados.push(usuarioCreado);
        }
    const categoriasCreadas = await Categoria.insertMany(categorias);
    await Area.insertMany(areas);

    const productos = productosBase.map((producto) => {
      const categoria = categoriasCreadas.find(
        (cat) => cat.nombre === producto.categoriaNombre
      );

      return {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categoria: categoria._id,
        precio: producto.precio,
        stock: producto.stock,
        stockMinimo: producto.stockMinimo,
        unidadMedida: producto.unidadMedida,
        proveedor: producto.proveedor
      };
    });

    await Producto.insertMany(productos);

    console.log('Datos iniciales insertados correctamente.');
    console.log('Usuario admin: admin@hotelddjw.com');
    console.log('Contraseña: 123456');

    process.exit();
  } catch (error) {
    console.error('Error al insertar datos iniciales:', error.message);
    process.exit(1);
  }
};

importarDatos();