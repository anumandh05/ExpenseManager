import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../../Styling/Login.css"; 
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.accessToken);
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
        <p onClick={() => navigate("/signup")}>Don't have an account? Sign Up</p>
      </form>
    </div>
  );
};

export default Login;
