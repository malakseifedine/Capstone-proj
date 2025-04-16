import React from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import "../styles/Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-content">
          <div className="login-logo">
            <span>FD</span>
          </div>

          <h1 className="login-title">Welcome back!</h1>
          <p className="login-subtitle">
            Sign in to continue your fitness journey
          </p>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <a href="#" className="form-link">
                  Forgot password?
                </a>
              </div>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="login-button">
              Sign In <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <div className="login-footer">
          <p className="footer-text">
            Don't have an account?{" "}
            <a href="#" className="form-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
