import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env, validateEnv } from './config/env.js';

const startServer = async () => {
  try {
    validateEnv();

    await connectDatabase();

    app.listen(env.port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();