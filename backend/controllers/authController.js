// backend/controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (emailExists || usernameExists) {
      return res.status(403).send({ error: 'Username or Email already registered' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRY || 3}d`,
    });

    res.status(201).send({ accessToken: token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send({ error: 'Signup failed' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser || password !== existingUser.password) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const payload = { id: existingUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRY || 3}d`,
    });

    res.status(200).send({ accessToken: token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ error: 'Login failed' });
  }
};

// ✅ Get User Details
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username email balance");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ error: "Failed to get user" });
  }
};
