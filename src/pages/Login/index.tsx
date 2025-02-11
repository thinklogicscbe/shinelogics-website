import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting to home page
import { LoginSignupContainer } from "./style"; // Importing the CSS file
import { loginUser } from "../API/LoginUser";

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

  const result = await loginUser(email, password);
  console.log(result);

  if (result.success) {
    localStorage.setItem("user", JSON.stringify(result.user));
    console.log(result.user);

    navigate("/admin"); // Correct spelling
  } else {
    setErrorMessage(result.message || "Invalid login credentials");
  }
};
  return (
    <LoginSignupContainer>
      <div className="container">
        <div className="image-section">
          <img src="/AI-image-(1).jpg" alt="Placeholder" />
        </div>
        <div className="auth-container">
          <div className="auth-box">
            <h2>Login</h2>
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </LoginSignupContainer>
  );
};

export default Login;
