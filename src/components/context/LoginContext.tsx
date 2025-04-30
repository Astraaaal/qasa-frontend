import { createContext, useState, useContext, useEffect, Children } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //check if user is already logged in from localstorage
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    //login func
    const login = (username, password) => {
        //api call here

        //demo dummy acc
        if (username === 'username' && password === 'password') {
            const user = { username, name: 'Demo User'};
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
        return true;
        }
        return false;
    };

    //logout func
    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}