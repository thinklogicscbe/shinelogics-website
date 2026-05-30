import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting to home page
import { LoginSignupContainer } from "./style"; // Importing the CSS file
import { loginUser } from "../API/LoginUser";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const loginEmployee = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailId: email, password }),
    });
    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, user: result.result?.user };
    }

    return {
      success: false,
      message: result.message || "Invalid login credentials",
    };
  } catch (error) {
    return { success: false, message: "Server error. Please try again." };
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState(""); // To track the email input
  const [password, setPassword] = useState(""); // To track the password input
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const navigate = useNavigate(); // Hook for redirecting

  useEffect(() => {
    // Ensure fields are cleared on page load
    setEmail("");
    setPassword("");
  }, []);

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const adminResult = await loginUser(email, password);

    if (adminResult.success) {
      localStorage.removeItem("employee");
      localStorage.setItem("user", JSON.stringify(adminResult.user));
      navigate("/SideBar");
      window.location.reload();
      return;
    }

    const employeeResult = await loginEmployee(email, password);

    if (employeeResult.success) {
      localStorage.removeItem("user");
      localStorage.setItem("employee", JSON.stringify(employeeResult.user));
      navigate("/employee/dashboard");
      window.location.reload();
      return;
    }

    setErrorMessage(
      employeeResult.message ||
        adminResult.message ||
        "Invalid login credentials",
    );
  };

  return (
    <LoginSignupContainer>
      <div className="container">
        <div className="image-section">
          <img src="/AI-image-(1).jpg" alt="Placeholder" />
        </div>
        <div className="auth-container">
          <div className="auth-box">
            <h2>Login Portal</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} autoComplete="off"> {/* Disable form-level autocomplete */}
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email-dummy" /* Dummy name */
                  placeholder="Enter your email"
                  autoComplete="new-email" /* Ensure no browser autofill */
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password-dummy" /* Dummy name */
                  placeholder="Enter your password"
                  autoComplete="new-password" /* Ensure no browser autofill */
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="auth-button">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </LoginSignupContainer>
  );
};

export default Login;
