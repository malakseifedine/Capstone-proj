import React, { useEffect, useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const handleLogin = async (e) => {
  try {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/homepage");
    } else {
      console.error("Login failed:", response.data);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/homepage");
    }
  }, []);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/homepage");
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              type="submit"
              className="login-button"
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <div className="login-footer">
          <p className="footer-text">
            Don't have an account?{" "}
            <a href="/signup" className="form-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
