import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, EyeOff, Eye } from "lucide-react";
import "./Signup.css"; // Make sure this path matches your folder structure

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-content">
          <div className="logo-box">
            <span className="logo-text">FD</span>
          </div>

          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">
            Start your fitness journey with FitDash
          </p>

          <form className="form-group">
            <div className="input-block">
              <label htmlFor="name" className="input-label">
                Full Name
              </label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input-field password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-btn"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="helper-text">Must be at least 8 characters</p>
            </div>

            <div className="input-block">
              <label htmlFor="confirmPassword" className="input-label">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input-field password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="toggle-btn"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="checkbox-container">
              <input id="terms" type="checkbox" className="checkbox" />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the{" "}
                <a href="#" className="link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Create Account <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <div className="footer">
          <p className="footer-text">
            Already have an account?{" "}
            <a href="#" className="link">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
