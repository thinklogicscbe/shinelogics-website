import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // For redirecting to home page
import { LoginSignupContainer } from "./style"; // Importing the CSS file

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(""); // To track the email input
  const [password, setPassword] = useState(""); // To track the password input
  const [name, setName] = useState(""); // To track the name input
  const history = useHistory(); // Hook for redirecting

  // Check if the email and password are stored in localStorage for autofill
  useEffect(() => {
    if (isLogin) {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (storedEmail) {
        setEmail(storedEmail); // Autofill the email if available
      }
      if (storedPassword) {
        setPassword(storedPassword); // Autofill the password if available
      }
    }
  }, [isLogin]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Compare entered email and password with stored data
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (storedEmail === email && storedPassword === password) {
        // Redirect to home page
        history.push("/home");
      } else {
        alert("Invalid login credentials");
      }
    } else {
      // Store signup data in localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("name", name);

      // Redirect to login page after successful signup
      setIsLogin(true);
    }
  };

  // Clear email and password when switching between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    if (isLogin) {
      setEmail(""); // Clear email for signup mode
      setPassword(""); // Clear password for signup mode
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
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="auth-button">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                onClick={toggleAuthMode}
                className="toggle-link"
              >
                {isLogin ? " Sign Up" : " Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </LoginSignupContainer>
  );
};

export default Login;
