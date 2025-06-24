import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../../Styling/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [inputBalance, setInputBalance] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await API.get("/auth/user");
        setBalance(resUser.data.balance || null);

        const resTransactions = await API.get("/transactions");
        const allTransactions = resTransactions.data.transactions || [];

        const recent = allTransactions.reverse().slice(0, 3);
        setRecentTransactions(recent);

        const incomeTotal = allTransactions
          .filter((t) => t.type === "income")
          .reduce((acc, t) => acc + Number(t.amount), 0);
        const expenseTotal = allTransactions
          .filter((t) => t.type === "expense")
          .reduce((acc, t) => acc + Number(t.amount), 0);

        setIncome(incomeTotal);
        setExpenses(expenseTotal);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSaveBalance = async () => {
    try {
      const res = await API.post("/users/balance", { balance: inputBalance });
      setBalance(res.data.balance);
    } catch (error) {
      alert("Failed to save balance");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (balance === null) {
    return (
      <div className="dashboard-container">
        <h2>Enter your Bank Balance</h2>
        <div className="balance-section">
          <label htmlFor="balance">Balance:</label>
          <input
            type="number"
            id="balance"
            value={inputBalance}
            onChange={(e) => setInputBalance(e.target.value)}
            placeholder="₹"
          />
        </div>
        <button onClick={handleSaveBalance}>Save Balance</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Expense Tracker</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <div className="summary-section">
        <p><strong>Balance:</strong> ₹{balance}</p>
        <p><strong>Income:</strong> ₹{income}</p>
        <p><strong>Expenses:</strong> ₹{expenses}</p>
      </div>

      <button className="add-btn" onClick={() => navigate("/add")}>
        Add Transaction →
      </button>

      <div className="recent-preview">
        <h3>Recent Transactions</h3>
        {recentTransactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {recentTransactions.map((t) => (
              <li key={t._id}>
                <strong>{t.type.toUpperCase()}</strong> — ₹{t.amount} <br />
                <span style={{ fontSize: "0.9rem", color: "#555" }}>{t.description}</span>
              </li>
            ))}
          </ul>
        )}
        <button className="see-all-btn" onClick={() => navigate("/recent")}>
          See All →
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
