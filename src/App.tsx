import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/dashboard/Login";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const FinancialSummary = lazy(() => import("./components/dashboard/FinancialSummary"));
  const SalesPerformance = lazy(() => import("./components/dashboard/SalesPerformance"));
  const Procurement = lazy(() => import("./components/dashboard/Procurement"));
  const Inventory = lazy(() => import("./components/dashboard/Inventory"));
  const CashFlow = lazy(() => import("./components/dashboard/CashFlow"));
  const Account = lazy(() => import("./components/dashboard/Account"));
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ThemeProvider>
        <Routes>
          {/*<Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />*/}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
