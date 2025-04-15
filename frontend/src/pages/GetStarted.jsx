import React from "react";
import { ArrowRight } from "lucide-react";

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="h-12 w-12 rounded-xl bg-purple-600 flex items-center justify-center mb-6">
            <span className="text-white font-bold text-xl">FD</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to FitDash
          </h1>
          <p className="text-gray-600 mb-8">
            Your personal fitness journey starts here. Track workouts, plan
            meals, and achieve your goals.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                1
              </div>
              <p className="text-gray-700">
                Personalized workout plans for your fitness level
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                2
              </div>
              <p className="text-gray-700">
                Nutrition tracking with healthy meal suggestions
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                3
              </div>
              <p className="text-gray-700">
                Progress tracking to visualize your journey
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
              Get Started <ArrowRight size={18} />
            </button>

            <button className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              I already have an account
            </button>
          </div>
        </div>

        <div className="bg-purple-50 p-6 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center">
            Join 10,000+ users transforming their fitness journey with FitDash
          </p>
        </div>
      </div>
    </div>
  );
}
