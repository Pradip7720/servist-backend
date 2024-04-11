import express from 'express';
import { getSpecialities } from '../controllers/post.controller';



const router = express.Router();
router.get('/', getSpecialities)


module.exports = router;
