import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      trim: true,
      unique: true,
      minlength: [3, 'La categoría debe tener al menos 3 caracteres']
    },

    descripcion: {
      type: String,
      trim: true,
      default: ''
    },

    activa: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Categoria = mongoose.model('Categoria', categoriaSchema);