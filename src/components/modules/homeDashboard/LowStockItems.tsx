import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const LowStockItems = ({ lowStockItems }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-900 flex items-center">
          <AlertTriangle size={18} className="mr-2 text-amber-500" />
          Low Stock Items
        </h2>
        <button className="text-sm text-blue-600 flex items-center hover:underline">
          View Inventory <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
        
      {lowStockItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-2 py-3">SKU</th>
                <th className="px-2 py-3">Item Name</th>
                <th className="px-2 py-3">Current Stock</th>
                <th className="px-2 py-3">Reorder Level</th>
                <th className="px-2 py-3">Supplier</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map(item => (
                <tr key={item.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-600">{item.sku}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{item.name}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      {item.currentStock} items
                    </span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-600">{item.reorderLevel}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-600">{item.supplier}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm">
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No low stock items</p>
      )}
    </div>
  );
};

export default LowStockItems;