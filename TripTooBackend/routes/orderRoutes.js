// triptoo-backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create new order — POST /api/orders
router.post('/', async (req, res) => {
  try {
    const {
      firebaseUid,
      orderId,
      total,
      status,
      items,
      shippingInfo,
      paymentMethod
    } = req.body;

    if (!firebaseUid || !orderId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing order data' });
    }

    const newOrder = new Order({
      firebaseUid,
      orderId,
      total,
      status,
      items,
      shippingInfo,
      paymentMethod
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order created', orderId: savedOrder.orderId });
  } catch (err) {
    console.error('❌ Error creating order:', err.message);
    res.status(500).json({ message: 'Server error while creating order' });
  }
});

// Get all orders for a user — GET /api/orders/:firebaseUid
router.get('/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;

  try {
    const orders = await Order.find({ firebaseUid }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('❌ Error fetching orders:', err.message);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
});

module.exports = router;
