import React, { createContext, useState, useContext, useEffect } from "react";

// Create the Auth Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState("");
    // Ericson Added API Backend - Token state for API authentication
    const [token, setToken] = useState("");
    
    useEffect(() => {
        const checkUserAuth = () => {
            const isLoggedIn = localStorage.getItem("loggedIn");
            const storedUser = localStorage.getItem("user");
            // Ericson Added API Backend - Retrieve token from localStorage
            const storedToken = localStorage.getItem("token");
            
            if (isLoggedIn === "true" && storedUser && storedToken) {
                try {
                    const userData = JSON.parse(storedUser);
                    setCurrentUser(userData);
                    // Ericson Added API Backend - Set token from storage
                    setToken(storedToken);
                } catch (error) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("loggedIn");
                    // Ericson Added API Backend - Clear token on error
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        
        checkUserAuth();
    }, []);

    // Ericson Added API Backend - Modified login function for API authentication
    const login = async (username, password) => {
        try {
            // Ericson Added API Backend - API endpoint
            const apiUrl = "http://26.45.117.162/test_api/api/token";
            
            // Ericson Added API Backend - Request payload
            const postData = JSON.stringify({
                mUsername: username,
                mPassword: password
            });

            // Ericson Added API Backend - API call
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: postData
            });

            if (response.ok) {
                const data = await response.json();
                
                // Ericson Added API Backend - Check for access token
                if (data.access_token) {
                    const userData = {
                        username: username,
                        name: username
                    };
                    
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("user", JSON.stringify(userData));
                    // Ericson Added API Backend - Store token
                    localStorage.setItem("token", data.access_token);
                    
                    setCurrentUser(userData);
                    setToken(data.access_token);
                    setAuthError("");
                    return { success: true };
                }
            }
            
            // Ericson Added API Backend - Standard error message for failed login
            setAuthError("Invalid credentials. Please try again.");
            return { success: false };
            
        } catch (error) {
            // Ericson Added API Backend - Consistent error message
            setAuthError("Invalid credentials. Please try again.");
            return { success: false };
        }
    };

    const logout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user");
        // Ericson Added API Backend - Remove token on logout
        localStorage.removeItem("token");
        setCurrentUser(null);
        setToken("");
    };

    const isAuthenticated = () => {
        // Ericson Added API Backend - Check both user and token
        return !!currentUser && !!token;
    };

    const value = {
        currentUser,
        // Ericson Added API Backend - Expose token
        token,
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




