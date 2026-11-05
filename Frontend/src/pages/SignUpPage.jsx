import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Password match check
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful ✅");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(data.message || "Registration failed ❌");
      }
    } catch (error) {
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="SignupSection">
      <div>
        <h1>Create New Account</h1>

        <form className="SignupForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <br />
          <a href="/">Already have an account? Login</a>
          <br /><br />

          <button type="submit">Signup</button>

          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
