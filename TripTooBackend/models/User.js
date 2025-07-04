// triptoo-backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// --- IMPORTANT: Use module.exports for Node.js CommonJS modules ---
module.exports = mongoose.model('User', UserSchema);