import { useState, useEffect } from 'react';
import { fetchDepartments } from "@/components/service/api/department"; // Import the fetch function
import { useAuth } from "@/components/service/hooks/useAuth"; // Import the useAuth hook

export const useTransactionData = () => {
  const { token } = useAuth();
  const [pendingTransactions, setPendingTransactions] = useState({
    posting: [],
    sales: [],
    purchases: []
  });

  const [departments, setDepartments] = useState<any[]>([]); // State for departments
  const [loadingDepartments, setLoadingDepartments] = useState(true); // Loading state for departments
  const [errorDepartments, setErrorDepartments] = useState<string | null>(null); // Error state for departments

  // Fetch department data
  useEffect(() => {
    const loadDepartments = async () => {
      if (!token) return;
      try {
        const data = await fetchDepartments(token);
        setDepartments(data);
        setErrorDepartments(null);

        // Map department data to fit the transaction structure and limit to 5 entries each
        const mappedPosting = data.map((department, index) => ({
          id: index + 1,
          reference: `DEP-${department.mId}`,
          date: new Date().toISOString().split('T')[0],
          amount: Math.random() * 1000 + 500,
          client: department.mName
        })).slice(0, 5);

        const mappedSales = data.map((department, index) => ({
          id: index + 1,
          reference: `SO-${department.mId}`,
          date: new Date().toISOString().split('T')[0],
          amount: Math.random() * 1000 + 500,
          client: department.mName
        })).slice(0, 5);

        const mappedPurchases = data.map((department, index) => ({
          id: index + 1,
          reference: `PO-${department.mId}`,
          date: new Date().toISOString().split('T')[0],
          amount: Math.random() * 1000 + 500,
          supplier: department.mName
        })).slice(0, 5);

        setPendingTransactions({
          posting: mappedPosting,
          sales: mappedSales,
          purchases: mappedPurchases
        });

      } catch (err) {
        console.error("Error fetching departments:", err);
        setErrorDepartments("Failed to load departments");
      } finally {
        setLoadingDepartments(false);
      }
    };
    loadDepartments();
  }, [token]);

  // Summary counts
  const pendingPostingCount = pendingTransactions.posting.length;
  const pendingSalesCount = pendingTransactions.sales.length;
  const pendingPurchasesCount = pendingTransactions.purchases.length;

  // Total values
  const pendingPostingTotal = pendingTransactions.posting.reduce((sum, item) => sum + item.amount, 0);
  const pendingSalesTotal = pendingTransactions.sales.reduce((sum, item) => sum + item.amount, 0);
  const pendingPurchasesTotal = pendingTransactions.purchases.reduce((sum, item) => sum + item.amount, 0);

  // Function to update transaction data
  const updateTransactionData = (type: 'posting' | 'sales' | 'purchases', newData: any[]) => {
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
    updateTransactionData,
    departments,
    loadingDepartments,
    errorDepartments
  };
};





// STATIC DATA


// import { useState } from 'react';

// export const useTransactionData = () => {
//   // Sample data - in a real application, this would come from your API or state management
//   const [pendingTransactions, setPendingTransactions] = useState({
//     posting: [
//       { id: 1, reference: 'INV-2025-001', date: '2025-05-08', amount: 1250.75, client: 'Acme Corp' },
//       { id: 2, reference: 'INV-2025-002', date: '2025-05-09', amount: 876.50, client: 'TechSoft Inc.' },
//     ],
//     sales: [
//       { id: 1, reference: 'SO-2025-001', date: '2025-05-07', amount: 3450.00, client: 'Global Systems' },
//       { id: 2, reference: 'SO-2025-002', date: '2025-05-08', amount: 1120.25, client: 'InnoTech' },
//       { id: 3, reference: 'SO-2025-003', date: '2025-05-09', amount: 2340.50, client: 'Future Electronics' },
//     ],
//     purchases: [
//       { id: 1, reference: 'PO-2025-001', date: '2025-05-06', amount: 2150.00, supplier: 'Parts Unlimited' },
//       { id: 2, reference: 'PO-2025-002', date: '2025-05-08', amount: 1875.25, supplier: 'Tech Components Inc.' },
//     ]
//   });

//   // Summary counts
//   const pendingPostingCount = pendingTransactions.posting.length;
//   const pendingSalesCount = pendingTransactions.sales.length;
//   const pendingPurchasesCount = pendingTransactions.purchases.length;

//   // Total values
//   const pendingPostingTotal = pendingTransactions.posting.reduce((sum, item) => sum + item.amount, 0);
//   const pendingSalesTotal = pendingTransactions.sales.reduce((sum, item) => sum + item.amount, 0);
//   const pendingPurchasesTotal = pendingTransactions.purchases.reduce((sum, item) => sum + item.amount, 0);

//   // Function to update transaction data
//   const updateTransactionData = (type, newData) => {
//     setPendingTransactions(prev => ({
//       ...prev,
//       [type]: newData
//     }));
//   };

//   return {
//     pendingTransactions,
//     pendingPostingCount,
//     pendingSalesCount,
//     pendingPurchasesCount,
//     pendingPostingTotal,
//     pendingSalesTotal,
//     pendingPurchasesTotal,
//     updateTransactionData
//   };
// };