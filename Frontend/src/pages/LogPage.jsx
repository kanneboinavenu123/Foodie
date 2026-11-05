import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogPage = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/logout"); 
    }

 
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
  localStorage.removeItem("loggedInUser");
  navigate("/", { replace: true });
};


  const handleProfile = () => {
    navigate("/profile");  };



  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>🎉 Welcome {user?.email.split("@")[0]}!</h1>
        <p className="time-text">
          {currentTime.toLocaleDateString()} -{" "}
          {currentTime.toLocaleTimeString()}
        </p>

        {user ? (
          <div className="user-info">
            <p><b>Email:</b> {user.email}</p>
            <p><b>User Name:</b> {user.username}</p>

            <div className="button-group">
              <button onClick={handleProfile} className="action-button">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
            
          </div>
        ) : (
          <p className="error-text">No user details found</p>
        )}
      </div>
    </div>
  );
};

export default LogPage;
