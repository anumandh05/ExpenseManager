import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>EXPENSE TRACKER</h1>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        <p>
          Already have an account?{" "}
          <span className="signin-link" onClick={() => navigate("/login")}>
            [Sign In]
          </span>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
