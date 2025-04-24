import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Workouts.css";

// In Workouts.jsx

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    date: new Date().toISOString().split("T")[0],
    exercises: [],
    duration: 30,
    caloriesBurned: 0,
  });
  const [currentExercise, setCurrentExercise] = useState({
    name: "",
    sets: 3,
    reps: 10,
  });

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleAddExercise = () => {
    if (!currentExercise.name) return;

    const exercise = {
      id: `exercise-${Date.now()}`,
      name: currentExercise.name || "",
      sets: currentExercise.sets || 3,
      reps: currentExercise.reps || 10,
      weight: currentExercise.weight,
    };

    setNewWorkout({
      ...newWorkout,
      exercises: [...(newWorkout.exercises || []), exercise],
    });

    setCurrentExercise({
      name: "",
      sets: 3,
      reps: 10,
      weight: undefined,
    });
  };
  const fetchWorkouts = async () => {
    try {
      setIsLoading(true);
      const response = await workoutService.getWorkouts();
      setWorkouts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching workouts:", err);
      setError("Failed to load workouts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveWorkout = async () => {
    if (!newWorkout.date || !newWorkout.exercises?.length) return;

    try {
      setIsLoading(true);

      // Format data to match API expectations
      const workoutData = {
        date: newWorkout.date,
        exercises: newWorkout.exercises.map((ex) => ({
          name: ex.name,
          sets: parseInt(ex.sets) || 3,
          reps: parseInt(ex.reps) || 10,
          weight: ex.weight ? parseFloat(ex.weight) : null,
        })),
        duration: parseInt(newWorkout.duration) || 30,
        caloriesBurned: parseInt(newWorkout.caloriesBurned) || 0,
        notes: newWorkout.notes || "",
      };

      await workoutService.createWorkout(workoutData);

      // Reset form and fetch updated workouts
      setShowAddForm(false);
      setNewWorkout({
        date: new Date().toISOString().split("T")[0],
        exercises: [],
        duration: 30,
        caloriesBurned: 0,
        notes: "",
      });
      await fetchWorkouts();
      setError(null);
    } catch (err) {
      console.error("Error saving workout:", err);
      setError("Failed to save workout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWorkout = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        setIsLoading(true);
        await workoutService.deleteWorkout(id);
        await fetchWorkouts();
        setError(null);
      } catch (err) {
        console.error("Error deleting workout:", err);
        setError("Failed to delete workout. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveExercise = (indexToRemove) => {
    setNewWorkout({
      ...newWorkout,
      exercises: (newWorkout.exercises || []).filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="workout-container">
        <div className="header-row">
          <h1 className="header-title">Workout Tracking</h1>
          <button
            className="add-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Cancel" : "Add Workout"}
          </button>
        </div>

        {showAddForm && (
          <div className="form-card">
            <h2 className="form-title">Add New Workout</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={newWorkout.date}
                  onChange={(e) =>
                    setNewWorkout({ ...newWorkout, date: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  className="input-field"
                  value={newWorkout.duration}
                  onChange={(e) =>
                    setNewWorkout({
                      ...newWorkout,
                      duration: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Calories Burned</label>
                <input
                  type="number"
                  className="input-field"
                  value={newWorkout.caloriesBurned}
                  onChange={(e) =>
                    setNewWorkout({
                      ...newWorkout,
                      caloriesBurned: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="exercise-section">
              <h3 className="exercise-title">Exercises</h3>

              {(newWorkout.exercises || []).length > 0 && (
                <table className="exercise-table">
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Sets</th>
                      <th>Reps</th>
                      <th>Weight</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(newWorkout.exercises || []).map((exercise, index) => (
                      <tr key={index}>
                        <td>{exercise.name}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.reps}</td>
                        <td>{exercise.weight || "-"}</td>
                        <td>
                          <button
                            className="remove-btn"
                            onClick={() => handleRemoveExercise(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="exercise-form">
                <input
                  type="text"
                  placeholder="Exercise name"
                  className="input-field"
                  value={currentExercise.name}
                  onChange={(e) =>
                    setCurrentExercise({
                      ...currentExercise,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Sets"
                  className="input-field"
                  value={currentExercise.sets}
                  onChange={(e) =>
                    setCurrentExercise({
                      ...currentExercise,
                      sets: parseInt(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Reps"
                  className="input-field"
                  value={currentExercise.reps}
                  onChange={(e) =>
                    setCurrentExercise({
                      ...currentExercise,
                      reps: parseInt(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Weight (optional)"
                  className="input-field"
                  value={currentExercise.weight || ""}
                  onChange={(e) =>
                    setCurrentExercise({
                      ...currentExercise,
                      weight: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                />
              </div>

              <button className="add-exercise-btn" onClick={handleAddExercise}>
                Add Exercise
              </button>
            </div>

            <div className="form-footer">
              <button className="save-btn" onClick={handleSaveWorkout}>
                Save Workout
              </button>
            </div>
          </div>
        )}

        <div className="workout-list">
          <h2 className="section-title">Your Workouts</h2>
          {workouts.length === 0 ? (
            <p className="empty-msg">No workout sessions recorded yet.</p>
          ) : (
            <div className="workout-cards">
              {workouts.map((workout) => (
                <div key={workout.id} className="workout-card">
                  <div className="workout-header">
                    <h3>
                      Workout on {new Date(workout.date).toLocaleDateString()}
                    </h3>
                    <span>
                      {workout.duration} min • {workout.caloriesBurned} calories
                    </span>
                  </div>
                  <table className="exercise-table">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workout.exercises.map((exercise) => (
                        <tr key={exercise.id}>
                          <td>{exercise.name}</td>
                          <td>{exercise.sets}</td>
                          <td>{exercise.reps}</td>
                          <td>{exercise.weight || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
