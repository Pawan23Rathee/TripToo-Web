// triptoo-backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Import Route Modules ---
// Make sure these paths are correct relative to server.js
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Middleware
app.use(express.json());
app.use(cors()); // CORS should be enabled here

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Use API Routes ---
// Assign imported routers to specific base paths
app.use('/api/users', userRoutes); // All routes defined in userRoutes.js will be under /api/users
app.use('/api/orders', orderRoutes); // All routes defined in orderRoutes.js will be under /api/orders

// Test Route for root URL
app.get('/', (req, res) => {
  res.send('Triptoo Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});