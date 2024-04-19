import express from 'express';
import { authenticateUser } from '../../middleware/authorize';


const router = express.Router();
router.post('/contacts', authenticateUser);


module.exports = router;
