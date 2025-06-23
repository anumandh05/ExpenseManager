// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // ✅

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authMiddleware, getUser); // ✅ Get logged-in user details

module.exports = router;
