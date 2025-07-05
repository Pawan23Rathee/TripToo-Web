const express = require('express');
const router = express.Router();
const User = require('../models/User');

// --- Create User Profile from Firebase Auth (POST /users)
router.post('/', async (req, res) => {
  try {
    const { firebaseUid, email, firstName, lastName, address, phone } = req.body;

    if (!firebaseUid || !email) {
      return res.status(400).json({ message: "firebaseUid and email are required" });
    }

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = await User.create({ firebaseUid, email, firstName, lastName, address, phone });
    } else {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
