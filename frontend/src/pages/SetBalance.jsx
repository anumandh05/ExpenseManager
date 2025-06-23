// src/pages/SetBalance.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const SetBalance = () => {
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/users/balance",
        { balance },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Balance saved:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to save balance:", err);
      alert("Could not save balance. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Set Initial Balance</h2>
        <input
          type="number"
          placeholder="Enter Bank Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />
        <button type="submit">Save & Continue</button>
      </form>
    </div>
  );
};

export default SetBalance;
