// triptoo-backend/middleware/authMiddleware.js - JWT Authentication Middleware

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Not authorized, token failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else { // Added else block to handle no token more gracefully
      res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };