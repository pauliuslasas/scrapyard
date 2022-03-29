import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';

import { PartType } from '../../typings/types/parts';

export const addPartQuerySchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('METAL', 'RUBBER', 'VINTAGE', 'PLASTIC', 'WOOD'),
  age: Joi.number().required().min(0),
  rustiness: Joi.number().required().min(0).max(100),
  quality: Joi.number().required().min(0).max(100),
  price: Joi.number().required().min(0).max(200),
});

export interface AddPartRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    type: PartType;
    age: number;
    rustiness: number;
    quality: number;
    price: number;
  };
}
