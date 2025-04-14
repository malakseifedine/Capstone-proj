import { Link } from "react-router";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome Back to FitTrack
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Let’s keep moving forward. Access your fitness tools below.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/meals"
            className="bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow text-center"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Meal Planner
            </h3>
            <p className="text-sm text-gray-600">
              View or customize your meal plan
            </p>
          </Link>

          <Link
            to="/workout"
            className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow text-center"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Workouts
            </h3>
            <p className="text-sm text-gray-600">
              Start or schedule your next workout
            </p>
          </Link>

          <Link
            to="/progress"
            className="bg-yellow-100 hover:bg-yellow-200 p-6 rounded-lg shadow text-center"
          >
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">
              Progress
            </h3>
            <p className="text-sm text-gray-600">
              Track your goal achievements
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
