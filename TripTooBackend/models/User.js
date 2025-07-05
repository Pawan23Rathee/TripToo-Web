const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Required for password comparison

const user = await new User({
  firebaseUid: `dummy-${Date.now()}`, // ✅ Add this line temporarily
  email,
  password: hashedPassword,
  firstName,
  lastName,
  address,
  phone,
  role: 'user',
}).save();


// ✅ Method to compare password for traditional auth
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false; // Skip if no local password (Firebase users)
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
