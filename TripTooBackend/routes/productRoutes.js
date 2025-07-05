// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { createComment, getCommentsByProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:productId/comments', protect, createComment);
router.get('/:productId/comments', getCommentsByProduct);

module.exports = router;
