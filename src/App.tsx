import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/dashboard/Login";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
