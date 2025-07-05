// triptoo-backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Correct export syntax — this is CRUCIAL
module.exports = mongoose.model('Order', orderSchema);
