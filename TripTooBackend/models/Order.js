// triptoo-backend/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String }
    }
  ]
});

// --- IMPORTANT: Use module.exports for Node.js CommonJS modules ---
module.exports = mongoose.model('Order', OrderSchema);