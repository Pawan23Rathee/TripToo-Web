// triptoo-backend/routes/userRoutes.js
const express = require('express');
const router = express.Router(); // Create an Express router
const User = require('../models/User'); // Import the User model

// Route to create/update user profile
router.post('/', async (req, res) => { // This will become /api/users because of server.js setup
  const { firebaseUid, email, firstName, lastName, address, phone } = req.body;
  try {
    let user = await User.findOne({ firebaseUid });
    if (user) { /* ... update user ... */ }
    else { /* ... create user ... */ }
    await user.save();
    res.status(200).json(user);
  } catch (err) { /* ... error handling ... */ }
});

// Route to get user profile
router.get('/:firebaseUid', async (req, res) => { // This will become /api/users/:firebaseUid
    try { /* ... fetch user ... */ }
    catch (err) { /* ... error handling ... */ }
});

module.exports = router; // Export the router