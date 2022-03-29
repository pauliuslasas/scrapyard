import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';

export const GetPartQuerySchema = Joi.object({
  id: Joi.number().required(),
});

export interface GetPartRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: number;
  };
}
