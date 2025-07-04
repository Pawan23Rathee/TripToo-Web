// triptoo-backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model

// Route to create/update user profile (POST /api/users)
router.post('/', async (req, res) => {
  const { firebaseUid, email, firstName, lastName, address, phone } = req.body;

  try {
    let user = await User.findOne({ firebaseUid });
    if (user) {
      // Update existing user profile
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      user.email = email || user.email;
    } else {
      // Create new user profile
      user = new User({ firebaseUid, email, firstName, lastName, address, phone });
    }
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error('Error saving user:', err);
    if (err.code === 11000) {
        res.status(409).json({ message: 'User with this ID or email already exists.', error: err.message });
    } else {
        res.status(500).json({ message: 'Error saving user profile', error: err.message });
    }
  }
});

// Route to get user profile (GET /api/users/:firebaseUid)
router.get('/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
});

module.exports = router;