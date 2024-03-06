import express from 'express';
import * as authController from '../controllers/auth.controller';
import { loginValidate, userRegistrationValidate } from '../validators/auth.validator';

const router = express.Router();

router.post('/login', loginValidate, authController.login);
router.post('/register', userRegistrationValidate, authController.register);
router.post('/change-password', authController.changePassword);

module.exports = router;
