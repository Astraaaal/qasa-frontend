// src/hooks/useAuth.ts
import { useState, useEffect } from "react";

// Create a custom hook to manage authentication and token retrieval
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for the token when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Set the token in the state if it exists
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); // Clear the token state when logging out
  };

  return { token, logout };
};
