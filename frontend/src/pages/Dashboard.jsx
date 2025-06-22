import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [inputBalance, setInputBalance] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBalance(res.data.balance);
        // Optional: Fetch income/expense later
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, []);

  const handleSaveBalance = async () => {
    try {
      const res = await API.post(
        "/user/balance",
        { balance: inputBalance },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
        <span className="menu-icon">☰</span>
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
        Add Transaction &gt;&gt;
      </button>
    </div>
  );
};

export default Dashboard;
