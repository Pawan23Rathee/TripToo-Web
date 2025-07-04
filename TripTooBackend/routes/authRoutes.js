// triptoo-backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// REMOVED: const upload = require('../middleware/uploadMiddleware'); // No longer needed

// --- Register User (Signup) ---
// Route: POST /api/auth/signup (no file upload)
router.post('/signup', authController.register); // REMOVED: upload.single('avatar')

// ... (other routes like login, forgot-password, reset-password remain unchanged) ...

router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;