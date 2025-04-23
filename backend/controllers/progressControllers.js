// controllers/progressControllers.js
const { pool } = require('../config/db');

// Get user's progress data
exports.getProgress = async (req, res) => {
  try {
    const progressResult = await pool.query(
      `SELECT * FROM progress WHERE user_id = $1 ORDER BY date ASC`,
      [req.user.id]
    );
    
    res.json(progressResult.rows);
  } catch (error) {
    console.error('Error in getProgress:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add new progress entry
exports.addProgress = async (req, res) => {
  try {
    const { date, weight, chest, waist, hips, arms, thighs } = req.body;
    
    if (!date) {
      return res.status(400).json({ message: 'Please provide a date' });
    }
    
    // Check if there's already an entry for the given date
    const existingEntryResult = await pool.query(
      `SELECT * FROM progress WHERE user_id = $1 AND date = $2`,
      [req.user.id, date]
    );
    
    if (existingEntryResult.rows.length > 0) {
      // Update existing entry
      const updateResult = await pool.query(
        `UPDATE progress 
         SET weight = $1, chest = $2, waist = $3, hips = $4, arms = $5, thighs = $6 
         WHERE id = $7 RETURNING *`,
        [
          weight || null,
          chest || null,
          waist || null,
          hips || null,
          arms || null,
          thighs || null,
          existingEntryResult.rows[0].id
        ]
      );
      
      res.json(updateResult.rows[0]);
    } else {
      // Create new entry
      const newEntryResult = await pool.query(
        `INSERT INTO progress 
         (user_id, date, weight, chest, waist, hips, arms, thighs)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          req.user.id,
          date,
          weight || null,
          chest || null,
          waist || null,
          hips || null,
          arms || null,
          thighs || null
        ]
      );
      
      res.status(201).json(newEntryResult.rows[0]);
    }
  } catch (error) {
    console.error('Error in addProgress:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get weight progress
exports.getWeightProgress = async (req, res) => {
  try {
    const weightResult = await pool.query(
      `SELECT date, weight FROM progress 
       WHERE user_id = $1 AND weight IS NOT NULL 
       ORDER BY date ASC`,
      [req.user.id]
    );
    
    res.json(weightResult.rows);
  } catch (error) {
    console.error('Error in getWeightProgress:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get measurement progress for a specific measurement type
exports.getMeasurementProgress = async (req, res) => {
  try {
    const { measurement } = req.params;
    
    // Validate measurement type
    const validMeasurements = ['weight', 'chest', 'waist', 'hips', 'arms', 'thighs'];
    if (!validMeasurements.includes(measurement)) {
      return res.status(400).json({ message: 'Invalid measurement type' });
    }
    
    const measurementResult = await pool.query(
      `SELECT date, ${measurement} FROM progress 
       WHERE user_id = $1 AND ${measurement} IS NOT NULL 
       ORDER BY date ASC`,
      [req.user.id]
    );
    
    res.json(measurementResult.rows);
  } catch (error) {
    console.error('Error in getMeasurementProgress:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};