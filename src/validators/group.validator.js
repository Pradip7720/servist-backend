const Joi = require("joi");

export const createGroupSchema = Joi.object({
    groupName: Joi.string().required(),
    description: Joi.string().required(),
    profilePic: Joi.string().uri().required(),
    bannerFile: Joi.string().uri().required(),
    bannerFileType: Joi.number().integer().min(1).required(),
    type: Joi.string().valid('public', 'private').required(),
    privacy: Joi.string().required(),
    members: Joi.string()
});
export const groupValidateSchema = Joi.object({
    groupId: Joi.string().uuid().required(),
});
export const addUserToGroupSchema = Joi.object({
    userIds: Joi.array()
        .items(Joi.string().uuid().required())
        .min(1)
        .required()
});

export const removeUserGroupSchema = Joi.object({
    groupId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().required()
});