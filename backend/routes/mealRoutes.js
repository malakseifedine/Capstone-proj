// routes/mealRoutes.js
const express = require('express');
const router = express.Router();
const mealControllers = require('../controllers/mealControllers');
const { protect } = require('../middleware/auth');

router.use(protect);

// Meal routes
router.route('/')
  .get(mealControllers.getMeals)
  .post(mealControllers.createMeal);


router.route('/category/:category')
  .get(mealControllers.getMealsByCategory);

router.route('/saved/list')
  .get(mealControllers.getSavedMeals);

// Meal plan routes
router.route('/plan')
  .get(mealControllers.getMealPlan)
  .put(mealControllers.updateMealPlan);

router.route('/:id')
  .get(mealControllers.getMeal)
  .put(mealControllers.updateMeal)
  .delete(mealControllers.deleteMeal);

router.route('/:id/toggle-save')
  .put(mealControllers.toggleSaveMeal);

module.exports = router;