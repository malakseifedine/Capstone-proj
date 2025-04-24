// controllers/mealControllers.js
const { pool } = require('../config/db');


exports.getMeals = async (req, res) => {
  try {
    
    const mealsResult = await pool.query(
      `SELECT * FROM meals WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id]
    );
    
    const meals = mealsResult.rows;
    
    // Get ingredients for each meal
    for (let meal of meals) {
      const ingredientsResult = await pool.query(
        `SELECT ingredient FROM meal_ingredients WHERE meal_id = $1`,
        [meal.id]
      );
      meal.ingredients = ingredientsResult.rows.map(i => i.ingredient);
    }
    
    res.json(meals);
  } catch (error) {
    console.error('Error in getMeals:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get meals by category
exports.getMealsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const mealsResult = await pool.query(
      `SELECT * FROM meals WHERE user_id = $1 AND category = $2 ORDER BY created_at DESC`,
      [req.user.id, category]
    );
    
    const meals = mealsResult.rows;
    
    // Get ingredients for each meal
    for (let meal of meals) {
      const ingredientsResult = await pool.query(
        `SELECT ingredient FROM meal_ingredients WHERE meal_id = $1`,
        [meal.id]
      );
      meal.ingredients = ingredientsResult.rows.map(i => i.ingredient);
    }
    
    res.json(meals);
  } catch (error) {
    console.error('Error in getMealsByCategory:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get saved meals
exports.getSavedMeals = async (req, res) => {
  try {
    const mealsResult = await pool.query(
      `SELECT * FROM meals WHERE user_id = $1 AND is_saved = true ORDER BY created_at DESC`,
      [req.user.id]
    );
    
    const meals = mealsResult.rows;
    
    // Get ingredients for each meal
    for (let meal of meals) {
      const ingredientsResult = await pool.query(
        `SELECT ingredient FROM meal_ingredients WHERE meal_id = $1`,
        [meal.id]
      );
      meal.ingredients = ingredientsResult.rows.map(i => i.ingredient);
    }
    
    res.json(meals);
  } catch (error) {
    console.error('Error in getSavedMeals:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create meal
exports.createMeal = async (req, res) => {
  try {
    const { name, category, ingredients, calories, protein, carbs, fat, prepTime, isSaved } = req.body;
    
    if (!name || !category || !ingredients || !calories) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert meal
      const mealResult = await client.query(
        `INSERT INTO meals 
         (user_id, name, category, calories, protein, carbs, fat, prep_time, is_saved)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          req.user.id,
          name,
          category,
          calories,
          protein || 0,
          carbs || 0,
          fat || 0,
          prepTime || 0,
          isSaved || false
        ]
      );
      
      const meal = mealResult.rows[0];
      
      // Insert ingredients
      for (const ingredient of ingredients) {
        await client.query(
          `INSERT INTO meal_ingredients (meal_id, ingredient)
           VALUES ($1, $2)`,
          [meal.id, ingredient]
        );
      }
      
      // Commit transaction
      await client.query('COMMIT');
      
      // Add ingredients to response
      meal.ingredients = ingredients;
      
      client.release();
      res.status(201).json(meal);
    } catch (error) {
      // If error, rollback transaction
      await client.query('ROLLBACK');
      client.release();
      throw error;
    }
  } catch (error) {
    console.error('Error in createMeal:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Toggle save status of meal
exports.toggleSaveMeal = async (req, res) => {
  try {
    const mealId = req.params.id;
    
    // Check if meal exists and belongs to user
    const mealResult = await pool.query(
      `SELECT * FROM meals WHERE id = $1 AND user_id = $2`,
      [mealId, req.user.id]
    );
    
    if (mealResult.rows.length === 0) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    const currentStatus = mealResult.rows[0].is_saved;
    
    // Toggle status
    await pool.query(
      `UPDATE meals SET is_saved = $1 WHERE id = $2`,
      [!currentStatus, mealId]
    );
    
    res.json({ 
      id: mealId,
      isSaved: !currentStatus,
      message: !currentStatus ? 'Meal saved' : 'Meal unsaved'
    });
  } catch (error) {
    console.error('Error in toggleSaveMeal:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get meal plan
exports.getMealPlan = async (req, res) => {
  try {
    // Check if user has a meal plan
    const mealPlanResult = await pool.query(
      `SELECT * FROM meal_plans WHERE user_id = $1`,
      [req.user.id]
    );
    
    if (mealPlanResult.rows.length === 0) {
      // Create a new meal plan if none exists
      const newPlanResult = await pool.query(
        `INSERT INTO meal_plans (user_id) VALUES ($1) RETURNING id`,
        [req.user.id]
      );
      
      return res.json({ id: newPlanResult.rows[0].id, days: [] });
    }
    
    const mealPlanId = mealPlanResult.rows[0].id;
    
    const daysResult = await pool.query(
      `SELECT d.*, 
       b.name as breakfast_name, b.calories as breakfast_calories,
       l.name as lunch_name, l.calories as lunch_calories,
       dn.name as dinner_name, dn.calories as dinner_calories
       FROM meal_plan_days d
       LEFT JOIN meals b ON d.breakfast_id = b.id
       LEFT JOIN meals l ON d.lunch_id = l.id
       LEFT JOIN meals dn ON d.dinner_id = dn.id
       WHERE d.meal_plan_id = $1
       ORDER BY CASE 
         WHEN d.day = 'MON' THEN 1 
         WHEN d.day = 'TUE' THEN 2 
         WHEN d.day = 'WED' THEN 3 
         WHEN d.day = 'THU' THEN 4 
         WHEN d.day = 'FRI' THEN 5 
         WHEN d.day = 'SAT' THEN 6 
         WHEN d.day = 'SUN' THEN 7 
       END`,
      [mealPlanId]
    );
    
    const days = daysResult.rows;
    
    // Get snacks for each day
    for (let day of days) {
      const snacksResult = await pool.query(
        `SELECT s.meal_id, m.name, m.calories
         FROM meal_plan_snacks s
         JOIN meals m ON s.meal_id = m.id
         WHERE s.day_id = $1`,
        [day.id]
      );
      
      day.snacks = snacksResult.rows;
    }
    
    res.json({
      id: mealPlanId,
      days
    });
  } catch (error) {
    console.error('Error in getMealPlan:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.getMeal = async (req, res) => {
    try {
      const mealResult = await pool.query(
        `SELECT * FROM meals WHERE id = $1 AND user_id = $2`,
        [req.params.id, req.user.id]
      );
      
      if (mealResult.rows.length === 0) {
        return res.status(404).json({ message: 'Meal not found' });
      }
      
      const meal = mealResult.rows[0];
      
      // Get ingredients
      const ingredientsResult = await pool.query(
        `SELECT ingredient FROM meal_ingredients WHERE meal_id = $1`,
        [meal.id]
      );
      
      meal.ingredients = ingredientsResult.rows.map(i => i.ingredient);
      
      res.json(meal);
    } catch (error) {
      console.error('Error in getMeal:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Update meal
  exports.updateMeal = async (req, res) => {
    try {
      const { name, category, ingredients, calories, protein, carbs, fat, prepTime, isSaved } = req.body;
      const mealId = req.params.id;
      
      // Check if meal exists and belongs to user
      const mealCheckResult = await pool.query(
        `SELECT * FROM meals WHERE id = $1 AND user_id = $2`,
        [mealId, req.user.id]
      );
      
      if (mealCheckResult.rows.length === 0) {
        return res.status(404).json({ message: 'Meal not found' });
      }
      
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Update meal
        await client.query(
          `UPDATE meals 
           SET name = $1, category = $2, calories = $3, protein = $4, 
               carbs = $5, fat = $6, prep_time = $7, is_saved = $8
           WHERE id = $9`,
          [
            name,
            category,
            calories,
            protein || 0,
            carbs || 0,
            fat || 0,
            prepTime || 0,
            isSaved || false,
            mealId
          ]
        );
        
        // Delete existing ingredients
        await client.query(
          `DELETE FROM meal_ingredients WHERE meal_id = $1`,
          [mealId]
        );
        
        // Insert new ingredients
        for (const ingredient of ingredients) {
          await client.query(
            `INSERT INTO meal_ingredients (meal_id, ingredient)
             VALUES ($1, $2)`,
            [mealId, ingredient]
          );
        }
        
        // Commit transaction
        await client.query('COMMIT');
        
        // Get updated meal
        const updatedMealResult = await client.query(
          `SELECT * FROM meals WHERE id = $1`,
          [mealId]
        );
        
        const ingredientsResult = await client.query(
          `SELECT ingredient FROM meal_ingredients WHERE meal_id = $1`,
          [mealId]
        );
        
        const updatedMeal = updatedMealResult.rows[0];
        updatedMeal.ingredients = ingredientsResult.rows.map(i => i.ingredient);
        
        client.release();
        res.json(updatedMeal);
      } catch (error) {
        // If error, rollback transaction
        await client.query('ROLLBACK');
        client.release();
        throw error;
      }
    } catch (error) {
      console.error('Error in updateMeal:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Delete meal
  exports.deleteMeal = async (req, res) => {
    try {
      const mealId = req.params.id;
      
      // Check if meal exists and belongs to user
      const mealResult = await pool.query(
        `SELECT * FROM meals WHERE id = $1 AND user_id = $2`,
        [mealId, req.user.id]
      );
      
      if (mealResult.rows.length === 0) {
        return res.status(404).json({ message: 'Meal not found' });
      }
      
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Delete ingredients
        await client.query(
          `DELETE FROM meal_ingredients WHERE meal_id = $1`,
          [mealId]
        );
        
        // Delete meal
        await client.query(
          `DELETE FROM meals WHERE id = $1`,
          [mealId]
        );
        
        // Commit transaction
        await client.query('COMMIT');
        
        client.release();
        res.json({ message: 'Meal removed' });
      } catch (error) {
        // If error, rollback transaction
        await client.query('ROLLBACK');
        client.release();
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteMeal:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Update meal plan
  exports.updateMealPlan = async (req, res) => {
    try {
      const { days } = req.body;
      
      if (!days || !Array.isArray(days)) {
        return res.status(400).json({ message: 'Please provide days array' });
      }
      
      // Check if user has a meal plan
      const mealPlanResult = await pool.query(
        `SELECT * FROM meal_plans WHERE user_id = $1`,
        [req.user.id]
      );
      
      let mealPlanId;
      
      // If user doesn't have a meal plan, create one
      if (mealPlanResult.rows.length === 0) {
        const newPlanResult = await pool.query(
          `INSERT INTO meal_plans (user_id) VALUES ($1) RETURNING id`,
          [req.user.id]
        );
        
        mealPlanId = newPlanResult.rows[0].id;
      } else {
        mealPlanId = mealPlanResult.rows[0].id;
      }
      
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Process each day in the plan
        for (const day of days) {
          // Get or create the day entry
          const dayResult = await client.query(
            `SELECT * FROM meal_plan_days WHERE meal_plan_id = $1 AND day = $2`,
            [mealPlanId, day.day]
          );
          
          let dayId;
          
          if (dayResult.rows.length === 0) {
            // Create new day entry
            const newDayResult = await client.query(
              `INSERT INTO meal_plan_days (meal_plan_id, day, breakfast_id, lunch_id, dinner_id, total_calories)
               VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
              [
                mealPlanId,
                day.day,
                day.breakfast_id || null,
                day.lunch_id || null,
                day.dinner_id || null,
                day.total_calories || 0
              ]
            );
            
            dayId = newDayResult.rows[0].id;
          } else {
            // Update existing day entry
            dayId = dayResult.rows[0].id;
            
            await client.query(
              `UPDATE meal_plan_days 
               SET breakfast_id = $1, lunch_id = $2, dinner_id = $3, total_calories = $4
               WHERE id = $5`,
              [
                day.breakfast_id || null,
                day.lunch_id || null,
                day.dinner_id || null,
                day.total_calories || 0,
                dayId
              ]
            );
            
            // Delete existing snacks
            await client.query(
              `DELETE FROM meal_plan_snacks WHERE day_id = $1`,
              [dayId]
            );
          }
          
          // Add snacks if any
          if (day.snacks && Array.isArray(day.snacks)) {
            for (const snack of day.snacks) {
              await client.query(
                `INSERT INTO meal_plan_snacks (day_id, meal_id)
                 VALUES ($1, $2)`,
                [dayId, snack]
              );
            }
          }
        }
        
        // Commit transaction
        await client.query('COMMIT');
        
        // Get updated meal plan
        const updatedDaysResult = await client.query(
          `SELECT d.*, 
           b.name as breakfast_name, b.calories as breakfast_calories,
           l.name as lunch_name, l.calories as lunch_calories,
           dn.name as dinner_name, dn.calories as dinner_calories
           FROM meal_plan_days d
           LEFT JOIN meals b ON d.breakfast_id = b.id
           LEFT JOIN meals l ON d.lunch_id = l.id
           LEFT JOIN meals dn ON d.dinner_id = dn.id
           WHERE d.meal_plan_id = $1
           ORDER BY CASE 
             WHEN d.day = 'MON' THEN 1 
             WHEN d.day = 'TUE' THEN 2 
             WHEN d.day = 'WED' THEN 3 
             WHEN d.day = 'THU' THEN 4 
             WHEN d.day = 'FRI' THEN 5 
             WHEN d.day = 'SAT' THEN 6 
             WHEN d.day = 'SUN' THEN 7 
           END`,
          [mealPlanId]
        );
        
        const days = updatedDaysResult.rows;
        
        // Get snacks for each day
        for (let day of days) {
          const snacksResult = await client.query(
            `SELECT s.meal_id, m.name, m.calories
             FROM meal_plan_snacks s
             JOIN meals m ON s.meal_id = m.id
             WHERE s.day_id = $1`,
            [day.id]
          );
          
          day.snacks = snacksResult.rows;
        }
        
        const result = {
          id: mealPlanId,
          days
        };
        
        client.release();
        res.json(result);
      } catch (error) {
        // If error, rollback transaction
        await client.query('ROLLBACK');
        client.release();
        throw error;
      }
    } catch (error) {
      console.error('Error in updateMealPlan:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };