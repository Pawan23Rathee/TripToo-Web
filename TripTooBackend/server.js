// triptoo-backend/server.js

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // --- IMPORTANT: Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000; // Backend will run on port 5000

// --- Middleware ---
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // --- IMPORTANT: Enable CORS for all origins (for development). THIS MUST BE BEFORE YOUR ROUTES.

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Define Mongoose Schemas and Models ---

// User Schema (to store additional user profile data linked to Firebase UID)
const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true }, // Link to Firebase User ID
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

// Order Schema
const OrderSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true }, // Link to Firebase User ID of the buyer
  orderId: { type: String, required: true, unique: true }, // Unique ID for the order
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] },
  items: [ // Array of items in the order
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String }
    }
  ]
});
const Order = mongoose.model('Order', OrderSchema);

// --- API Routes ---

// Test Route
app.get('/', (req, res) => {
  res.send('Triptoo Backend API is running!');
});

// Route to create/update user profile (after Firebase signup/login)
app.post('/api/users', async (req, res) => {
  const { firebaseUid, email, firstName, lastName, address, phone } = req.body;
  try {
    let user = await User.findOne({ firebaseUid });
    if (user) {
      // Update existing user profile
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      user.email = email || user.email; // Ensure email update is also considered
    } else {
      // Create new user profile
      user = new User({ firebaseUid, email, firstName, lastName, address, phone });
    }
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error('Error saving user:', err);
    // Check if it's a duplicate key error (e.g., trying to create user with existing Firebase UID or email if not handled by findOne)
    if (err.code === 11000) { // MongoDB duplicate key error code
        res.status(409).json({ message: 'User with this ID or email already exists.', error: err.message });
    } else {
        res.status(500).json({ message: 'Error saving user profile', error: err.message });
    }
  }
});

// Route to get user profile
app.get('/api/users/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
});


// Route to create a new order
app.post('/api/orders', async (req, res) => {
  const { firebaseUid, orderId, total, status, items } = req.body;
  try {
    const newOrder = new Order({ firebaseUid, orderId, total, status, items });
    await newOrder.save();
    res.status(201).json(newOrder); // 201 Created
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

// Route to get all orders for a specific user
app.get('/api/orders/:firebaseUid', async (req, res) => {
  try {
    const orders = await Order.find({ firebaseUid: req.params.firebaseUid }).sort({ date: -1 }); // Sort by newest first
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});