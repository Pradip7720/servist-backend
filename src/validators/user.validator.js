import Joi from 'joi';

export const userValidateSchema = Joi.object({
   userId: Joi.string().uuid().required(),
});
export const userUpdateSchema = Joi.object({
   firstName: Joi.string().required(),
   lastName: Joi.string().required(),
   email: Joi.string().email().required(),
   phoneNumber: Joi.string().allow('').optional(),
   countryCode: Joi.string().allow('').optional(),
   userHandle: Joi.string().allow('').optional(),
   bio: Joi.string().allow('').optional()
});

export const userThemeValidation = Joi.object({
   theme: Joi.string().required()
})