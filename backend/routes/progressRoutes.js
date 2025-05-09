// routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProgress,
  addProgress,
  updateProgress,
  deleteProgress,
  getWeightProgress,
  getMeasurementProgress
} = require('../controllers/progressControllers');
const { protect } = require('../middleware/auth');


router.use(protect);

router.route('/')
  .get(getProgress)
  .post(addProgress);

router.route('/:id')
  .put(updateProgress)
  .delete(deleteProgress);

router.route('/weight')
  .get(getWeightProgress);

router.route('/measurement/:measurement')
  .get(getMeasurementProgress);

module.exports = router;