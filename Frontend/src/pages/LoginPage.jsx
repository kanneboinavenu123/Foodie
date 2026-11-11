import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/app";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful ✅");
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        navigate("/home");
      } else {
        setMessage(data.message || "Login failed ❌");
      }
    } catch (error) {
      setMessage("Server error ❌");
    }
  };


  return (
    <>
      <div className="loginSection">
        <div>
          <h1>LOGIN FORM</h1>
          <form className="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="identifier">Email or Username:</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              autoComplete="username"
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <br />
            <a href="/signup">Sign up?</a>
            <br /> <br />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default LoginPage;


