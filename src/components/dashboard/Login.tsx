import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const dummyUsers = [
    { username: "A19-001", password: "password123" },
    { username: "A19-002", password: "mypass456" },
  ];
  
  const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Dummy login logic
      const foundUser = dummyUsers.find(
        (user) => user.username === username && user.password === password
      );
  
      if (foundUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("studentId", username);
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
  
      
      // API Login (commented out for now)
      /*try {
        const response = await fetch("https://dummyjson.com/c/4a21-c93a-4d5f-9f43", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok && data.success) {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
          navigate("/");
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setError("Login failed. Please check your connection.");
      }
      */
    };
      
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login to qASA</h2>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#1C61A1] text-white py-2 rounded"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
