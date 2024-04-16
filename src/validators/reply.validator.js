import Joi from 'joi';

export const commentReplySchema = Joi.object({
    commentId: Joi.string().uuid().required(),
    text: Joi.string().required(),
    replyId: Joi.string().uuid().required(),
    level: Joi.number().integer().min(0).max(4).required()
});

export const editCommentReplySchema = Joi.object({
    text: Joi.string().required(),
}); 