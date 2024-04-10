import express from 'express';
import {createPost, deletePost, pinPost} from '../controllers/post.controller';
// import { loginValidate, userRegistrationValidate } from '../validators/auth.validator';

const router = express.Router();
console.log("hdfhsj")
router.post('/cc', createPost);
router.delete('/:postId', deletePost)
router.get('/:postId/pin', pinPost)


module.exports = router;
