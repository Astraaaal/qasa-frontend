import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { useAuth } from "@/components/context/AuthContext";
import { tryCatch } from "@/lib/try-catch";

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
  const { login, loading, isAuthenticated, accessToken, expiresIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // remove previous error msg first
    setError(undefined);

    const { data, error } = await tryCatch(login(username, password));

    // check error, handle if there's any
    if (error) {
      setError(error.message);
    } else {
      // if data is true, redirect
      setSuccess(true);
      // redirect("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Login to qASA
        </h2>

        {success && (
          <div className="text-green-600 text-sm mb-2">
            Login successful! Redirecting...
          </div>
        )}

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
          disabled={loading}
          className="w-full bg-[#1C61A1] text-white py-2 rounded disabled:bg-[#7FA1C1]"
        >
          {!loading ? "Log in" : "Logging in..."}
        </button>
      </div>
    </div>
  );
};

export default Login;
