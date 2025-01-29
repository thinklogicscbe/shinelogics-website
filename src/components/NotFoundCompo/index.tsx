
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1><span style={{color:"red"}}>404</span><br />Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate("/home")} style={{backgroundColor:" rgb(31, 101, 206)",color:"white",fontWeight:"bold"}}>Go Home</button>
    </div>
  );
};

export default NotFoundPage;
