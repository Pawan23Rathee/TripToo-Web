// triptoo-backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // --- IMPORTANT: Correct relative path to Order model

// Route to create a new order (POST /api/orders)
router.post('/', async (req, res) => {
  const { firebaseUid, orderId, total, status, items } = req.body;
  try {
    const newOrder = new Order({ firebaseUid, orderId, total, status, items });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

// Route to get all orders for a specific user (GET /api/orders/:firebaseUid)
router.get('/:firebaseUid', async (req, res) => {
  try {
    const orders = await Order.find({ firebaseUid: req.params.firebaseUid }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// --- IMPORTANT: Use module.exports to export the router ---
module.exports = router;