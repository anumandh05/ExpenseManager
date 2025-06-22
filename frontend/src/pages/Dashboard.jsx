import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Expense Tracker</h1>
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/add")}>Add Transaction</button>
        <button onClick={() => navigate("/recent")}>View Recent</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
