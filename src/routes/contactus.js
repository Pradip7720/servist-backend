import express from 'express';
import { createContactQuery } from '../controllers/contactus.controller';
// import { authenticateUser } from '../../middleware/authorize';


const router = express.Router();
router.post('/',  createContactQuery);

module.exports = router;
