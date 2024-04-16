import Joi from "joi";
// Define schema for groupIds array
const groupIdsSchema = Joi.array().items(Joi.string().uuid());

// Define schema for tags array
const tagsSchema = Joi.array().items(Joi.string().uuid());
export const createPostSchema = Joi.object({
    postTitle: Joi.string().required(),
    message: Joi.string().required(),
    location: Joi.string().required(),
    attachment: Joi.string().allow(null, ''),
    postAnonymously: Joi.boolean().required(),
    hiringRecommendation: Joi.boolean().required(),
    speciality: Joi.string().uuid().required(),
    groupIds: groupIdsSchema,
    tags: tagsSchema,
});
export const postValidateSchema = Joi.object({
    postId: Joi.string().uuid().required(),
}); 