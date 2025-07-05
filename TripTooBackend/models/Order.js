const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
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

// ✅ This export must be correct for `Order.find()` to work
module.exports = mongoose.model('Order', OrderSchema);
