import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';

export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(`ID inválido: ${id}`, 400);
    }

    next();
  };
};