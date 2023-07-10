import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Direction from "./components/Documentation/Direction.jsx"
function App() {
  return (
    <div className="w-full h-[100%] bg-red-300">
         <div className=' w-full h-full bg-red-200' >
             <Direction/>
          </div>
    </div>
  );
}

export default App;
