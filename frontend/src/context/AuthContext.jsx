import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState({
    userId: null,
    token: null,
  });
  const [loading, setLoading] = useState(true); // Dodato za praćenje učitavanja

  useEffect(() => {
    // Retrieve from localStorage
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    // Update state if data is found in localStorage
    if (storedUserId && storedToken) {
      setAuthData({
        userId: storedUserId,
        token: storedToken,
      });
    }
    setLoading(false); // Završeno učitavanje
  }, []);

  const login = (userId, token) => {
    setAuthData({ userId, token });
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthData({ userId: null, token: null });
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  const value = {
    ...authData, // Spread the state (userId, token)
    login,
    logout,
    loading, // Dodaj loading status
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
