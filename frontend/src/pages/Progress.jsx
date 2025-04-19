import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Progress.css";

const Progress = () => {
  const [weightData, setWeightData] = useState([
    { date: "Jan 1", weight: 76.2 },
    { date: "Jan 8", weight: 75.8 },
    { date: "Jan 15", weight: 75.1 },
    { date: "Jan 22", weight: 74.5 },
    { date: "Jan 29", weight: 74.0 },
    { date: "Feb 5", weight: 73.6 },
    { date: "Feb 12", weight: 72.8 },
  ]);

  const [workoutData, setWorkoutData] = useState([
    { week: "Week 1", sessions: 3, duration: 90, intensity: 65 },
    { week: "Week 2", sessions: 4, duration: 120, intensity: 70 },
    { week: "Week 3", sessions: 3, duration: 135, intensity: 75 },
    { week: "Week 4", sessions: 5, duration: 180, intensity: 80 },
    { week: "Week 5", sessions: 4, duration: 160, intensity: 85 },
    { week: "Week 6", sessions: 5, duration: 200, intensity: 85 },
  ]);

  const [nutritionData, setNutritionData] = useState([
    { week: "Week 1", calories: 2200, protein: 110, carbs: 220, fat: 70 },
    { week: "Week 2", calories: 2150, protein: 120, carbs: 210, fat: 65 },
    { week: "Week 3", calories: 2100, protein: 125, carbs: 200, fat: 65 },
    { week: "Week 4", calories: 2050, protein: 130, carbs: 190, fat: 60 },
    { week: "Week 5", calories: 2000, protein: 135, carbs: 180, fat: 60 },
    { week: "Week 6", calories: 2000, protein: 140, carbs: 170, fat: 55 },
  ]);

  const [measurements, setMeasurements] = useState([
    { name: "Chest", initial: 96, current: 98, goal: 100 },
    { name: "Waist", initial: 88, current: 84, goal: 80 },
    { name: "Hips", initial: 102, current: 99, goal: 97 },
    { name: "Arms", initial: 33, current: 35, goal: 38 },
    { name: "Thighs", initial: 58, current: 56, goal: 54 },
  ]);

  const [timeFrame, setTimeFrame] = useState("6m");

  const calculateProgress = (current, goal, isReverse = false) => {
    if (isReverse) {
      const initial = measurements.find((m) => m.name === "Waist").initial;
      return Math.min(
        100,
        Math.max(0, ((initial - current) / (initial - goal)) * 100)
      );
    } else {
      const initial = 0;
      return Math.min(100, Math.max(0, (current / goal) * 100));
    }
  };

  const weightProgress = () => {
    const initial = 76.2;
    const current = weightData[weightData.length - 1].weight;
    const goal = 70;
    return {
      initial,
      current,
      goal,
      percentage: Math.min(
        100,
        Math.max(0, ((initial - current) / (initial - goal)) * 100)
      ),
    };
  };

  useEffect(() => {}, [timeFrame]);

  return (
    <Layout>
      <div className="progress-container">
        <h1 className="header-title">Weight Progress</h1>
        <div className="chart-card">
          <h2 className="chart-title">Weight Tracking</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={weightData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#7e57ff"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
