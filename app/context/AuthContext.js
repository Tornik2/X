"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
    console.log(user)
  // Function to fetch the user from your API endpoint
  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
        console.log(token)
      const res = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          "Authorization": token ? `Bearer ${token}` : "", // Pass token in Authorization header
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const accessToken = localStorage.getItem("token"); // Retrieve token from localStorage
    setToken(accessToken);
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
