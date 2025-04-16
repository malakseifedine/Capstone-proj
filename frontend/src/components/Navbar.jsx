import React from "react";
import { Bell, Search, User } from "lucide-react";
import "../styles/Navbar.css";

export default function Navbar() {
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
            <span className="username">Sarah</span>
          </div>
        </div>
      </div>
    </header>
  );
}
