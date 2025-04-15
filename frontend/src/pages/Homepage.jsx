import React from "react";
import Layout from "../components/Layout";
import {
  Calendar,
  Dumbbell,
  Flame,
  Heart,
  Target,
  Utensils,
  TrendingUp,
} from "lucide-react";

export default function Homepage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Sarah!
            </h1>
            <p className="text-gray-600">
              Track your progress and stay motivated.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
              <Dumbbell size={18} />
              Start Workout
            </button>
            <button className="bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Calendar size={18} />
              Schedule
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                <Flame size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Calories</p>
                <p className="text-xl font-bold text-gray-900">1,248 / 2,000</p>
              </div>
            </div>
            <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full"
                style={{ width: "62%" }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Dumbbell size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Workouts This Week</p>
                <p className="text-xl font-bold text-gray-900">4 / 5</p>
              </div>
            </div>
            <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full"
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                <Target size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Goal Progress</p>
                <p className="text-xl font-bold text-gray-900">68%</p>
              </div>
            </div>
            <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bg-green-600 h-full"
                style={{ width: "68%" }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                <Heart size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Heart Rate</p>
                <p className="text-xl font-bold text-gray-900">72 bpm</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-xs text-green-600">+2% from last week</span>
            </div>
          </div>
        </div>

        {/* Today's Plan */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Today's Plan</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                <Utensils size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Breakfast</p>
                <p className="text-gray-600 text-sm">
                  Protein smoothie with berries and oats
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">450 kcal</p>
                <p className="text-xs text-gray-500">8:00 AM</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Dumbbell size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Upper Body Workout</p>
                <p className="text-gray-600 text-sm">
                  45 min · Strength training
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">10:30 AM</p>
                <button className="text-xs text-blue-600 font-medium">
                  Start
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                <Utensils size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Lunch</p>
                <p className="text-gray-600 text-sm">
                  Grilled chicken salad with avocado
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">550 kcal</p>
                <p className="text-xs text-gray-500">1:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Weight Progress
              </h2>
              <a href="#" className="text-sm text-purple-600 font-medium">
                View All
              </a>
            </div>
            <div className="h-48 flex items-end justify-between px-2">
              {[65, 64.5, 64, 63.8, 64.2, 63.5, 63].map((weight, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-purple-600 w-8 rounded-t-lg"
                    style={{ height: `${(weight - 60) * 10}px` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-1">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center gap-1">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-xs text-green-600">-2 kg this month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Upcoming Workouts
              </h2>
              <a href="#" className="text-sm text-purple-600 font-medium">
                Schedule
              </a>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Dumbbell size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Lower Body Focus</p>
                  <p className="text-xs text-gray-500">Tomorrow · 9:00 AM</p>
                </div>
                <button className="text-xs bg-blue-600 text-white py-1 px-3 rounded-full">
                  Join
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <Dumbbell size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">HIIT Session</p>
                  <p className="text-xs text-gray-500">Wednesday · 5:30 PM</p>
                </div>
                <button className="text-xs bg-blue-600 text-white py-1 px-3 rounded-full">
                  Join
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Dumbbell size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Full Body Workout</p>
                  <p className="text-xs text-gray-500">Friday · 7:00 AM</p>
                </div>
                <button className="text-xs bg-blue-600 text-white py-1 px-3 rounded-full">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
