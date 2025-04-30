import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../context/LoginContext';
import TopNavigation from "../layout/TopNavigation";

const dummyUsers = [
    { username: "A19-001", password: "password123" },
    { username: "A19-002", password: "mypass456" },
  ];
  
  const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, currentUser } = useAuth();
    const navigate = useNavigate();

    if (currentUser) {
      return <Navigate to="/" replace />;
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      
      if (!username || !password) {
        setError('Please enter both username and password');
        return;
      }
  
      const success = login(username, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation />
      <div className="flex-grow flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Demo credentials: A19-001 / password123</p>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © {new Date().getFullYear()} qASA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Login;
