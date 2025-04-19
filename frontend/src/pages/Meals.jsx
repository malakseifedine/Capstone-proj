import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Search,
  Plus,
  Clock,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
} from "lucide-react";
import "../styles/Meals.css";

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
    // ... (same meal data)
  ];

  return (
    <Layout>
      <div className="meals-container">
        <div className="meals-header">
          <div>
            <h1 className="title">Meal Plans</h1>
            <p className="subtitle">Discover healthy and delicious recipes</p>
          </div>
          <button className="create-btn">
            <Plus size={18} />
            Create Custom Meal
          </button>
        </div>

        <div className="search-filter">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search meals and recipes..."
              className="search-input"
            />
          </div>
        </div>

        <div className="tabs">
          {["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Saved"].map(
            (tab) => (
              <button
                key={tab}
                className={`tab-btn ${
                  activeTab === tab.toLowerCase() ? "active-tab" : ""
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="meal-grid">
          {meals.map((meal) => (
            <div key={meal.id} className="meal-card">
              <div className={`meal-image bg-${meal.image}`}>
                <p className="meal-img-label">{meal.image}</p>
                <button
                  onClick={() => toggleSave(meal.id)}
                  className="save-btn"
                >
                  {savedMeals.includes(meal.id) ? (
                    <BookmarkCheck size={20} className="saved-icon" />
                  ) : (
                    <Bookmark size={20} className="unsaved-icon" />
                  )}
                </button>
                <span className="category-badge">{meal.category}</span>
              </div>

              <div className="meal-content">
                <h3 className="meal-title">{meal.name}</h3>
                <div className="meal-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{meal.time} min</span>
                  </div>
                  <span>{meal.calories} kcal</span>
                </div>
                <div className="meal-ingredients">
                  <span className="label">Ingredients:</span>
                  <p>
                    {meal.ingredients.slice(0, 3).join(", ")}
                    {meal.ingredients.length > 3 && "..."}
                  </p>
                </div>
                <a href="#" className="view-link">
                  View Recipe <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="meal-plan">
          <div className="plan-header">
            <h2>Your Weekly Meal Plan</h2>
            <button className="edit-btn">Edit Plan</button>
          </div>

          <div className="plan-list">
            {/* Sample Day Entry */}
            {["MON", "TUE"].map((day, i) => (
              <div className="plan-day" key={day}>
                <div className="day-label">{day}</div>
                <div className="plan-details">
                  <div>
                    <p className="small-label">Breakfast</p>
                    <p className="value">
                      {i === 0
                        ? "Protein Smoothie Bowl"
                        : "Avocado Toast with Egg"}
                    </p>
                  </div>
                  <div>
                    <p className="small-label">Lunch</p>
                    <p className="value">
                      {i === 0 ? "Grilled Chicken Salad" : "Quinoa Buddha Bowl"}
                    </p>
                  </div>
                  <div>
                    <p className="small-label">Dinner</p>
                    <p className="value">
                      {i === 0
                        ? "Baked Salmon with Veggies"
                        : "Grilled Chicken with Roasted Vegetables"}
                    </p>
                  </div>
                </div>
                <div className="calories">
                  <p className="small-label">Total Calories</p>
                  <p className="value">
                    {i === 0 ? "1,270 kcal" : "1,340 kcal"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="plan-footer">
            <button className="view-plan-btn">View Complete Meal Plan</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
