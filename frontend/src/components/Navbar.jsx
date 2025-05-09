import React from "react";
import { useEffect, useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { authService } from "../services/api";

import "../styles/Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data
        const userResponse = await authService.getCurrentUser();
        setUser(userResponse.data);

        // const workoutsResponse = await workoutService.getWorkouts();
        // setWorkouts(workoutsResponse.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      }
    };

    fetchUserData(); // Don't forget to call the async function inside useEffect
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="search-section">
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
        </div>

        <div className="navbar-right">
          <button className="notification-btn">
            <Bell size={20} className="bell-icon" />
          </button>
          <div className="user-info">
            <div className="user-avatar">
              <User size={18} />
            </div>
            <span className="username">{user ? user.name : "user"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
