
import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import GetStarted from './pages/get-started';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<GetStarted/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
