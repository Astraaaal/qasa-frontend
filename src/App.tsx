import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/home";
import Login from "./components/dashboard/Login";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const FinancialSummary = lazy(() => import("./components/pages/FinancialSummary"));
  const TestFinancial = lazy(() => import("./components/pages/testFinancial"));
  const SalesPerformance = lazy(() => import("./components/pages/SalesPerformance"));
  const Procurement = lazy(() => import("./components/pages/Procurement"));
  const Inventory = lazy(() => import("./components/pages/Inventory"));
  const CashFlow = lazy(() => import("./components/pages/CashFlow"));
  const Procurements = lazy(() => import("./components/pages/procurementt"));
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ThemeProvider>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/financial-summary" element={<FinancialSummary />} />
            <Route path="/sales-performance" element={<SalesPerformance />} />
            <Route path="/procurement" element={<Procurement />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/cash-flow" element={<CashFlow />} />
            <Route path="/test-financial" element={<TestFinancial />} />
            <Route path="/procurementt" element={<Procurements />} />
            {/*<Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />*/}
          </Routes>
        </DashboardLayout>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
