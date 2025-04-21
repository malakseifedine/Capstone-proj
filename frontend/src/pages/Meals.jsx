import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
// import { mealService } from "../services/api";
import {
  Search,
  Plus,
  Clock,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  X,
} from "lucide-react";
import "../styles/Meals.css";

export default function Meals() {
  const [activeTab, setActiveTab] = useState("all");
  const [meals, setMeals] = useState([]);
  const [savedMeals, setSavedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mealPlan, setMealPlan] = useState(null);

  // New meal form state
  const [newMeal, setNewMeal] = useState({
    name: "",
    category: "Breakfast",
    ingredients: [],
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    prepTime: "",
    currentIngredient: "",
  });

  // Fetch meals based on active tab
  const fetchMeals = async () => {
    try {
      setIsLoading(true);
      let response;

      if (activeTab === "saved") {
        response = await mealService.getSavedMeals();
      } else if (activeTab === "all") {
        response = await mealService.getMeals();
      } else {
        // Category tabs (breakfast, lunch, dinner, snacks)
        response = await mealService.getMealsByCategory(
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        );
      }

      setMeals(response.data);

      // Get saved meals for toggle functionality
      const savedResponse = await mealService.getSavedMeals();
      setSavedMeals(savedResponse.data.map((meal) => meal.id));

      setError(null);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setError("Failed to load meals. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch meal plan
  const fetchMealPlan = async () => {
    try {
      const response = await mealService.getMealPlan();
      setMealPlan(response.data);
    } catch (err) {
      console.error("Error fetching meal plan:", err);
      // Don't set error, not critical for page functioning
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchMealPlan();
  }, [activeTab]);

  const toggleSave = async (mealId) => {
    try {
      await mealService.toggleSaveMeal(mealId);

      // Update local state
      if (savedMeals.includes(mealId)) {
        setSavedMeals(savedMeals.filter((id) => id !== mealId));
      } else {
        setSavedMeals([...savedMeals, mealId]);
      }

      // Refresh meals if we're on the saved tab
      if (activeTab === "saved") {
        fetchMeals();
      }
    } catch (err) {
      console.error("Error toggling meal save status:", err);
      setError("Failed to update saved status. Please try again.");
    }
  };

  const handleAddIngredient = () => {
    if (newMeal.currentIngredient.trim()) {
      setNewMeal({
        ...newMeal,
        ingredients: [...newMeal.ingredients, newMeal.currentIngredient.trim()],
        currentIngredient: "",
      });
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...newMeal.ingredients];
    updatedIngredients.splice(index, 1);
    setNewMeal({
      ...newMeal,
      ingredients: updatedIngredients,
    });
  };

  const handleSubmitMeal = async (e) => {
    e.preventDefault();

    if (
      !newMeal.name ||
      !newMeal.category ||
      newMeal.ingredients.length === 0 ||
      !newMeal.calories
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      const mealData = {
        name: newMeal.name,
        category: newMeal.category,
        ingredients: newMeal.ingredients,
        calories: parseInt(newMeal.calories) || 0,
        protein: parseFloat(newMeal.protein) || 0,
        carbs: parseFloat(newMeal.carbs) || 0,
        fat: parseFloat(newMeal.fat) || 0,
        prepTime: parseInt(newMeal.prepTime) || 0,
        isSaved: false,
      };

      await mealService.createMeal(mealData);

      // Reset form and fetch updated meals
      setNewMeal({
        name: "",
        category: "Breakfast",
        ingredients: [],
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        prepTime: "",
        currentIngredient: "",
      });

      setShowAddMealForm(false);
      fetchMeals();
      setError(null);
    } catch (err) {
      console.error("Error creating meal:", err);
      setError("Failed to create meal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter meals based on search query
  const filteredMeals = meals.filter(
    (meal) =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Layout>
      <div className="meals-container">
        <div className="meals-header">
          <div>
            <h1 className="title">Meal Plans</h1>
            <p className="subtitle">Discover healthy and delicious recipes</p>
          </div>
          <button
            className="create-btn"
            onClick={() => setShowAddMealForm(!showAddMealForm)}
          >
            <Plus size={18} />
            {showAddMealForm ? "Cancel" : "Create Custom Meal"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showAddMealForm && (
          <div className="meal-form-card">
            <h2 className="form-title">Create New Meal</h2>
            <form onSubmit={handleSubmitMeal}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Meal Name*</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newMeal.name}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category*</label>
                  <select
                    className="input-field"
                    value={newMeal.category}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, category: e.target.value })
                    }
                    required
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Calories*</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newMeal.calories}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, calories: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Prep Time (minutes)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newMeal.prepTime}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, prepTime: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Protein (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    value={newMeal.protein}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, protein: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Carbs (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    value={newMeal.carbs}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, carbs: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Fat (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    value={newMeal.fat}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, fat: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="ingredients-section">
                <h3>Ingredients*</h3>

                <div className="ingredients-input">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Add ingredient"
                    value={newMeal.currentIngredient}
                    onChange={(e) =>
                      setNewMeal({
                        ...newMeal,
                        currentIngredient: e.target.value,
                      })
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddIngredient();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="add-ingredient-btn"
                    onClick={handleAddIngredient}
                  >
                    Add
                  </button>
                </div>

                {newMeal.ingredients.length > 0 && (
                  <div className="ingredients-list">
                    {newMeal.ingredients.map((ingredient, index) => (
                      <div className="ingredient-tag" key={index}>
                        {ingredient}
                        <button
                          type="button"
                          className="remove-ingredient-btn"
                          onClick={() => handleRemoveIngredient(index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-footer">
                <button type="submit" className="save-btn" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Meal"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="search-filter">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search meals and recipes..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {isLoading ? (
          <p className="loading-message">Loading meals...</p>
        ) : filteredMeals.length === 0 ? (
          <p className="empty-message">
            No meals found.{" "}
            {activeTab === "all"
              ? "Create your first meal!"
              : "Try a different category or search term."}
          </p>
        ) : (
          <div className="meal-grid">
            {filteredMeals.map((meal) => (
              <div key={meal.id} className="meal-card">
                <div className={`meal-image bg-${meal.category.toLowerCase()}`}>
                  <p className="meal-img-label">{meal.category}</p>
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
                      <span>{meal.prepTime || meal.prep_time || 0} min</span>
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
                  <div className="meal-nutrients">
                    <div className="nutrient">
                      <span className="label">Protein:</span>
                      <span>{meal.protein || 0}g</span>
                    </div>
                    <div className="nutrient">
                      <span className="label">Carbs:</span>
                      <span>{meal.carbs || 0}g</span>
                    </div>
                    <div className="nutrient">
                      <span className="label">Fat:</span>
                      <span>{meal.fat || 0}g</span>
                    </div>
                  </div>
                  <a href="#" className="view-link">
                    View Recipe <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {mealPlan && (
          <div className="meal-plan">
            <div className="plan-header">
              <h2>Your Weekly Meal Plan</h2>
              <button className="edit-btn">Edit Plan</button>
            </div>

            <div className="plan-list">
              {mealPlan.days &&
                mealPlan.days.slice(0, 2).map((day) => (
                  <div className="plan-day" key={day.day}>
                    <div className="day-label">{day.day}</div>
                    <div className="plan-details">
                      <div>
                        <p className="small-label">Breakfast</p>
                        <p className="value">
                          {day.breakfast_name || "Not planned"}
                        </p>
                      </div>
                      <div>
                        <p className="small-label">Lunch</p>
                        <p className="value">
                          {day.lunch_name || "Not planned"}
                        </p>
                      </div>
                      <div>
                        <p className="small-label">Dinner</p>
                        <p className="value">
                          {day.dinner_name || "Not planned"}
                        </p>
                      </div>
                    </div>
                    <div className="calories">
                      <p className="small-label">Total Calories</p>
                      <p className="value">{day.total_calories || 0} kcal</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="plan-footer">
              <button className="view-plan-btn">View Complete Meal Plan</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
