import express from 'express';
import { createGroup, } from '../controllers/group.controller';
import { authenticateUser } from '../../middleware/authorize';


const router = express.Router();
router.post('/', authenticateUser, createGroup);

module.exports = router;
