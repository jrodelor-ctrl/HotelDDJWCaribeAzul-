import mongoose from 'mongoose';

const solicitudCompraSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: [true, 'El producto es obligatorio']
    },

    cantidadSugerida: {
      type: Number,
      required: [true, 'La cantidad sugerida es obligatoria'],
      min: [1, 'La cantidad sugerida debe ser mayor a 0']
    },

    prioridad: {
      type: String,
      enum: ['baja', 'media', 'alta'],
      default: 'media'
    },

    estado: {
      type: String,
      enum: ['pendiente', 'aprobada', 'rechazada'],
      default: 'pendiente'
    },

    motivo: {
      type: String,
      trim: true,
      default: 'Producto con stock bajo'
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'El usuario solicitante es obligatorio']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

solicitudCompraSchema.index({ producto: 1 });
solicitudCompraSchema.index({ estado: 1 });
solicitudCompraSchema.index({ prioridad: 1 });

export const SolicitudCompra = mongoose.model(
  'SolicitudCompra',
  solicitudCompraSchema
);