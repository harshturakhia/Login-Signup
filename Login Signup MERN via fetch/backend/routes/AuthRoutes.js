const express = require('express')
const router = express.Router();
const AuthController = require('../Controller/AuthController')
const AuthValidation = require('../middleware/AuthValidation');

router.post('/login', AuthValidation.loginValidation, AuthController.login)

router.post('/signup', AuthValidation.signupValidation, AuthController.signup)


module.exports = router;