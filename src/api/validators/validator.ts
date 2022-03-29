import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

type ValidateType = 'body' | 'query' | 'params';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function validate(type: ValidateType, schema: Joi.ObjectSchema<unknown>) {
  return createValidator({ passError: true })[type](schema);
}
