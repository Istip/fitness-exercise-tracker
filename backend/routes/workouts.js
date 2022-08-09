const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workout.controller');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

// Use requireAuth middleware over every route below
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

//GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router;
