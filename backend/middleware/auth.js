
// middleware/auth.js
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    const userResult = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [decoded.id]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    
    // Set user in request
    req.user = userResult.rows[0];
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};  