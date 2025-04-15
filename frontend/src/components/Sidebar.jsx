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

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobile = () => {
    setMobile(!mobile);
  };

  const NavItem = ({ icon, label, active = false }) => (
    <li>
      <a
        href="#"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          active
            ? "bg-purple-100 text-purple-900"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {icon}
        {!collapsed && <span className="font-medium">{label}</span>}
      </a>
    </li>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobile}
        className="fixed z-40 bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg md:hidden"
      >
        {mobile ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          mobile ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 transform md:translate-x-0 transition-transform duration-300 ease-in-out
        ${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 md:relative`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and collapse button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">FD</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">FitDash</h1>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 md:block hidden"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-2">
            <ul className="space-y-1">
              <NavItem
                icon={<Home size={20} className="text-gray-600" />}
                label="Dashboard"
                active={true}
              />
              <NavItem
                icon={<Utensils size={20} className="text-gray-600" />}
                label="Meals"
              />
              <NavItem
                icon={<Dumbbell size={20} className="text-gray-600" />}
                label="Workouts"
              />
              <NavItem
                icon={<LineChart size={20} className="text-gray-600" />}
                label="Progress"
              />
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut size={20} className="text-gray-600" />
              {!collapsed && <span className="font-medium">Logout</span>}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
