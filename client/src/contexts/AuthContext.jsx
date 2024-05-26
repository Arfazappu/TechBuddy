import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your application and provide authentication context
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const login = (email, id, token) => {
    setIsLoggedIn(true);
    setCurrentUser({ email, id, token });
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({ email, id, token }));
    localStorage.setItem("authToken",token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
