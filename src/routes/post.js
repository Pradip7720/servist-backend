import express from 'express';
import { addCommentToPost, addReply, bookmarkPost, createPost, deletePost, deleteReply, fetchPosts, fetchTags, getAllServist, getPostDetails, getSpecialities, pinPost, postReaction, reportPost, updateReply } from '../controllers/post.controller';
import { authenticateUser } from '../../middleware/authorize';

const router = express.Router();
router.post('/', authenticateUser, createPost);
router.delete('/:postId', deletePost);
router.get('/:postId/pin', authenticateUser, pinPost);
router.get('/specialities', getSpecialities);
router.post('/:postId/report', authenticateUser, reportPost);
router.post('/:postId/bookmark', authenticateUser, bookmarkPost);
router.post('/:postId/comments', authenticateUser, addCommentToPost);
router.get('/all-servist', authenticateUser, getAllServist);
router.post('/replies', authenticateUser, addReply);
router.put('/replies', authenticateUser, updateReply);
router.delete('/replies', authenticateUser, deleteReply);
router.get('/:postId', authenticateUser, getPostDetails);
router.post('/:postId/reaction', authenticateUser, postReaction);
router.get('/tags', authenticateUser, fetchTags);
router.get('/', authenticateUser, fetchPosts);

module.exports = router;
