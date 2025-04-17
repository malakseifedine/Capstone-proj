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
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobile = () => {
    setMobile(!mobile);
  };

  const NavItem = ({ icon, label, active = false }) => (
    <li>
      <a href="#" className={`sidebar-nav-item ${active ? "active" : ""}`}>
        {icon}
        {!collapsed && <span className="nav-label">{label}</span>}
      </a>
    </li>
  );

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
              <NavItem icon={<Home size={20} />} label="Dashboard" active />
              <NavItem icon={<Utensils size={20} />} label="Meals" />
              <NavItem icon={<Dumbbell size={20} />} label="Workouts" />
              <NavItem icon={<LineChart size={20} />} label="Progress" />
            </ul>
          </nav>

          <div
            className="sidebar-footer"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("token");
            }}
          >
            <a href="#" className="sidebar-nav-item">
              <LogOut size={20} />
              {!collapsed && <span className="nav-label">Logout</span>}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
