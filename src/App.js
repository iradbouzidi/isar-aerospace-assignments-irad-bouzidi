import React from "react";
import AssignmentA from "./components/AssignmentA"; // Importing AssignmentA component
import AssignmentB from "./components/AssignmentB"; // Importing AssignmentB component
import { Routes, Route, useNavigate } from "react-router-dom"; // Importing necessary elements from react-router-dom for routing

import "./App.css";

const App = () => {
  // Initializing navigate function using useNavigate hook from react-router-dom
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Route for the root path */}
      <Route
        path="/"
        element={
          // JSX element for the root path, displaying title and buttons for navigation
          <>
            <h1 className="container">ISAR Aerospace</h1>
            {/* Button to navigate to AssignmentA */}
            <button
              className="aerospace-btn"
              onClick={() => navigate("/assignment-a")} // onClick event to navigate to /assignment-a path
            >
              Assignment A
            </button>
            {/* Button to navigate to AssignmentB */}
            <button
              className="aerospace-btn"
              onClick={() => navigate("/assignment-b")} // onClick event to navigate to /assignment-b path
            >
              Assignment B
            </button>
          </>
        }
      />
      {/* Route for /assignment-a path, rendering AssignmentA component */}
      <Route path="/assignment-a" element={<AssignmentA />} />
      {/* Route for /assignment-b path, rendering AssignmentB component */}
      <Route path="/assignment-b" element={<AssignmentB />} />
    </Routes>
  );
};

export default App;
