import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Search,
  Filter,
  Plus,
  Clock,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
} from "lucide-react";

export default function Meals() {
  const [activeTab, setActiveTab] = useState("all");
  const [savedMeals, setSavedMeals] = useState([1, 4]);

  const toggleSave = (mealId) => {
    if (savedMeals.includes(mealId)) {
      setSavedMeals(savedMeals.filter((id) => id !== mealId));
    } else {
      setSavedMeals([...savedMeals, mealId]);
    }
  };

  const meals = [
    {
      id: 1,
      name: "Protein Smoothie Bowl",
      category: "Breakfast",
      calories: 340,
      time: 10,
      image: "smoothie-bowl",
      ingredients: [
        "Protein powder",
        "Banana",
        "Berries",
        "Almond milk",
        "Chia seeds",
      ],
    },
    {
      id: 2,
      name: "Grilled Chicken Salad",
      category: "Lunch",
      calories: 420,
      time: 20,
      image: "chicken-salad",
      ingredients: [
        "Chicken breast",
        "Mixed greens",
        "Cherry tomatoes",
        "Cucumber",
        "Olive oil",
      ],
    },
    {
      id: 3,
      name: "Baked Salmon with Veggies",
      category: "Dinner",
      calories: 510,
      time: 30,
      image: "salmon",
      ingredients: [
        "Salmon fillet",
        "Asparagus",
        "Sweet potatoes",
        "Lemon",
        "Herbs",
      ],
    },
    {
      id: 4,
      name: "Greek Yogurt with Berries",
      category: "Snack",
      calories: 180,
      time: 5,
      image: "yogurt",
      ingredients: [
        "Greek yogurt",
        "Mixed berries",
        "Honey",
        "Granola",
        "Nuts",
      ],
    },
    {
      id: 5,
      name: "Avocado Toast with Egg",
      category: "Breakfast",
      calories: 380,
      time: 15,
      image: "avocado-toast",
      ingredients: [
        "Whole grain bread",
        "Avocado",
        "Egg",
        "Red pepper flakes",
        "Salt & pepper",
      ],
    },
    {
      id: 6,
      name: "Quinoa Buddha Bowl",
      category: "Lunch",
      calories: 450,
      time: 25,
      image: "buddha-bowl",
      ingredients: [
        "Quinoa",
        "Roasted chickpeas",
        "Avocado",
        "Kale",
        "Tahini sauce",
      ],
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meal Plans</h1>
            <p className="text-gray-600">
              Discover healthy and delicious recipes
            </p>
          </div>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Plus size={18} />
            Create Custom Meal
          </button>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search meals and recipes..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="sm:w-auto w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-6 overflow-x-auto">
            {["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Saved"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.toLowerCase()
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Meal cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
            >
              <div className="h-48 bg-gray-200 relative">
                {/* This would be an actual image in production */}
                <div
                  className={`w-full h-full flex items-center justify-center bg-${
                    meal.image === "smoothie-bowl"
                      ? "purple"
                      : meal.image === "chicken-salad"
                      ? "green"
                      : meal.image === "salmon"
                      ? "blue"
                      : meal.image === "yogurt"
                      ? "red"
                      : meal.image === "avocado-toast"
                      ? "yellow"
                      : "teal"
                  }-100`}
                >
                  <p className="text-lg font-medium">{meal.image}</p>
                </div>
                <button
                  onClick={() => toggleSave(meal.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                >
                  {savedMeals.includes(meal.id) ? (
                    <BookmarkCheck size={20} className="text-purple-600" />
                  ) : (
                    <Bookmark size={20} className="text-gray-400" />
                  )}
                </button>
                <span className="absolute top-3 left-3 px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-700">
                  {meal.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {meal.name}
                </h3>

                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{meal.time} min</span>
                  </div>
                  <div>
                    <span>{meal.calories} kcal</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Ingredients:
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    {meal.ingredients.slice(0, 3).join(", ")}
                    {meal.ingredients.length > 3 && "..."}
                  </p>
                </div>

                <a
                  href="#"
                  className="flex items-center justify-center gap-1 text-purple-600 font-medium text-sm hover:text-purple-800 transition-colors"
                >
                  View Recipe <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Meal Plan Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Your Weekly Meal Plan
            </h2>
            <button className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors">
              Edit Plan
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 font-medium text-sm">
                MON
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Breakfast</p>
                    <p className="font-medium text-gray-900">
                      Protein Smoothie Bowl
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Lunch</p>
                    <p className="font-medium text-gray-900">
                      Grilled Chicken Salad
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dinner</p>
                    <p className="font-medium text-gray-900">
                      Baked Salmon with Veggies
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Calories</p>
                <p className="font-medium text-gray-900">1,270 kcal</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 font-medium text-sm">
                TUE
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Breakfast</p>
                    <p className="font-medium text-gray-900">
                      Avocado Toast with Egg
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Lunch</p>
                    <p className="font-medium text-gray-900">
                      Quinoa Buddha Bowl
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dinner</p>
                    <p className="font-medium text-gray-900">
                      Grilled Chicken with Roasted Vegetables
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Calories</p>
                <p className="font-medium text-gray-900">1,340 kcal</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              View Complete Meal Plan
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
