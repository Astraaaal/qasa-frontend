import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { SalesOrder, ActionWarning } from '../../types/SalesPerformance';
import WarningModal from './WarningModal';

interface PendingSalesTableProps {
  orders: SalesOrder[];
}

const PendingSalesTable: React.FC<PendingSalesTableProps> = ({ orders }) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [actionWarning, setActionWarning] = useState<ActionWarning>({ show: false, orderId: '', action: '' });

  const handleActionClick = (orderId: string, action: string) => {
    setActionWarning({ show: true, orderId, action });
  };

  const confirmAction = () => {
    // Would handle the confirmation logic here
    console.log(`${actionWarning.action} confirmed for order ${actionWarning.orderId}`);
    setActionWarning({ show: false, orderId: '', action: '' });
  };

  const cancelAction = () => {
    setActionWarning({ show: false, orderId: '', action: '' });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Pending Sales Transactions</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
                View Sales Reports
              </button>
            </div>
          </div>
          
          <div className="flex border-b mb-4">
            <button 
              className={`px-4 py-2 text-sm font-medium ${selectedTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('all')}
            >
              All Pending (24)
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${selectedTab === 'approval' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('approval')}
            >
              Pending Approval (16)
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${selectedTab === 'review' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('review')}
            >
              Pending Review (8)
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{order.id}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.amount}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        order.status.includes('Approval') 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                          View Details
                        </button>
                        <button 
                          className="p-1 rounded text-green-600 hover:bg-green-100"
                          onClick={() => handleActionClick(order.id, 'approve')}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          className="p-1 rounded text-red-600 hover:bg-red-100"
                          onClick={() => handleActionClick(order.id, 'reject')}
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <WarningModal 
        warning={actionWarning}
        onConfirm={confirmAction}
        onCancel={cancelAction}
      />
    </>
  );
};

export default PendingSalesTable;