import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/Progress.css";
import { progressService } from "../services/api";
import { Plus } from "lucide-react";

const Progress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weightData, setWeightData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("6m");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
  });

  const handleAddMeasurement = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const progressData = {
        date: newMeasurement.date,
        weight: newMeasurement.weight
          ? parseFloat(newMeasurement.weight)
          : null,
      };
      await progressService.addProgress(progressData);
      setNewMeasurement({
        date: new Date().toISOString().split("T")[0],
        weight: "",
      });
      setShowAddForm(false);
      fetchProgressData();
      setError(null);
    } catch (err) {
      console.error("Error adding measurement:", err);
      setError("Failed to add measurement. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProgressData = async () => {
    try {
      setIsLoading(true);
      const weightResponse = await progressService.getWeightProgress();
      const formattedWeightData = weightResponse.data.map((entry) => ({
        date: new Date(entry.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        weight: entry.weight,
      }));
      setWeightData(formattedWeightData);
      setError(null);
    } catch (err) {
      console.error("Error fetching progress data:", err);
      setError("Failed to load progress data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, [timeFrame]);

  return (
    <div className="app-container" style={{ display: "flex" }}>
      <Sidebar />
      <div className="progress-container" style={{ flex: 1, padding: "20px" }}>
        <div className="progress-header">
          <h1 className="header-title">Weight Progress</h1>
          <button
            className="add-measurement-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={18} />
            {showAddForm ? "Cancel" : "Add Weight"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showAddForm && (
          <div className="measurement-form-card">
            <h2 className="form-title">Add New Weight Measurement</h2>
            <form onSubmit={handleAddMeasurement}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="input-field"
                    value={newMeasurement.date}
                    onChange={(e) =>
                      setNewMeasurement({
                        ...newMeasurement,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    value={newMeasurement.weight}
                    onChange={(e) =>
                      setNewMeasurement({
                        ...newMeasurement,
                        weight: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="save-btn" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Weight"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="time-filter">
          {["1m", "3m", "6m", "1y"].map((frame) => (
            <button
              key={frame}
              className={`time-btn ${timeFrame === frame ? "active" : ""}`}
              onClick={() => setTimeFrame(frame)}
            >
              {frame.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Weight Tracking</h2>
          <div className="chart-container">
            {isLoading ? (
              <p className="loading-message">Loading weight data...</p>
            ) : weightData.length === 0 ? (
              <p className="empty-chart-message">
                No weight data available. Add your first weight measurement!
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={weightData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
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
            )}
          </div>
        </div>

        {weightData.length >= 2 && (
          <div className="progress-summary">
            <h2 className="section-title">Weight Progress Summary</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <h3>Starting Weight</h3>
                <p className="summary-value">{weightData[0].weight} kg</p>
              </div>
              <div className="summary-card">
                <h3>Current Weight</h3>
                <p className="summary-value">
                  {weightData[weightData.length - 1].weight} kg
                </p>
              </div>
              <div className="summary-card">
                <h3>Weight Change</h3>
                <p
                  className={`summary-value ${
                    weightData[0].weight >
                    weightData[weightData.length - 1].weight
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {(
                    weightData[0].weight -
                    weightData[weightData.length - 1].weight
                  ).toFixed(1)}{" "}
                  kg
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
