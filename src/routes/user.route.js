import express from 'express';
import * as userController from '../controllers/user/user.controller';


const router = express.Router();

router.get('/', (req, res) => {
    res.send("Helllo");
});
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
