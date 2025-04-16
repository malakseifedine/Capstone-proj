import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
// import GetStarted from "./pages/GetStarted";
// import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Meals from "./pages/Meals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Meals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
