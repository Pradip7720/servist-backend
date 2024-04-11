import express from 'express';
import { addCommentToPost, bookmarkPost, createPost, deletePost, getSpecialities, pinPost, reportPost } from '../controllers/post.controller';
import { authenticateUser } from '../../middleware/authorize';

const router = express.Router();
router.post('/cc', authenticateUser,createPost);
router.delete('/:postId', deletePost)
router.get('/:postId/pin', authenticateUser, pinPost)
router.get('/specialities', getSpecialities)
router.post('/:postId/report', authenticateUser, reportPost)
router.post('/:postId/bookmark', authenticateUser, bookmarkPost);
router.post('/:postId/comments', authenticateUser, addCommentToPost);


module.exports = router;
