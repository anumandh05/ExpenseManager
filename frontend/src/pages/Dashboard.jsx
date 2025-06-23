import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../../Styling/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await API.get("/auth/user");
        setBalance(res.data.balance);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
