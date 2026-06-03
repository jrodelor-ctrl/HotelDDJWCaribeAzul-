import mongoose from 'mongoose';

const movimientoSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: [true, 'El producto es obligatorio']
    },

    tipo: {
      type: String,
      enum: ['entrada', 'salida'],
      required: [true, 'El tipo de movimiento es obligatorio']
    },

    cantidad: {
      type: Number,
      required: [true, 'La cantidad es obligatoria'],
      min: [1, 'La cantidad debe ser mayor a 0']
    },

    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
      required: function () {
        return this.tipo === 'salida';
      }
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'El usuario responsable es obligatorio']
    },

    observacion: {
      type: String,
      trim: true,
      default: ''
    },

    stockAnterior: {
      type: Number,
      required: true
    },

    stockNuevo: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

movimientoSchema.index({ producto: 1, createdAt: -1 });
movimientoSchema.index({ tipo: 1 });
movimientoSchema.index({ area: 1 });

export const Movimiento = mongoose.model('Movimiento', movimientoSchema);