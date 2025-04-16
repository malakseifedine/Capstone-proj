import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-main-wrapper">
        <Navbar />
        <main className="layout-main-content">{children}</main>
      </div>
    </div>
  );
}
