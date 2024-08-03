import * as Joi from 'joi';

export const ValidateEnv = Joi.object({
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASS: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),
  API_PORT: Joi.number(),
});
