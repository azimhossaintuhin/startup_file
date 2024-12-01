import React, { useState, createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "../config/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("is_logged_in") === "true");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      try {
        const response = await apiInstance.get("/auth/check-auth");
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Authentication error");
      }
    },
    onSuccess: (data) => {
      if (data?.user) {
        setIsLoggedIn(true);
        setUser(data.user);
        localStorage.setItem("is_logged_in", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    },
    onError: () => {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("is_logged_in");
      localStorage.removeItem("user");
    },
  });

  useEffect(() => {
    if (data?.user) {
      setIsLoggedIn(true);
      setUser(data.user);
      localStorage.setItem("is_logged_in", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("is_logged_in", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        isLoading,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
