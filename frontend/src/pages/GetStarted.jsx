import React from "react";
import { ArrowRight } from "lucide-react";
import "../styles/GetStarted.css";

export default function GetStarted() {
  return (
    <div className="get-started-container">
      <div className="get-started-card">
        <div className="get-started-content">
          <div className="get-started-logo">
            <span>FT</span>
          </div>

          <h1 className="get-started-title">Welcome to FitTrack</h1>
          <p className="get-started-description">
            Your personal fitness journey starts here. Track workouts, plan
            meals, and achieve your goals.
          </p>

          <div className="get-started-steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Personalized workout plans for your fitness level</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Nutrition tracking with healthy meal suggestions</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Progress tracking to visualize your journey</p>
            </div>
          </div>

          <div className="get-started-buttons">
            <button className="get-started-btn primary">
              Get Started <ArrowRight size={18} />
            </button>
            <button className="get-started-btn secondary">
              I already have an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
