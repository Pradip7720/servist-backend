import express from 'express';
const { authenticateUser } = require("../../middleware/authorize");
const { setNotificationPref } = require("../controllers/notificationpref.controller");
const router = express.Router();

router.put('/', authenticateUser, setNotificationPref);



module.exports = router;