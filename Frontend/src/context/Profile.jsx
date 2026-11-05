import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
  });
  const [message, setMessage] = useState("");

 useEffect(() => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) {
    navigate("/");
    return;
  }

  const userData = JSON.parse(storedUser);
  setUser(userData);

  setForm({
    name: userData.name,
    email: userData.email,
    oldPassword: "",
    password: "",
  });
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value,});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (form.oldPassword !== user.password) {
      setMessage("❌ Old password is incorrect");
      return;
    }

    try {
      const updatedData = {
        name: form.name,
        email: form.email,
        password: form.password ? form.password : user.password,
      };

      const response = await fetch(
        `http://localhost:3000/Details/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      setMessage("✔ Profile updated successfully!");
      setTimeout(() => navigate("/home"), 1500);

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Edit Profile</h1>

        <form onSubmit={handleUpdate} className="profile-form">

          <label className="label">Name</label>
          <input type="text" name="name" value={form.name}
            onChange={handleChange} className="input" />

          <label className="label">Email</label>
          <input type="email" name="email" value={form.email}
            onChange={handleChange} className="input" />

          {/* 🔐 OLD PASSWORD */}
          <label className="label">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="input"
            required
          />

          {/* 🔑 NEW PASSWORD */}
          <label className="label">New Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="input"
            placeholder="Enter new password"
            required
            autoComplete="new-password"
          />

          <button type="submit" className="profile-btn">Save Changes</button>

          {message && <p className="profile-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
