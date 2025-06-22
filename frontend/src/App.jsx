import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import AddTransaction from "./pages/AddTransaction";
import RecentTransactions from "./pages/RecentTransactions";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/recent" element={<RecentTransactions />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
