const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, description } = req.body;
    const userId = req.user.id;

    const transaction = new Transaction({
      userId,
      type,
      amount,
      description,
    });
    await transaction.save();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (type === "income") {
      user.balance += Number(amount);
    } else if (type === "expense") {
      user.balance -= Number(amount);
    }

    await user.save();

    res.status(201).json({ message: "Transaction added", transaction });
  } catch (err) {
    console.error("Add Transaction Error:", err);
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.status(200).json({ transactions });
  } catch (err) {
    console.error("Get Transactions Error:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    
    const user = await User.findById(transaction.userId);
    if (transaction.type === "income") {
      user.balance -= Number(transaction.amount);
    } else {
      user.balance += Number(transaction.amount);
    }

    await user.save();
    await transaction.deleteOne();

    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("Delete Transaction Error:", err);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
