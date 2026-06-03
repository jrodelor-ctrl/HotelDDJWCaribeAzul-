import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres']
    },

    descripcion: {
      type: String,
      trim: true,
      default: ''
    },

    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: [true, 'La categoría del producto es obligatoria']
    },

    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },

    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0
    },

    stockMinimo: {
      type: Number,
      required: [true, 'El stock mínimo es obligatorio'],
      min: [0, 'El stock mínimo no puede ser negativo'],
      default: 5
    },

    unidadMedida: {
      type: String,
      enum: ['unidad', 'paquete', 'caja', 'litro', 'galon', 'kg', 'gramo'],
      default: 'unidad'
    },

    proveedor: {
      type: String,
      trim: true,
      default: 'Proveedor no asignado'
    },

    disponible: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

productoSchema.index({ nombre: 1, categoria: 1 });

productoSchema.virtual('estadoStock').get(function () {
  if (this.stock === 0) return 'agotado';
  if (this.stock <= this.stockMinimo) return 'stock_bajo';
  return 'normal';
});

productoSchema.set('toJSON', { virtuals: true });
productoSchema.set('toObject', { virtuals: true });

export const Producto = mongoose.model('Producto', productoSchema);