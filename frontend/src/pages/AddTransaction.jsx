// src/pages/AddTransaction.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../../Styling/AddTransaction.css"; 

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    type: "expense",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/transactions", transaction);
      alert("Transaction added!");
      navigate("/dashboard"); // ✅ go to dashboard after adding
    } catch (err) {
      alert("Failed to add transaction.");
      console.error(err);
    }
  };

  return (
    <div className="add-container">
      <form onSubmit={handleSubmit} className="add-form">
        <h2>Add Transaction</h2>

        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
          required
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={transaction.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Add ➜</button>
        <p onClick={() => navigate("/dashboard")} className="back-link">
          ← Back to Dashboard
        </p>
      </form>
    </div>
  );
};

export default AddTransaction;
