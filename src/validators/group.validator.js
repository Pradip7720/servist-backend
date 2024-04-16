const Joi = require("joi");

export const createGroupSchema = Joi.object({
    groupName: Joi.string().required(),
    description: Joi.string().required(),
    profilePic: Joi.string().uri().required(),
    bannerFile: Joi.string().uri().required(),
    bannerFileType: Joi.number().integer().min(1).required(),
    type: Joi.string().valid('public', 'private').required(),
    privacy: Joi.string().required(),
    members: Joi.array().items(Joi.string().uuid()).min(1).required()
});