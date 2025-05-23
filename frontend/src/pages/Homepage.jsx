import { React, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Dumbbell, Flame, Utensils, TrendingUp } from "lucide-react";
import "../styles/Homepage.css";
import { authService, workoutService, progressService } from "../services/api";

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [weightProgress, setWeightProgress] = useState([]);
  const [stats, setStats] = useState({
    calories: { current: 0, target: 2000 },
    workouts: { current: 0, target: 5 },
  });

  // const calculateDailyCalories = (workouts) => {
  //   const today = new Date().toISOString().split("T")[0];
  //   return workouts
  //     .filter((workout) => workout.date.startsWith(today))
  //     .reduce((total, workout) => total + (workout.caloriesBurned || 0), 0);
  // };
  const calculateDailyCalories = (workouts) => {
    const todayStr = new Date().toDateString();
    return workouts
      .filter((workout) => new Date(workout.date).toDateString() === todayStr)
      .reduce(
        (total, workout) => total + Number(workout.calories_burned || 0),
        0
      );
  };

  const calculateGoalProgress = (weightProgress, user) => {
    const startWeight = weightProgress[0]?.weight || 0;
    const currentWeight =
      weightProgress[weightProgress.length - 1]?.weight || 0;
    const goal = user.goalWeight || 0;
    return ((startWeight - currentWeight) / (startWeight - goal)) * 100;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Get user data
        const userResponse = await authService.getCurrentUser();
        setUser(userResponse.data);

        // Get workouts
        const workoutsResponse = await workoutService.getWorkouts();
        setWorkouts(workoutsResponse.data);

        // Get weight progress
        const weightResponse = await progressService.getWeightProgress();
        setWeightProgress(weightResponse.data);

        // Calculate weekly workout stats
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());

        const workoutsThisWeek = workoutsResponse.data.filter((workout) => {
          const workoutDate = new Date(workout.date);
          return workoutDate >= weekStart && workoutDate <= now;
        });

        const dailyCalories = calculateDailyCalories(workoutsResponse.data);

        // Calculate stats
        setStats({
          calories: {
            current: dailyCalories,
            target: 2000,
          },
          workouts: {
            current: workoutsThisWeek.length,
            target: 5,
          },
          goalProgress: calculateGoalProgress(
            weightResponse.data,
            userResponse.data
          ),
        });

        setError(null);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Layout>
      <div className="homepage-container">
        <div className="welcome-section">
          <div>
            <h1 className="welcome-title">
              Welcome back, {user ? user.name : "user"}!
            </h1>
            <p className="welcome-subtitle">
              Track your progress and stay motivated.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="card">
            <div className="card-header">
              <div className="icon purple">
                <Flame size={20} />
              </div>
              <div>
                <p className="card-label">Today's Calories</p>
                <p className="card-value">
                  {stats.calories.current} / {stats.calories.target}
                </p>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress purple"
                style={{
                  width: `${Math.min(
                    (stats.calories.current / stats.calories.target) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="icon blue">
                <Dumbbell size={20} />
              </div>
              <div>
                <p className="card-label">Workouts This Week</p>
                <p className="card-value">
                  {stats.workouts.current} / {stats.workouts.target}
                </p>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress blue"
                style={{
                  width: `${Math.min(
                    (stats.workouts.current / stats.workouts.target) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Today's Plan</h2>
          <div className="plan-list">
            {[
              {
                icon: <Utensils size={20} />,
                title: "Breakfast",
                desc: "Protein smoothie with berries and oats",
                kcal: "450 kcal",
                time: "8:00 AM",
                color: "purple",
              },
              {
                icon: <Dumbbell size={20} />,
                title: "Upper Body Workout",
                desc: "45 min · Strength training",
                time: "10:30 AM",
                btn: true,
                color: "blue",
              },
              {
                icon: <Utensils size={20} />,
                title: "Lunch",
                desc: "Grilled chicken salad with avocado",
                kcal: "550 kcal",
                time: "1:00 PM",
                color: "purple",
              },
            ].map((item, idx) => (
              <div className="plan-item" key={idx}>
                <div className={`icon-box ${item.color}`}>{item.icon}</div>
                <div className="plan-info">
                  <p className="plan-title">{item.title}</p>
                  <p className="plan-desc">{item.desc}</p>
                </div>
                <div className="plan-meta">
                  {item.kcal && <p className="plan-kcal">{item.kcal}</p>}
                  <p className="plan-time">{item.time}</p>
                  {item.btn && (
                    <button className="btn small blue">Start</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="progress-preview">
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Weight Progress</h2>
              <a href="#" className="section-link">
                View All
              </a>
            </div>
            <div className="chart">
              {[65, 64.5, 64, 63.8, 64.2, 63.5, 63].map((w, i) => (
                <div key={i} className="bar-container">
                  <div
                    className="bar"
                    style={{ height: `${(w - 60) * 10}px` }}
                  ></div>
                  <p className="bar-label">{"MTWTFSS"[i]}</p>
                </div>
              ))}
            </div>
            <div className="trend">
              <TrendingUp size={16} className="trend-icon green" />
              <span className="trend-text green">-2 kg this month</span>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Upcoming Workouts</h2>
              <a href="#" className="section-link">
                Schedule
              </a>
            </div>
            <div className="workout-list">
              {[
                {
                  name: "Lower Body Focus",
                  time: "Tomorrow · 9:00 AM",
                  color: "blue",
                },
                {
                  name: "HIIT Session",
                  time: "Wednesday · 5:30 PM",
                  color: "green",
                },
                {
                  name: "Full Body Workout",
                  time: "Friday · 7:00 AM",
                  color: "purple",
                },
              ].map((w, i) => (
                <div className="workout-item" key={i}>
                  <div className={`icon-box ${w.color}`}>
                    <Dumbbell size={20} />
                  </div>
                  <div className="workout-info">
                    <p className="workout-title">{w.name}</p>
                    <p className="workout-time">{w.time}</p>
                  </div>
                  <button className="btn small blue">Join</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
