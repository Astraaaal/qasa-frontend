import { useState } from 'react';

export const useInventoryData = () => {
  // Sample data - in a real application, this would come from your API or state management
  const [lowStockItems, setLowStockItems] = useState([
    { id: 1, sku: 'PRD-001', name: 'Widget A', currentStock: 5, reorderLevel: 10, supplier: 'Parts Unlimited' },
    { id: 2, sku: 'PRD-002', name: 'Component B', currentStock: 3, reorderLevel: 15, supplier: 'Tech Components Inc.' },
    { id: 3, sku: 'PRD-003', name: 'Gadget C', currentStock: 2, reorderLevel: 8, supplier: 'Future Electronics' },
  ]);

  // Count of low stock items
  const lowStockCount = lowStockItems.length;

  // Function to update low stock items
  const updateLowStockItems = (newItems) => {
    setLowStockItems(newItems);
  };

  // Function to add a low stock item
  const addLowStockItem = (item) => {
    setLowStockItems(prev => [...prev, { ...item, id: prev.length + 1 }]);
  };

  // Function to remove a low stock item
  const removeLowStockItem = (id) => {
    setLowStockItems(prev => prev.filter(item => item.id !== id));
  };

  return {
    lowStockItems,
    lowStockCount,
    updateLowStockItems,
    addLowStockItem,
    removeLowStockItem
  };
};