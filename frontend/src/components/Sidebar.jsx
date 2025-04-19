import React, { useState } from "react";
import {
  Home,
  Utensils,
  Dumbbell,
  LineChart,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobile = () => {
    setMobile(!mobile);
  };

  const NavItem = ({ icon, label, to }) => {
    const isActive = location.pathname === to;

    return (
      <li>
        <Link
          to={to}
          className={`sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          {icon}
          {!collapsed && <span className="nav-label">{label}</span>}
        </Link>
      </li>
    );
  };

  return (
    <>
      <button onClick={toggleMobile} className="sidebar-mobile-toggle">
        {mobile ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          mobile ? "mobile-open" : "mobile-closed"
        }`}
      >
        <div className="sidebar-inner">
          <div className="sidebar-header">
            {!collapsed && (
              <div className="sidebar-logo">
                <div className="logo-icon">FD</div>
                <h1 className="logo-text">FitDash</h1>
              </div>
            )}
            <button onClick={toggleSidebar} className="collapse-toggle">
              <Menu size={20} />
            </button>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <NavItem
                icon={<Home size={20} />}
                label="Dashboard"
                to="/homepage"
              />
              <NavItem
                icon={<Utensils size={20} />}
                label="Meals"
                to="/meals"
              />
              <NavItem
                icon={<Dumbbell size={20} />}
                label="Workouts"
                to="/workouts"
              />
              <NavItem
                icon={<LineChart size={20} />}
                label="Progress"
                to="/progress"
              />
            </ul>
          </nav>

          <div
            className="sidebar-footer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <div className="sidebar-nav-item">
              <LogOut size={20} />
              {!collapsed && <span className="nav-label">Logout</span>}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
