// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Eye, EyeOff } from "lucide-react";
// import qasaLogo from '../assets/qASA-logo.png';

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login, currentUser, authError } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (currentUser) {
//       navigate("/dashboard");
//     }
//   }, [currentUser, navigate]);

//   useEffect(() => {
//     if (authError) {
//       // Ericson Added API Backend - Display API error message
//       setError(authError);
//     }
//   }, [authError]);

//   // Ericson Added API Backend - Modified login handler for API
//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     if (!username || !password) {
//       setError("Please enter both username and password");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const result = await login(username, password);
      
//       if (result.success) {
//         setSuccess(true);
//         setTimeout(() => navigate("/dashboard"), 1500);
//       }
//     } catch (err) {
//       // Ericson Added API Backend - Show standard error message
//       setError("Invalid credentials. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        

//         <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">
//           Sign in to your qASA account
//         </h3>

//         {success && (
//           <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
//             Login successful! Redirecting...
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label 
//               htmlFor="username" 
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C61A1] focus:border-transparent"
//               disabled={isLoading}
//             />
//           </div>
          
//           <div className="mb-6">
//             <label 
//               htmlFor="password" 
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C61A1] focus:border-transparent"
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 tabIndex={-1}
//               >
//                 {showPassword ? (
//                   <EyeOff size={20} className="text-gray-500" />
//                 ) : (
//                   <Eye size={20} className="text-gray-500" />
//                 )}
//               </button>
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             className={`w-full bg-[#1C61A1] text-white py-3 rounded-md font-medium transition ${
//               isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#155085]"
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Signing in..." : "Sign in"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import qasaLogo from '../assets/qASA-logo.png'; // Make sure this path is correct

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, currentUser, authError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  // Update local error state if auth context has an error
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = login(username, password);
      
      if (result.success) {
        setSuccess(true);
        // Delay navigation to show success message
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">
          Sign in to your qASA account
        </h3>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            Login successful! Redirecting...
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C61A1] focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C61A1] focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-[#1C61A1] text-white py-3 rounded-md font-medium transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#155085]"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo accounts:</p>
          <p className="mt-1">Username: michael, Password: michael</p>
          <p className="mt-1">Username: 123, Password: 123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;