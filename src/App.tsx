import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/dashboard/Login";
import FinancialSummary from "./components/dashboard/FinancialSummary";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const SalesPerformance = lazy(() => import("./components/dashboard/SalesPerformance"),);
  const Procurement = lazy(() => import("./components/dashboard/Procurement"));
  const Inventory = lazy(() => import("./components/dashboard/Inventory"));
  const CashFlow = lazy(() => import("./components/dashboard/CashFlow"));
  const Account = lazy(() => import("./components/dashboard/Account"));
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          {/*<Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />*/}
          <Route index element={<Home />} />
          <Route path="financial-summary" element={<FinancialSummary />} />
          <Route path="sales-performance" element={<SalesPerformance />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="cash-flow" element={<CashFlow />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
