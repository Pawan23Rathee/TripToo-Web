const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users - Create or update Firebase-authenticated user
router.post('/', async (req, res) => {
  const { firebaseUid, email, firstName, lastName, address, phone } = req.body;

  // ✅ Strong validation to block empty or null UID
  if (!firebaseUid || firebaseUid === 'null' || firebaseUid === '') {
    return res.status(400).json({ message: 'Invalid firebaseUid. Cannot be null or empty.' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    let user = await User.findOne({ firebaseUid });

    if (user) {
      // Update existing user
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        firebaseUid,
        email,
        firstName,
        lastName,
        address,
        phone,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error saving Firebase user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
