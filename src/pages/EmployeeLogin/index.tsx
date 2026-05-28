import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeLoginContainer } from "./style";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

const EmployeeLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/employees/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId: email, password }),
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        // ✅ change result.data?.user to result.result?.user
        localStorage.setItem("employee", JSON.stringify(result.result?.user));
        navigate("/employee/dashboard");
        window.location.reload();
      } else {
        setErrorMessage(result.message || "Invalid login credentials");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
    }
  };

  return (
    <EmployeeLoginContainer>
      <div className="container">
        <div className="image-section">
          <img src="/AI-image-(1).jpg" alt="Placeholder" />
        </div>
        <div className="auth-container">
          <div className="auth-box">
            <h2>Employee Login</h2>
            {errorMessage && (
              <p style={{ color: "red", fontSize: "13px", marginBottom: "10px" }}>
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="input-group">
                <label htmlFor="emp-email">Email</label>
                <input
                  type="email"
                  id="emp-email"
                  name="emp-email-dummy"
                  placeholder="Enter your email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="emp-password">Password</label>
                <input
                  type="password"
                  id="emp-password"
                  name="emp-password-dummy"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="auth-button">
                Login
              </button>
            </form>
            <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#555" }}>
              Admin?{" "}
              <span
                style={{ color: "#007bff", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </EmployeeLoginContainer>
  );
};

export default EmployeeLogin;