import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../../Styling/RecentTransactions.css";

const RecentTransactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data.transactions.reverse());
    } catch (err) {
      alert("Failed to fetch transactions.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      try {
        await API.delete(`/transactions/${id}`);
        fetchTransactions();
      } catch (err) {
        alert("Failed to delete.");
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="recent-container">
      <h2>Recent Transactions</h2>
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((t) => (
            <div key={t._id} className="transaction-card">
              <div>
                <strong>{t.type.toUpperCase()}</strong>: ₹{t.amount}
                <br />
                <span className="desc">{t.description}</span>
                <br />
                <span className="date">Date: {new Date(t.date).toLocaleDateString()}</span>
              </div>
              <button onClick={() => handleDelete(t._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      <p onClick={() => navigate("/dashboard")} className="back-link">
        ← Back to Dashboard
      </p>
    </div>
  );
};

export default RecentTransactions;
