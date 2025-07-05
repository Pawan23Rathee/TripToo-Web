const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup route (without avatar upload)
router.post('/signup', authController.register);

// Other auth routes
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
