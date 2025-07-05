const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true }, // <--- ADD THIS
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional if using Firebase
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phone: { type: String },
  role: { type: String, default: 'user' },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
