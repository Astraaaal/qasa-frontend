import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/pages/Login";
import { ThemeProvider } from "./components/context/ThemeContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/context/ProtectedRoute";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";

  const Dashboard = lazy(() => import("./components/pages/home"));
  const FinancialSummary = lazy(() => import("./components/pages/FinancialSummary"));
  const SalesPerformance = lazy(() => import("./components/pages/SalesPerformance"));
  const Procurement = lazy(() => import("./components/pages/Procurement"));
  const Inventory = lazy(() => import("./components/pages/Inventory"));
  const CashFlow = lazy(() => import("./components/pages/CashFlow"));
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ThemeProvider>
        <>
          <DashboardLayout isLoggedIn={isLoggedIn}>
          <Routes>
            {!isLoggedIn &&(
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
              </>
            )}
            

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/financial-summary" element={<FinancialSummary />} />
              <Route path="/sales-performance" element={<SalesPerformance />} />
              <Route path="/procurement" element={<Procurement />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/cash-flow" element={<CashFlow />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
          </DashboardLayout>
        </>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
