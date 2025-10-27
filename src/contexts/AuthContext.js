import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    return storedToken ? { token: storedToken } : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on initial load
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && !user) {
      setUser({ token: storedToken });
    }
    setIsLoading(false);
  }, [user]);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
