import React from 'react';
import { SalesOrder } from '../../types/SalesPerformance';

interface Props {
  order: SalesOrder;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<Props> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Order Details</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Amount:</strong> {order.amount}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
        <div className="mt-6 text-right">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
