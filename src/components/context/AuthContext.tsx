// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create the Auth Context
// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [authError, setAuthError] = useState("");
//     // Ericson Added API Backend - Token state for API authentication
//     const [token, setToken] = useState("");
    
//     useEffect(() => {
//         const checkUserAuth = () => {
//             const isLoggedIn = localStorage.getItem("loggedIn");
//             const storedUser = localStorage.getItem("user");
//             // Ericson Added API Backend - Retrieve token from localStorage
//             const storedToken = localStorage.getItem("token");
            
//             if (isLoggedIn === "true" && storedUser && storedToken) {
//                 try {
//                     const userData = JSON.parse(storedUser);
//                     setCurrentUser(userData);
//                     // Ericson Added API Backend - Set token from storage
//                     setToken(storedToken);
//                 } catch (error) {
//                     localStorage.removeItem("user");
//                     localStorage.removeItem("loggedIn");
//                     // Ericson Added API Backend - Clear token on error
//                     localStorage.removeItem("token");
//                 }
//             }
//             setLoading(false);
//         };
        
//         checkUserAuth();
//     }, []);

//     // Ericson Added API Backend - Modified login function for API authentication
//     const login = async (username, password) => {
//         try {
//             // Ericson Added API Backend - API endpoint
//             const apiUrl = "http://26.45.117.162/test_api/api/token";
            
//             // Ericson Added API Backend - Request payload
//             const postData = JSON.stringify({
//                 mUsername: username,
//                 mPassword: password
//             });

//             // Ericson Added API Backend - API call
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: postData
//             });

//             if (response.ok) {
//                 const data = await response.json();
                
//                 // Ericson Added API Backend - Check for access token
//                 if (data.access_token) {
//                     const userData = {
//                         username: username,
//                         name: username
//                     };
                    
//                     localStorage.setItem("loggedIn", "true");
//                     localStorage.setItem("user", JSON.stringify(userData));
//                     // Ericson Added API Backend - Store token
//                     localStorage.setItem("token", data.access_token);
                    
//                     setCurrentUser(userData);
//                     setToken(data.access_token);
//                     setAuthError("");
//                     return { success: true };
//                 }
//             }
            
//             // Ericson Added API Backend - Standard error message for failed login
//             setAuthError("Invalid credentials. Please try again.");
//             return { success: false };
            
//         } catch (error) {
//             // Ericson Added API Backend - Consistent error message
//             setAuthError("Invalid credentials. Please try again.");
//             return { success: false };
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem("loggedIn");
//         localStorage.removeItem("user");
//         // Ericson Added API Backend - Remove token on logout
//         localStorage.removeItem("token");
//         setCurrentUser(null);
//         setToken("");
//     };

//     const isAuthenticated = () => {
//         // Ericson Added API Backend - Check both user and token
//         return !!currentUser && !!token;
//     };

//     const value = {
//         currentUser,
//         // Ericson Added API Backend - Expose token
//         token,
//         login,
//         logout,
//         loading,
//         authError,
//         isAuthenticated
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;





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




