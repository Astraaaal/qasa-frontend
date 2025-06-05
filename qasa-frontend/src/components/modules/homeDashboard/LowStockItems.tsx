import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, X, Search } from 'lucide-react';

const LowStockItems = ({ lowStockItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = lowStockItems.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900 flex items-center">
            <AlertTriangle size={18} className="mr-2 text-amber-500" />
            Low Stock Items
          </h2>
          <button
            onClick={() => setShowAllModal(true)}
            className="text-sm text-blue-600 flex items-center hover:underline"
          >
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
                {lowStockItems.slice(0, 4).map(item => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-2 py-3 text-sm text-gray-600">{item.sku}</td>
                    <td className="px-2 py-3 text-sm font-medium text-gray-800">{item.name}</td>
                    <td className="px-2 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {item.currentStock} items
                      </span>
                    </td>
                    <td className="px-2 py-3 text-sm text-gray-600">{item.reorderLevel}</td>
                    <td className="px-2 py-3 text-sm text-gray-600">{item.supplier}</td>
                    <td className="px-2 py-3 text-sm">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700"
                      >
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

      {/* View One Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedItem(null)}
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold text-blue-900 mb-2">{selectedItem.name}</h3>
            <p className="text-sm text-gray-700 mb-1"><strong>SKU:</strong> {selectedItem.sku}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Current Stock:</strong> {selectedItem.currentStock} items</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Reorder Level:</strong> {selectedItem.reorderLevel}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Supplier:</strong> {selectedItem.supplier}</p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View All Inventory Modal */}
      {showAllModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl relative max-h-[90vh] overflow-auto">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setShowAllModal(false);
                setSearchTerm('');
              }}
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">All Low Stock Items</h3>
              <div className="relative">
                <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by name, SKU, or supplier"
                  className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-2 py-3">SKU</th>
                  <th className="px-2 py-3">Item Name</th>
                  <th className="px-2 py-3">Current Stock</th>
                  <th className="px-2 py-3">Reorder Level</th>
                  <th className="px-2 py-3">Supplier</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-2 py-2 text-sm text-gray-600">{item.sku}</td>
                    <td className="px-2 py-2 text-sm font-medium text-gray-800">{item.name}</td>
                    <td className="px-2 py-2 text-sm">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {item.currentStock} items
                      </span>
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-600">{item.reorderLevel}</td>
                    <td className="px-2 py-2 text-sm text-gray-600">{item.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <p className="text-center text-gray-500 py-4">No items match your search.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LowStockItems;
