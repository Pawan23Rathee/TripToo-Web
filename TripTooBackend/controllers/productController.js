// triptoo-backend/controllers/productController.js
const Comment = require('../models/Comment');
const User = require('../models/User'); // Import User model (for optional user data population)

// Create a new comment (POST /api/products/:productId/comments)
exports.createComment = async (req, res) => { // <--- CRUCIAL: Ensure it's 'exports.createComment = async ...'
  const { productId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.user._id; // User ID from the JWT (protect middleware)

  if (!comment) {
    return res.status(400).json({ message: 'Comment text is required.' });
  }

  try {
    const newComment = new Comment({
      userId,
      productId,
      comment,
      rating: rating || null,
    });

    await newComment.save();

    const populatedComment = await Comment.findById(newComment._id)
                                          .populate('userId', 'email firstName lastName avatar');

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error creating comment', error: error.message });
  }
};

// Get all comments for a specific product (GET /api/products/:productId/comments)
exports.getCommentsByProduct = async (req, res) => { // <--- CRUCIAL: Ensure it's 'exports.getCommentsByProduct = async ...'
  const { productId } = req.params;

  try {
    const comments = await Comment.find({ productId })
                                  .sort({ createdAt: -1 })
                                  .populate('userId', 'email firstName lastName avatar');

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error fetching comments', error: error.message });
  }
};