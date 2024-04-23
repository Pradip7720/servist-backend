import Joi from 'joi';

export const contactValidateSchema = Joi.object({
    contactId: Joi.string().uuid().required(),
}); 