// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoConnection = require('./config/mongodb');

// Routers
const authRouter = require('./routes/auth');
const transactionRouter = require('./routes/transactions');
const userRouter = require('./routes/user'); // ✅

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoConnection();

// Mount API routes
app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);
app.use('/users', userRouter); // ✅

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Expense Tracker Backend Running ✅' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
