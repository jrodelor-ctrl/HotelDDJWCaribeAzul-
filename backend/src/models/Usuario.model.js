import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del usuario es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },

    correo: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Ingrese un correo electrónico válido'
      ]
    },

    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false
    },

    rol: {
      type: String,
      enum: ['admin', 'gerente', 'inventario'],
      default: 'inventario'
    },

    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

usuarioSchema.methods.compararPassword = async function (passwordIngresado) {
  return bcrypt.compare(passwordIngresado, this.password);
};

export const Usuario = mongoose.model('Usuario', usuarioSchema);