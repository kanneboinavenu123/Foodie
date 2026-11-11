import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/app";

const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [form, setForm] = useState({
        username: "",
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

        try {
            const userData = JSON.parse(storedUser);

            setUser(userData);

            setForm({
                username: userData.username || "",
                email: userData.email || "",
                oldPassword: "",
                password: "",
            });

        } catch (error) {
            localStorage.removeItem("loggedInUser");
            navigate("/");
        }

}, [navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!user) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/auth/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        currentEmail: user.email,
                        username: form.username,
                        email: form.email,
                        oldPassword: form.oldPassword,
                        password: form.password
                        }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update profile"
                );
            }

            // Store only safe user details.
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );

            setUser(data.user);

            setForm({
                username: data.user.username,
                email: data.user.email,
                oldPassword: "",
                password: "",
            });

            setMessage("Profile updated successfully!");

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">

                <h1 className="profile-title">
                    Edit Profile
                </h1>

                <form
                    onSubmit={handleUpdate}
                    className="profile-form"
                >

                    <label className="label">
                        Username
                    </label>

                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="input"
                        required
                    />

                    <label className="label">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="input"
                        required
                    />

                    <label className="label">
                        Old Password
                    </label>

                    <input
                        type="password"
                        name="oldPassword"
                        value={form.oldPassword}
                        onChange={handleChange}
                        className="input"
                        required
                        autoComplete="current-password"
                    />

                    <label className="label">
                        New Password (Optional)
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="input"
                        placeholder="Enter new password"
                        autoComplete="new-password"
                    />

                    <button
                        type="submit"
                        className="profile-btn"
                    >
                        Save Changes
                    </button>

                    {message && (
                        <p className="profile-message">
                            {message}
                        </p>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Profile;