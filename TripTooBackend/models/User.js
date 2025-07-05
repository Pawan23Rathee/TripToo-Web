const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Required for password comparison

const userSchema = new mongoose.Schema({
  // firebaseUid: { type: String, required: true, unique: true }, // For Firebase users
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Firebase Auth
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phone: { type: String },
  role: { type: String, default: 'user' },
});

// ✅ Method to compare password for traditional auth
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false; // Skip if no local password (Firebase users)
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
