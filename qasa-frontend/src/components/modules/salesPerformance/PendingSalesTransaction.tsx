import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { SalesOrder, ActionWarning } from '../../types/SalesPerformance';
import WarningModal from './WarningModal';
import OrderDetailsModal from './OrderDetailsModal';
import SalesReportModal from './SalesReportModal';

interface PendingSalesTableProps {
  orders: SalesOrder[];
}

const PendingSalesTable: React.FC<PendingSalesTableProps> = ({ orders }) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [actionWarning, setActionWarning] = useState<ActionWarning>({ show: false, orderId: '', action: '' });
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);



  const handleActionClick = (orderId: string, action: string) => {
    setActionWarning({ show: true, orderId, action });
  };

  const confirmAction = () => {
    const action = actionWarning.action === 'approve' ? 'approved' : 'rejected';
    setSuccessMessage(`Order ${actionWarning.orderId} ${action} successfully.`);
    setActionWarning({ show: false, orderId: '', action: '' });
  
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };
  

  const cancelAction = () => {
    setActionWarning({ show: false, orderId: '', action: '' });
  };

  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'approval') return order.status === 'Pending Approval';
    if (selectedTab === 'review') return order.status === 'Pending Review';
    return true; // 'all'
  });

  const countAll = orders.length;
  const countApproval = orders.filter(o => o.status === 'Pending Approval').length;
  const countReview = orders.filter(o => o.status === 'Pending Review').length;

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Pending Sales Transactions</h3>
            <button 
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={() => setShowReportModal(true)}
            >
              View Sales Reports
            </button>
          </div>

          <div className="flex border-b mb-4">
            <button 
              className={`px-4 py-2 text-sm font-medium ${selectedTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('all')}
            >
              All Pending ({countAll})
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${selectedTab === 'approval' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('approval')}
            >
              Pending Approval ({countApproval})
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${selectedTab === 'review' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('review')}
            >
              Pending Review ({countReview})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-blue-600 font-medium">{order.id}</td>
                    <td className="px-4 py-4 text-gray-900">{order.customer}</td>
                    <td className="px-4 py-4 text-gray-500">{order.date}</td>
                    <td className="px-4 py-4 font-medium text-gray-900">{order.amount}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        order.status.includes('Approval') 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button 
                          className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </button>
                        <button 
                          className="p-1 text-green-600 rounded hover:bg-green-100"
                          onClick={() => handleActionClick(order.id, 'approve')}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          className="p-1 text-red-600 rounded hover:bg-red-100"
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

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
      {showReportModal && (
        <SalesReportModal onClose={() => setShowReportModal(false)} />
      )}
      {successMessage && (
        <div className="mb-4 px-4 py-3 rounded bg-green-100 text-green-800 font-medium shadow z-[999]">
          {successMessage}
        </div>
      )}
    </>
  );
};

export default PendingSalesTable;
