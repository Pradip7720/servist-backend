import express from 'express';
import { authenticateUser } from '../../middleware/authorize';
import { deleteContact, getContacts, saveContact } from '../controllers/contact.controller';
import { blockUser, editImages, editProfile, fetchDms, fetchFeed, fetchUserDetails, fetchUserPosts, fetchUsers, getBlockedUser, getProfile, isUserHandleExist, profileMiniPreview, unblockUser, userTheme } from '../controllers/user.controller';
import multer from 'multer';

const router = express.Router();
const upload = multer();
router.post('/contacts', authenticateUser, saveContact);
router.delete('/contacts/:contactId', authenticateUser, deleteContact);
router.get('/contacts', authenticateUser, getContacts);
router.get('/profile', authenticateUser, getProfile)
router.put('/profile', upload.none(), authenticateUser, editProfile)
router.put('/profile-images', upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }]), authenticateUser, editImages)
router.post('/block', authenticateUser, blockUser);
router.delete('/unblock/:userId', authenticateUser, unblockUser);
router.get('/block', authenticateUser, getBlockedUser);
router.post('/user-handle', authenticateUser, isUserHandleExist);
router.get('/:userId/mini-preview', authenticateUser, profileMiniPreview);
router.get('/posts', authenticateUser, fetchUserPosts);
router.get('/:userId', authenticateUser, fetchUserDetails)
router.put('/theme', authenticateUser, userTheme)
router.get('/', authenticateUser, fetchUsers);
router.get('/direct-messages', authenticateUser, fetchDms);
router.get('/feeds', authenticateUser, fetchFeed)

module.exports = router;
