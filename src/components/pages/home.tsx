import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [activeTab, setActiveTab] = useState("financial-summary");
  const { accessToken, isAuthenticated, expiresIn } = useAuth();

  useEffect(() => {
    console.log("Login.tsx saw accessToken change:", accessToken);
    console.log("am i auth'ed?", isAuthenticated);
    console.log("Access Token (from useAuth):", accessToken);
    console.log("Expiry (from useAuth):", expiresIn);
  }, [accessToken, isAuthenticated, expiresIn]);
  const [activeTab, setActiveTab] = useState("financial-summary");
  const { accessToken, isAuthenticated, expiresIn } = useAuth();

  useEffect(() => {
    console.log("Login.tsx saw accessToken change:", accessToken);
    console.log("am i auth'ed?", isAuthenticated);
    console.log("Access Token (from useAuth):", accessToken);
    console.log("Expiry (from useAuth):", expiresIn);
  }, [accessToken, isAuthenticated, expiresIn]);

  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#20476E]">dashboard</h1>
        <h1 className="text-2xl font-bold text-[#20476E]">dashboard</h1>
        <p className="text-sm text-gray-600">
          Manage your dashboard processes
          Manage your dashboard processes
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard 
          title="Pending Posting"
          count={pendingPostingCount}
          value={pendingPostingTotal}
          iconType="clock"
          color="bg-blue-50" isInventory={undefined}        />
        <SummaryCard 
          title="Pending Sales"
          count={pendingSalesCount}
          value={pendingSalesTotal}
          iconType="shopping-cart"
          color="bg-green-50" isInventory={undefined}        />
        <SummaryCard 
          title="Pending Purchases"
          count={pendingPurchasesCount}
          value={pendingPurchasesTotal}
          iconType="package"
          color="bg-purple-50" isInventory={undefined}        />
        <SummaryCard 
          title="Low Stock Items"
          count={lowStockCount}
          iconType="alert-triangle"
          color="bg-amber-50"
          isInventory={true} value={undefined}        />
      </div>

      {/* Transaction Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Posting */}
        <PendingPosting 
          pendingItems={pendingTransactions.posting}
          searchTerm={postingSearchTerm}
          setSearchTerm={setPostingSearchTerm}
        />

        {/* Pending Sales */}
        <PendingSales pendingItems={pendingTransactions.sales}
        searchItem={postingSearchTerm}
        setSearchItem={setPostingSearchTerm} />

        {/* Pending Purchases */}
        <PendingPurchases pendingItems={pendingTransactions.purchases} />

        {/* Low Stock Items */}
        <LowStockItems lowStockItems={lowStockItems} />
      </div>
    </div>
  );
};

export default Home;

