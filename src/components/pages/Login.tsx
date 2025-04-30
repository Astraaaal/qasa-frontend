import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyUsers = [
  { username: "A19-001", password: "password123" },
  { username: "A19-002", password: "mypass456" },
  { username: "123", password: "123" },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // ✅ Add success state
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const foundUser = dummyUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      // ✅ Success case
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("studentId", username);
      localStorage.setItem("loginStatus", "success");
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/"), 1500); // wait briefly before navigating
    } else {
      // ❌ Failure case
      setError("Invalid credentials. Please try again.");
      localStorage.setItem("loginStatus", "failed");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login to qASA</h2>

        {/* ✅ Show success message */}
        {success && (
          <div className="text-green-600 text-sm mb-2">Login successful! Redirecting...</div>
        )}

        {/* ❌ Show error message */}
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
