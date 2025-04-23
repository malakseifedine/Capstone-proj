// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Workout services
export const workoutService = {
  getWorkouts: () => api.get('/workouts'),
  getWorkout: (id) => api.get(`/workouts/${id}`),
  createWorkout: (workoutData) => api.post('/workouts', workoutData),
  updateWorkout: (id, workoutData) => api.put(`/workouts/${id}`, workoutData),
  deleteWorkout: (id) => api.delete(`/workouts/${id}`),
};

// Meal services
export const mealService = {
  getMeals: () => api.get('/meals'),
  getMealsByCategory: (category) => api.get(`/meals/category/${category}`),
  getSavedMeals: () => api.get('/meals/saved/list'),
  getMeal: (id) => api.get(`/meals/${id}`),
  createMeal: (mealData) => api.post('/meals', mealData),
  updateMeal: (id, mealData) => api.put(`/meals/${id}`, mealData),
  deleteMeal: (id) => api.delete(`/meals/${id}`),
  toggleSaveMeal: (id) => api.put(`/meals/${id}/toggle-save`),
  getMealPlan: () => api.get('/meals/plan'),
  updateMealPlan: (planData) => api.put('/meals/plan', planData),
};

// Progress services
export const progressService = {
  getProgress: () => api.get('/progress'),
  addProgress: (progressData) => api.post('/progress', progressData),
  updateProgress: (id, progressData) => api.put(`/progress/${id}`, progressData),
  deleteProgress: (id) => api.delete(`/progress/${id}`),
  getWeightProgress: () => api.get('/progress/weight'),
  getMeasurementProgress: (measurement) => api.get(`/progress/measurement/${measurement}`),
};

export default api;