const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Handle Sign Up
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    req.session.userId = user._id;
    res.json({ success: true, message: "Signup successful", email: user.email});
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Signup failed", error: err });
  }
});

// Handle Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

    req.session.userId = user._id;
    res.json({ success: true, message: "Login successful", email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login error" });
  }
});

// Handle Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ success: true, message: "Logged out" });
  });
});

module.exports = router;
