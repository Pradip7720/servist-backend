import express from 'express';
import { createPost, deletePost, getSpecialities, pinPost } from '../controllers/post.controller';
import { authenticateUser } from '../../middleware/authorize';
// import { loginValidate, userRegistrationValidate } from '../validators/auth.validator';

const router = express.Router();
console.log("hdfhsj")
router.post('/cc', createPost);
router.delete('/:postId', deletePost)
router.get('/:postId/pin', authenticateUser, pinPost)
router.get('/specialities', getSpecialities )


module.exports = router;
