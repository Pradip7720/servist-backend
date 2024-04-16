import express from 'express';
import { createContactQuery } from '../controllers/contactus.controller';
import multer from 'multer';
import { limiter } from '../helpers/rate-limiter.helper';

const upload = multer();

const router = express.Router();
router.post('/', limiter, upload.none(), createContactQuery);


module.exports = router;
