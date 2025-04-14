import React, { useEffect, useState } from "react";
import "../styles/GetStarted.css";

import { Link } from "react-router";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-6 leading-tight">
            Welcome to FitTrack
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Your all-in-one fitness companion — meal planning, workout tracking,
            and real-time progress updates personalized just for you.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <h4 className="text-lg font-semibold text-gray-800">
                Personalized Meal Planner
              </h4>
              <p className="text-sm text-gray-600">
                Create, edit, and follow a meal plan that aligns with your
                fitness goals.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h4 className="text-lg font-semibold text-gray-800">
                Custom Workout Routines
              </h4>
              <p className="text-sm text-gray-600">
                Daily and weekly workouts tailored to your preferences and
                level.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h4 className="text-lg font-semibold text-gray-800">
                Progress Dashboard
              </h4>
              <p className="text-sm text-gray-600">
                Track your achievements and stay motivated with goal-based
                insights.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-10 shadow-2xl rounded-2xl text-center flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Get Started
          </h2>
          <p className="text-gray-600 mb-6">
            Join us today and take control of your fitness journey.
          </p>
          <div className="flex flex-col gap-4 w-full">
            <Link
              to="/login"
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-100 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
