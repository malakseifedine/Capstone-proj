// controllers/workoutControllers.js
const { pool } = require('../config/db');

// Get all workouts for a user
exports.getWorkouts = async (req, res) => {
  try {
    const workoutsResult = await pool.query(
      `SELECT * FROM workouts WHERE user_id = $1 ORDER BY date DESC`,
      [req.user.id]
    );
    
    const workouts = workoutsResult.rows;
    
    // Get exercises for each workout
    for (let workout of workouts) {
      const exercisesResult = await pool.query(
        `SELECT * FROM exercises WHERE workout_id = $1`,
        [workout.id]
      );
      workout.exercises = exercisesResult.rows;
    }
    
    res.json(workouts);
  } catch (error) {
    console.error('Error in getWorkouts:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single workout
exports.getWorkout = async (req, res) => {
  try {
    const workoutResult = await pool.query(
      `SELECT * FROM workouts WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );
    
    if (workoutResult.rows.length === 0) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    const workout = workoutResult.rows[0];
    
    // Get exercises
    const exercisesResult = await pool.query(
      `SELECT * FROM exercises WHERE workout_id = $1`,
      [workout.id]
    );
    
    workout.exercises = exercisesResult.rows;
    
    res.json(workout);
  } catch (error) {
    console.error('Error in getWorkout:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new workout
exports.createWorkout = async (req, res) => {
  try {
    const { date, exercises, duration, caloriesBurned, notes } = req.body;
    const userId = req.user.id;
    
    if (!date || !exercises || !duration) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Begin transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert workout
      const workoutResult = await client.query(
        `INSERT INTO workouts (user_id, date, duration, calories_burned, notes)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userId, date, duration, caloriesBurned || 0, notes || '']
      );
      
      const workout = workoutResult.rows[0];
      
      // Insert exercises
      for (const exercise of exercises) {
        await client.query(
          `INSERT INTO exercises (workout_id, name, sets, reps, weight)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            workout.id,
            exercise.name,
            exercise.sets,
            exercise.reps,
            exercise.weight || null
          ]
        );
      }
      
      // Commit transaction
      await client.query('COMMIT');
      
      // Get complete workout with exercises
      const completeWorkoutResult = await client.query(
        `SELECT * FROM workouts WHERE id = $1`,
        [workout.id]
      );
      
      const exercisesResult = await client.query(
        `SELECT * FROM exercises WHERE workout_id = $1`,
        [workout.id]
      );
      
      const newWorkout = completeWorkoutResult.rows[0];
      newWorkout.exercises = exercisesResult.rows;
      
      client.release();
      res.status(201).json(newWorkout);
    } catch (error) {
      // If error, rollback transaction
      await client.query('ROLLBACK');
      client.release();
      throw error;
    }
  } catch (error) {
    console.error('Error in createWorkout:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update workout
exports.updateWorkout = async (req, res) => {
  try {
    const { date, exercises, duration, caloriesBurned, notes } = req.body;
    const workoutId = req.params.id;
    
    // Check if workout exists and belongs to user
    const workoutCheckResult = await pool.query(
      `SELECT * FROM workouts WHERE id = $1 AND user_id = $2`,
      [workoutId, req.user.id]
    );
    
    if (workoutCheckResult.rows.length === 0) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Update workout
      await client.query(
        `UPDATE workouts SET date = $1, duration = $2, calories_burned = $3, notes = $4
         WHERE id = $5`,
        [date, duration, caloriesBurned || 0, notes || '', workoutId]
      );
      
      // Delete existing exercises
      await client.query(
        `DELETE FROM exercises WHERE workout_id = $1`,
        [workoutId]
      );
      
      // Insert new exercises
      for (const exercise of exercises) {
        await client.query(
          `INSERT INTO exercises (workout_id, name, sets, reps, weight)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            workoutId,
            exercise.name,
            exercise.sets,
            exercise.reps,
            exercise.weight || null
          ]
        );
      }
      
      // Commit transaction
      await client.query('COMMIT');
      
      // Get updated workout
      const updatedWorkoutResult = await client.query(
        `SELECT * FROM workouts WHERE id = $1`,
        [workoutId]
      );
      
      const exercisesResult = await client.query(
        `SELECT * FROM exercises WHERE workout_id = $1`,
        [workoutId]
      );
      
      const updatedWorkout = updatedWorkoutResult.rows[0];
      updatedWorkout.exercises = exercisesResult.rows;
      
      client.release();
      res.json(updatedWorkout);
    } catch (error) {
      // If error, rollback transaction
      await client.query('ROLLBACK');
      client.release();
      throw error;
    }
  } catch (error) {
    console.error('Error in updateWorkout:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workoutId = req.params.id;
    
    // Check if workout exists and belongs to user
    const workoutResult = await pool.query(
      `SELECT * FROM workouts WHERE id = $1 AND user_id = $2`,
      [workoutId, req.user.id]
    );
    
    if (workoutResult.rows.length === 0) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Delete exercises
      await client.query(
        `DELETE FROM exercises WHERE workout_id = $1`,
        [workoutId]
      );
      
      // Delete workout
      await client.query(
        `DELETE FROM workouts WHERE id = $1`,
        [workoutId]
      );
      
      // Commit transaction
      await client.query('COMMIT');
      
      client.release();
      res.json({ message: 'Workout removed' });
    } catch (error) {
      // If error, rollback transaction
      await client.query('ROLLBACK');
      client.release();
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteWorkout:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};