import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Meals from "./pages/Meals";
// Removed unused import

const router = createBrowserRouter([
  {
    path: "/",
    element: <GetStarted />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/meals",
    element: <Meals />,
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/" replace />,
  // },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
