import express from 'express';
import * as authController from '../controllers/auth/auth.controller';
import { loginValidate, userRegistrationValidate } from '../controllers/auth/auth.validator';

const router = express.Router();

router.post('/login', loginValidate, authController.login);
router.post('/register', userRegistrationValidate, authController.register);

module.exports = router;
