const Comment = require('../models/Comment');
const User = require('../models/User'); // To populate user info

// Create a new comment (POST /api/products/:productId/comments)
exports.createComment = async (req, res) => {
  const { productId } = req.params;
  const { comment, rating } = req.body;

  // Ensure protect middleware is used, so req.user is available
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  if (!comment || comment.trim() === '') {
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

    // Populate user details (excluding avatar if not present in schema)
    const populatedComment = await Comment.findById(newComment._id)
      .populate('userId', 'email firstName lastName'); // Remove avatar unless added to schema

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error creating comment', error: error.message });
  }
};

// Get all comments for a product (GET /api/products/:productId/comments)
exports.getCommentsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const comments = await Comment.find({ productId })
      .sort({ createdAt: -1 })
      .populate('userId', 'email firstName lastName'); // Remove avatar if not in schema

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error fetching comments', error: error.message });
  }
};
