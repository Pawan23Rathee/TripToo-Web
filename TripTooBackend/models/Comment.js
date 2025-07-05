// triptoo-backend/models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user who commented
  productId: { type: String, required: true }, // Link to the product by its ID string
  comment: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5 }, // Optional: If you want to add star ratings
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);