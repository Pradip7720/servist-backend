import express from 'express';
import { addUser, createGroup, createSubGroup, fetchGroupInfo, groupJoinRequest, leaveGroup, myGroups, removeUserFromGroup, } from '../controllers/group.controller';
import { authenticateUser } from '../../middleware/authorize';
import multer from 'multer';

const router = express.Router();
const upload = multer();
router.post('/', upload.none(), authenticateUser, createGroup);
router.post('/:groupId/join-request', authenticateUser, groupJoinRequest);
router.post('/:groupId/users', authenticateUser, addUser);
router.delete('/:groupId', authenticateUser, leaveGroup);
router.delete('/:groupId/users/:userId', authenticateUser, removeUserFromGroup)
router.get('/:groupId', authenticateUser, fetchGroupInfo);
router.post('/:groupId/sub-group', upload.none(), authenticateUser, createSubGroup)
router.get('/my-group', authenticateUser, myGroups);



module.exports = router;
