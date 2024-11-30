const express = require('express');
const { loginAccount, registerAccount, resetPassword } = require('../controllers/authController');
const router = express.Router();
const Account = require('../models/Account');

// login
router.post('/login', loginAccount);

// register
router.post('/register', registerAccount)

// reset password
router.put('/reset-password', resetPassword);

module.exports = router;