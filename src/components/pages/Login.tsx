import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/components/service/api/auth"; // ✅ Adjust path if needed
import { useAuth } from "@/components/service/contexts/AuthContext"; // ✅ Import Auth Context

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { setToken } = useAuth(); // ✅ Use the auth context

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await loginUser(username, password);

    if (result && result.token) {
      setToken(result.token); // ✅ Store token via context

      localStorage.setItem("studentId", username);
      localStorage.setItem("loggedIn", "true");
      setSuccess(true);
      setTimeout(() => navigate("/"), 1000); // ✅ Redirect
    } else {
      setError("Invalid username or password.");
      localStorage.setItem("loggedIn", "false");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login to qASA</h2>

        {success && (
          <div className="text-green-600 text-sm mb-2">
            Login successful! Redirecting...
          </div>
        )}

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#1C61A1] text-white py-2 rounded"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;