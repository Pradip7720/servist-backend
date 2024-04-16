import Joi from 'joi'
export const contactQuerySchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    subject: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    countryCode: Joi.string().required(),
    description: Joi.string().required()
});