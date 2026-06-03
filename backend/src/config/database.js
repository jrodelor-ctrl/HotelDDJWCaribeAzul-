import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });

    console.log(`MongoDB conectado: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
};