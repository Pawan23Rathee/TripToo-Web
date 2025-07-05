// triptoo-backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // <--- CRUCIAL IMPORT
const { protect } = require('../middleware/authMiddleware');

// Route to create a comment for a specific product (Protected)
// POST /api/products/:productId/comments
router.post('/:productId/comments', protect, productController.createComment); // <--- This is line 9

// Route to get all comments for a specific product (Public)
// GET /api/products/:productId/comments
router.get('/:productId/comments', productController.getCommentsByProduct);

module.exports = router;