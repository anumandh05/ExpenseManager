const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, addTransaction);
router.get('/', authenticate, getTransactions);
router.delete('/:id', authenticate, deleteTransaction);

module.exports = router;
