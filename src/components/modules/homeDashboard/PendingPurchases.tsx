import React from 'react';
import { Package, ArrowRight } from 'lucide-react';

const PendingPurchases = ({ pendingItems }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-900 flex items-center">
          <Package size={18} className="mr-2 text-purple-500" />
          Pending Purchases
        </h2>
        <button className="text-sm text-blue-600 flex items-center hover:underline">
          View All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      {pendingItems.length > 0 ? (
        <div className="overflow-hidden">
          {pendingItems.map(item => (
            <div key={item.id} className="border-b border-gray-100 py-3 last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{item.reference}</p>
                  <p className="text-xs text-gray-500">{item.supplier} • {item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{item.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No pending purchases</p>
      )}
    </div>
  );
};

export default PendingPurchases;