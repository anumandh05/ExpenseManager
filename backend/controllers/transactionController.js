const Transaction = require('../models/transactionModel');

// Add new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    const newTransaction = new Transaction({
      userId: req.user.id,
      type,
      amount,
      description,
    });

    await newTransaction.save();
    res.status(201).send({ message: "Transaction added", transaction: newTransaction });
  } catch (error) {
    res.status(500).send({ error: "Failed to add transaction" });
  }
};

// Get all transactions for logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).send({ transactions });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch transactions" });
  }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.deleteOne({ _id: id, userId: req.user.id });
    res.status(200).send({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete transaction" });
  }
};
