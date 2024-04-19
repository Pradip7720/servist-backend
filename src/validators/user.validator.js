import Joi from 'joi';

export const userValidateSchema = Joi.object({
   userId: Joi.string().uuid().required(),
}); 