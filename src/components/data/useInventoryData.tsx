import { useState, useEffect } from 'react';
import { fetchDepartments } from "@/components/service/api/department"; // Import the fetch function
import { useAuth } from "@/components/service/hooks/useAuth"; // Import the useAuth hook

export const useInventoryData = () => {
  const { token } = useAuth();
  const [lowStockItems, setLowStockItems] = useState<any[]>([]); // Initialize with empty array
  const [departments, setDepartments] = useState<any[]>([]); // State for departments
  const [loadingDepartments, setLoadingDepartments] = useState(true); // Loading state
  const [errorDepartments, setErrorDepartments] = useState<string | null>(null); // Error state

  useEffect(() => {
    const loadDepartments = async () => {
      if (!token) return;
      try {
        const data = await fetchDepartments(token);
        setDepartments(data);
        setErrorDepartments(null);

        // Map department data to low stock items and slice to 3 items only
        const mappedLowStockItems = data.map((department, index) => ({
          id: index + 1,
          sku: `DEP-${department.mId}`,
          name: department.mName,
          currentStock: Math.floor(Math.random() * 10),
          reorderLevel: 5,
          supplier: department.mName
        })).slice(0, 3); // Limit to 3 items

        setLowStockItems(mappedLowStockItems);

      } catch (err) {
        console.error("Error fetching departments:", err);
        setErrorDepartments("Failed to load departments");
      } finally {
        setLoadingDepartments(false);
      }
    };
    loadDepartments();
  }, [token]);

  const lowStockCount = lowStockItems.length;

  const updateLowStockItems = (newItems) => {
    setLowStockItems(newItems);
  };

  const addLowStockItem = (item) => {
    setLowStockItems(prev => [...prev, { ...item, id: prev.length + 1 }]);
  };

  const removeLowStockItem = (id) => {
    setLowStockItems(prev => prev.filter(item => item.id !== id));
  };

  return {
    lowStockItems,
    lowStockCount,
    updateLowStockItems,
    addLowStockItem,
    removeLowStockItem,
    loadingDepartments,
    errorDepartments
  };
};









// STATIC DATA

// import { useState } from 'react';

// export const useInventoryData = () => {
//   // Sample data - in a real application, this would come from your API or state management
//   const [lowStockItems, setLowStockItems] = useState([
//     { id: 1, sku: 'PRD-001', name: 'Widget A', currentStock: 5, reorderLevel: 10, supplier: 'Parts Unlimited' },
//     { id: 2, sku: 'PRD-002', name: 'Component B', currentStock: 3, reorderLevel: 15, supplier: 'Tech Components Inc.' },
//     { id: 3, sku: 'PRD-003', name: 'Gadget C', currentStock: 2, reorderLevel: 8, supplier: 'Future Electronics' },
//   ]);

//   // Count of low stock items
//   const lowStockCount = lowStockItems.length;

//   // Function to update low stock items
//   const updateLowStockItems = (newItems) => {
//     setLowStockItems(newItems);
//   };

//   // Function to add a low stock item
//   const addLowStockItem = (item) => {
//     setLowStockItems(prev => [...prev, { ...item, id: prev.length + 1 }]);
//   };

//   // Function to remove a low stock item
//   const removeLowStockItem = (id) => {
//     setLowStockItems(prev => prev.filter(item => item.id !== id));
//   };

//   return {
//     lowStockItems,
//     lowStockCount,
//     updateLowStockItems,
//     addLowStockItem,
//     removeLowStockItem
//   };
// };