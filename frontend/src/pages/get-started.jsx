import React, { useEffect, useState } from "react";
import "../styles/get-started.css";
const messages = [
  "Welcome to your Personalized Fitness Journey.",
  "Plan Your Meals. Track Your Workouts.",
  "Achieve Your Goals — One Step at a Time.",
];

function GetStarted() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= messages.length) return;
    const fullText = messages[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < fullText.length) {
          setSubIndex(subIndex + 1);
        } else if (deleting && subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else if (!deleting && subIndex === fullText.length) {
          setTimeout(() => setDeleting(true), 1000);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % messages.length);
        }
        setText(fullText.substring(0, subIndex));
      },
      deleting ? 40 : 100
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-6 leading-tight">
            {text}
            <span className="border-r-4 border-green-700 ml-1 animate-pulse"></span>
          </h1>

          <p className="text-gray-700 text-lg mb-8">
            This web app is your all-in-one fitness companion — featuring a meal
            planner with personalized recommendations based on your goals, a
            workout tracker, and a progress dashboard to monitor your results.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-white shadow rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-1">
                Smart Meal Planner
              </h4>
              <p className="text-sm text-gray-600">
                Plan meals tailored to your fitness goals. Add or remove meals
                and receive suggestions that fit your dietary targets.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-1">
                Workout Tracker
              </h4>
              <p className="text-sm text-gray-600">
                Track your workouts, schedule new ones, and explore recommended
                exercises based on your goal.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-1">
                Goal Progress
              </h4>
              <p className="text-sm text-gray-600">
                View progress updates and stay informed on whether your fitness
                goals are being met.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white p-10 shadow-2xl rounded-2xl flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Get Started
          </h2>
          <p className="text-gray-600 mb-8">
            Sign in or create an account to begin your personalized fitness
            experience.
          </p>
          <div className="flex flex-col gap-4 w-full">
            <a
              href="/login"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition w-full"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="border border-green-600 text-green-600 hover:bg-green-100 font-semibold px-8 py-3 rounded-lg transition w-full"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
