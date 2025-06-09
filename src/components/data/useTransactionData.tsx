import { useState } from 'react';

export const useTransactionData = () => {
  // Sample data - in a real application, this would come from your API or state management
  const [pendingTransactions, setPendingTransactions] = useState({
    posting: [
      { id: 1, reference: 'INV-2025-001', date: '2025-05-08', amount: 1250.75, client: 'Acme Corp' },
      { id: 2, reference: 'INV-2025-002', date: '2025-05-09', amount: 876.50, client: 'TechSoft Inc.' },
    ],
    sales: [
      { id: 1, reference: 'SO-2025-001', date: '2025-05-07', amount: 3450.00, client: 'Global Systems' },
      { id: 2, reference: 'SO-2025-002', date: '2025-05-08', amount: 1120.25, client: 'InnoTech' },
      { id: 3, reference: 'SO-2025-003', date: '2025-05-09', amount: 2340.50, client: 'Future Electronics' },
    ],
    purchases: [
      { id: 1, reference: 'PO-2025-001', date: '2025-05-06', amount: 2150.00, supplier: 'Parts Unlimited' },
      { id: 2, reference: 'PO-2025-002', date: '2025-05-08', amount: 1875.25, supplier: 'Tech Components Inc.' },
    ]
  });

  // Summary counts
  const pendingPostingCount = pendingTransactions.posting.length;
  const pendingSalesCount = pendingTransactions.sales.length;
  const pendingPurchasesCount = pendingTransactions.purchases.length;

  // Total values
  const pendingPostingTotal = pendingTransactions.posting.reduce((sum, item) => sum + item.amount, 0);
  const pendingSalesTotal = pendingTransactions.sales.reduce((sum, item) => sum + item.amount, 0);
  const pendingPurchasesTotal = pendingTransactions.purchases.reduce((sum, item) => sum + item.amount, 0);

  // Function to update transaction data
  const updateTransactionData = (type, newData) => {
    setPendingTransactions(prev => ({
      ...prev,
      [type]: newData
    }));
  };

  return {
    pendingTransactions,
    pendingPostingCount,
    pendingSalesCount,
    pendingPurchasesCount,
    pendingPostingTotal,
    pendingSalesTotal,
    pendingPurchasesTotal,
    updateTransactionData
  };
};