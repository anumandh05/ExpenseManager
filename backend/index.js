require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoConnection = require('./config/mongodb');

// Routes
const authRouter = require('./routes/auth');
const transactionRouter = require('./routes/transactions');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoConnection();

// API Routes
app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Expense Tracker Backend Running ✅' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
