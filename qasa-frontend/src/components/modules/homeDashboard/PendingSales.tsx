import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, X, Search } from 'lucide-react';

const PendingSales = ({ pendingItems, searchItem, setSearchItem }) => {
  const [showModal, setShowModal] = useState(false);

  const filteredItems = pendingItems.filter(item =>
    item.reference.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.client.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900 flex items-center">
            <ShoppingCart size={18} className="mr-2 text-green-500" />
            Pending Sales
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-blue-600 flex items-center hover:underline"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </button>
        </div>

        {/* Show preview without search */}
        {filteredItems.slice(0, 3).map(item => (
          <div key={item.id} className="border-b border-gray-100 py-3 last:border-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{item.reference}</p>
                <p className="text-xs text-gray-500">{item.client} • {item.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">{item.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-md max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-blue-900">All Pending Sales</h3>

            {/* Search Box */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Search by reference or client"
                className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
              <Search size={14} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {filteredItems.length > 0 ? (
              <div>
                {filteredItems.map(item => (
                  <div key={item.id} className="border-b border-gray-100 py-3 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{item.reference}</p>
                        <p className="text-xs text-gray-500">{item.client} • {item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">{item.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No pending sales</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PendingSales;
