import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

export const securityHeaders = helmet({
  crossOriginResourcePolicy: {
    policy: 'cross-origin'
  }
});

export const mongoSanitizer = mongoSanitize({
  replaceWith: '_'
});

export const parameterPollutionProtection = hpp();

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: 'Demasiadas solicitudes desde esta IP. Intenta nuevamente más tarde.'
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message:
      'Demasiados intentos de inicio de sesión. Intenta nuevamente más tarde.'
  }
});

const forbiddenShellCharacters = /[;&|`$<>\\\n\r]/;

const hasForbiddenShellCharacters = (value) => {
  if (typeof value === 'string') {
    return forbiddenShellCharacters.test(value);
  }

  if (Array.isArray(value)) {
    return value.some(hasForbiddenShellCharacters);
  }

  if (value && typeof value === 'object') {
    return Object.values(value).some(hasForbiddenShellCharacters);
  }

  return false;
};

export const validateNoShellInjection = (req, res, next) => {
  const hasDangerousInput =
    hasForbiddenShellCharacters(req.body) ||
    hasForbiddenShellCharacters(req.query) ||
    hasForbiddenShellCharacters(req.params);

  if (hasDangerousInput) {
    return res.status(400).json({
      ok: false,
      message: 'La solicitud contiene caracteres no permitidos.'
    });
  }

  next();
};