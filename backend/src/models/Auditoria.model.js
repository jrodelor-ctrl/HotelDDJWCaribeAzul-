import mongoose from 'mongoose';

const auditoriaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      default: null
    },

    nombreUsuario: {
      type: String,
      default: 'Usuario no identificado'
    },

    rolUsuario: {
      type: String,
      default: ''
    },

    accion: {
      type: String,
      required: true
    },

    metodo: {
      type: String,
      required: true
    },

    ruta: {
      type: String,
      required: true
    },

    modulo: {
      type: String,
      default: 'General'
    },

    recursoId: {
      type: String,
      default: ''
    },

    ip: {
      type: String,
      default: ''
    },

    userAgent: {
      type: String,
      default: ''
    },

    estadoRespuesta: {
      type: Number,
      default: null
    },

    detalle: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);


auditoriaSchema.index({ createdAt: -1 });
auditoriaSchema.index({ usuario: 1, createdAt: -1 });
auditoriaSchema.index({ modulo: 1, createdAt: -1 });

const bloquearModificacion = function () {
  throw new Error('Los registros de auditoría son inmutables.');
};

auditoriaSchema.pre('findOneAndUpdate', bloquearModificacion);
auditoriaSchema.pre('updateOne', bloquearModificacion);
auditoriaSchema.pre('updateMany', bloquearModificacion);
auditoriaSchema.pre('findOneAndDelete', bloquearModificacion);
auditoriaSchema.pre('deleteOne', bloquearModificacion);
auditoriaSchema.pre('deleteMany', bloquearModificacion);

export const Auditoria = mongoose.model('Auditoria', auditoriaSchema);