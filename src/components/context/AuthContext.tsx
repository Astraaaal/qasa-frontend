import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the Auth Context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Dummy users with name information
const dummyUsers = [
  { 
    username: "michael", 
    password: "michael",
    name: "Michael Angelo A Gonzales"
  },
  { 
    username: "123", 
    password: "123",
    name: "Test User"
  },
  { 
    username: "rhandie", 
    password: "rhandie",
    name: "Rhandie C Matre Jr."
  },
];

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState("");
    
    // Check if user is already logged in from localStorage
    useEffect(() => {
        const checkUserAuth = () => {
            const isLoggedIn = localStorage.getItem("loggedIn");
            const storedUser = localStorage.getItem("user");
            
            if (isLoggedIn === "true" && storedUser) {
                try {
                    const userData = JSON.parse(storedUser);
                    setCurrentUser(userData);
                } catch (error) {
                    console.error("Error parsing user data:", error);
                    localStorage.removeItem("user");
                    localStorage.removeItem("loggedIn");
                }
            }
            setLoading(false);
        };
        
        checkUserAuth();
    }, []);

    // Login function
    const login = (username, password) => {
        // Find user in our dummy database
        const foundUser = dummyUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (foundUser) {
            // Create user object without password
            const userData = {
                username: foundUser.username,
                name: foundUser.name
            };
            
            // Save to localStorage
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("studentId", username);
            localStorage.setItem("loginStatus", "success");
            localStorage.setItem("user", JSON.stringify(userData));
            
            // Update state
            setCurrentUser(userData);
            setAuthError("");
            return { success: true, message: "Login successful" };
        } else {
            setAuthError("Invalid credentials. Please try again.");
            localStorage.setItem("loginStatus", "failed");
            return { success: false, message: "Invalid credentials" };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("studentId");
        localStorage.removeItem("loginStatus");
        localStorage.removeItem("user");
        setCurrentUser(null);
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!currentUser;
    };

    const value = {
        currentUser,
        login,
        logout,
        loading,
        authError,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;