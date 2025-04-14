import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import GetStarted from "./pages/GetStarted";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStarted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
