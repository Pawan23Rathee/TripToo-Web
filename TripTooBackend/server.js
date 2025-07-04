// triptoo-backend/server.js - Simplified for Firebase Hybrid Auth

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Import Route Modules ---
const userRoutes = require('./routes/userRoutes'); // User profile routes
const orderRoutes = require('./routes/orderRoutes'); // Order routes

// --- Middleware ---
app.use(express.json());
app.use(cors()); // Enable CORS

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Use API Routes ---
app.use('/api/users', userRoutes); // User profile routes (no JWT protection on backend)
app.use('/api/orders', orderRoutes); // Order routes (no JWT protection on backend)

// --- Test Route ---
app.get('/', (req, res) => {
  res.send('Triptoo Backend API is running!');
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});