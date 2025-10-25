import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored token on initial load
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      // In a real app, you'd validate the token with your backend
      setUser({ token: storedToken }); // Simplified user object
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
