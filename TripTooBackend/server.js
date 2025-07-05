// triptoo-backend/server.js - Main entry point for the backend application

require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Import DB Connection (if using config/db.js) ---
const connectDB = require('./config/db'); // Assuming you have this file
connectDB(); // Call the DB connection function

const app = express();
const PORT = process.env.PORT || 5000; // Server port

// --- Import Route Modules ---
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes'); // <--- CRUCIAL: IMPORT PRODUCT ROUTES

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Use API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes); // <--- CRUCIAL: USE PRODUCT ROUTES

// --- Test Route ---
app.get('/', (req, res) => {
  res.send('Triptoo Backend API is running!');
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});