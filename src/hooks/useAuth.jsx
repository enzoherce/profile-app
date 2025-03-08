import { createContext, useContext, useState, useEffect } from "react";

// Create the authentication context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  // Load login state from local storage (to persist user session)
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState === "true") {
      setIsLogin(true);
    }
  }, []);

  // Function to log in
  const login = () => {
    setIsLogin(true);
    localStorage.setItem("isLogin", "true"); // Store login state
  };

  // Function to log out
  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin"); // Remove login state
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
