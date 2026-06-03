import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
};

export const validateEnv = () => {
  const requiredVariables = ['MONGODB_URI', 'JWT_SECRET'];

  const missingVariables = requiredVariables.filter((variable) => {
    return !process.env[variable];
  });

  if (missingVariables.length > 0) {
    throw new Error(
      `Faltan variables de entorno obligatorias: ${missingVariables.join(', ')}`
    );
  }
};