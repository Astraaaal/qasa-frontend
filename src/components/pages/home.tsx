import React, { useState } from 'react';
import SummaryCard from '../modules/homeDashboard/SummaryCard';
import PendingPosting from '../modules/homeDashboard/PendingPosting';
import PendingSales from '../modules/homeDashboard/PendingSales';
import PendingPurchases from '../modules/homeDashboard/PendingPurchases';
import LowStockItems from '../modules/homeDashboard/LowStockItems';
import { useTransactionData } from '../data/useTransactionData';
import { useInventoryData } from '../data/useInventoryData';

const Home = () => {
  // Get data from custom hooks
  const { pendingTransactions, pendingPostingCount, pendingSalesCount, pendingPurchasesCount, 
          pendingPostingTotal, pendingSalesTotal, pendingPurchasesTotal } = useTransactionData();
  const { lowStockItems, lowStockCount } = useInventoryData();

  // Search state for pending posting items
  const [postingSearchTerm, setPostingSearchTerm] = useState('');

  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Overview of pending transactions and inventory status
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
        <PendingSales pendingItems={pendingTransactions.sales} />

        {/* Pending Purchases */}
        <PendingPurchases pendingItems={pendingTransactions.purchases} />

        {/* Low Stock Items */}
        <LowStockItems lowStockItems={lowStockItems} />
      </div>
    </div>
  );
};

export default Home;