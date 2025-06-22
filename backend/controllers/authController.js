const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (emailExists || usernameExists) {
      return res.status(403).send({ error: 'Username or Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY * 24 * 60 * 60,
    });

    res.status(201).send({ message: 'Signup successful', accessToken: token, user: payload });
  } catch (error) {
    res.status(500).send({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const payload = { id: existingUser._id, username: existingUser.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY * 24 * 60 * 60,
    });

    res.status(200).send({ message: 'Login successful', accessToken: token, user: payload });
  } catch (error) {
    res.status(500).send({ error: 'Login failed' });
  }
};
