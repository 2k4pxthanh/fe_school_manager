// src/context/AuthContext.js

import React, { createContext, useContext, useState } from "react";

// Create an AuthContext
const AuthContext = createContext();

// AuthProvider component that wraps the entire app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default state (not authenticated)

  // Function to login the user (you can call your API for authentication)
  const login = () => setIsAuthenticated(true);

  // Function to logout the user
  const logout = () => setIsAuthenticated(false);

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
