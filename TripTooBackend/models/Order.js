// triptoo-backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
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
  shippingInfo: {
    fullName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String,
  },
  paymentMethod: {
    type: String,
    last4: String,
    expiry: String,
    nameOnCard: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Correct export
module.exports = mongoose.model('Order', orderSchema);
