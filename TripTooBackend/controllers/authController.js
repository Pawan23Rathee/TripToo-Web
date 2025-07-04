// triptoo-backend/controllers/authController.js
require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// REMOVED: const cloudinary = require("../config/cloudinary");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, address, phone } = req.body;
    // REMOVED: const avatarFile = req.file;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // REMOVED: Avatar upload logic
    // let avatarUrl = "";
    // if (avatarFile) { ... }

    const user = await new User({
      email,
      password,
      firstName,
      lastName,
      address,
      phone,
      // REMOVED: avatar: avatarUrl,
      role: 'user',
    }).save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        // REMOVED: avatar: user.avatar,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error('Error during user signup:', err);
    res.status(500).json({ message: err.message || "Server error during signup" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id, user.role);

    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      // REMOVED: avatar: user.avatar,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ message: err.message || "Server error during login" });
  }
};

// ... (forgotPassword and resetPassword functions remain unchanged) ...

exports.forgotPassword = async (req, res) => { /* ... */ };
exports.resetPassword = async (req, res) => { /* ... */ };