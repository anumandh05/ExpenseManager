import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("Sending form data:", form); // 🔍 log form data
    const res = await API.post("/auth/signup", form);
    console.log("Signup success:", res.data); // 🔍 log response
    localStorage.setItem("token", res.data.accessToken);
    navigate("/");
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    alert("Signup failed. Try again.");
  }
};


  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Sign Up</button>
        <p onClick={() => navigate("/login")}>Already have an account? Login</p>
      </form>
    </div>
  );
};

export default Signup;
