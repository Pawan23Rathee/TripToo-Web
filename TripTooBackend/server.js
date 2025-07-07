// triptoo-backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const verifyFirebaseToken = require('./middleware/verifyFirebaseToken');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow only trusted frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://trip-too-web-ddda.vercel.app',
  'https://trip-too-web-lxrt.vercel.app', // ✅ Add the correct domain from your screenshot
  
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('✅ Triptoo Backend API is running!');
});

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error('🔥 Uncaught error:', err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});


app.use('/api/orders', verifyFirebaseToken, require('./routes/orderRoutes'));

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
