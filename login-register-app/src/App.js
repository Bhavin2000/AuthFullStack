import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./component/dashboard";
import Auth from "./component/auth";
import { getToken, removeToken } from "./component/tokenUtils"; // Assuming we have the token utility functions
import { verifyToken } from "./services/api";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Function to check if token is valid
  const checkTokenValidity = async () => {
    const token = getToken();

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      await verifyToken(token);
      setIsAuthenticated(true); 
    }
    catch (error) {
      console.log("Error verifying token:");
      setIsAuthenticated(false); 
      removeToken(); // Remove invalid token
    }
  };

  // Check token validity on refresh
  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Auth setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
