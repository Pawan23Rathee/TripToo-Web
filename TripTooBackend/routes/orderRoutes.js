// triptoo-backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import Order model
const User = require('../models/User'); // <--- IMPORTANT: Import User model

// Route to create a new order (POST /api/orders)
router.post('/', async (req, res) => {
  const { firebaseUid, orderId, total, status, items } = req.body;
  
  try {
    // Find the user's MongoDB _id using their firebaseUid
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found for this order. Please ensure user profile exists.' });
    }

    // Use the MongoDB _id of the user
    const newOrder = new Order({ userId: user._id, orderId, total, status, items });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

// Route to get all orders for a specific user (GET /api/orders/:firebaseUid)
router.get('/:firebaseUid', async (req, res) => {
  const firebaseUid = req.params.firebaseUid;

  try {
    // Find the user's MongoDB _id
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found, cannot fetch orders.' });
    }

    // Find orders by the user's MongoDB _id and populate the 'userId' field
    // .populate('userId') will replace the userId ObjectId with the actual User document
    const orders = await Order.find({ userId: user._id })
                              .sort({ date: -1 })
                              .populate('userId', 'email firstName lastName'); // Only include email, firstName, lastName from User
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

module.exports = router;