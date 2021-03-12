const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js')
const passwordValidator = require('../middleware/passwordValidator')

router.post('/signup', passwordValidator,  userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;