import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard"
import { Game } from "./Components/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />}></Route>
          <Route path="/random" element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
