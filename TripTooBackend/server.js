// triptoo-backend/server.js - Main entry point for the backend application (Full Custom JWT Auth Version)

require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose'); // Keep mongoose import if models use it directly in server.js, otherwise can be removed
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000; // Server port

// --- Import Route Modules ---
// These require calls are for the files in the 'routes' folder
const authRoutes = require('./routes/authRoutes'); // <--- IMPORTANT: For signup/login
const userRoutes = require('./routes/userRoutes'); // For user profile (protected)
const orderRoutes = require('./routes/orderRoutes'); // For orders (protected)

// --- Middleware ---
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all origins (for development and deployment)

// --- MongoDB Connection ---
// This part remains here directly, or you can use your connectDB() from config/db.js
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Use API Routes ---
// Assign imported routers to base paths
app.use('/api/auth', authRoutes); // <--- IMPORTANT: Authentication routes (signup, login)
app.use('/api/users', userRoutes); // User profile routes (will be protected)
app.use('/api/orders', orderRoutes); // Order routes (will be protected)

// --- Test Route ---
// Basic route to confirm server is running at root URL
app.get('/', (req, res) => {
  res.send('Triptoo Backend API is running!');
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});