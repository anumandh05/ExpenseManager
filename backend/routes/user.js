const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

router.post('/balance', authMiddleware, async (req, res) => {
  try {
    const { balance } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { balance },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Balance updated", balance: user.balance });
  } catch (error) {
    console.error("Balance update error:", error);
    res.status(500).json({ error: "Failed to update balance" });
  }
});

module.exports = router;
