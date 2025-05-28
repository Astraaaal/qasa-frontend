// import React, { useState, useEffect } from 'react';
// import { CheckCircle, XCircle, ChevronRight, FileText, Search, X } from 'lucide-react';
// import { useAuth } from "@/components/service/hooks/useAuth";
// import { fetchDepartments } from "@/components/service/api/department";
// import WarningModal from './WarningModal';
// import OrderDetailsModal from './OrderDetailsModal';
// import SalesReportModal from './SalesReportModal';

// interface Department {
//   mId: string;
//   mName: string;
//   mBudget: number;
//   status: string;
// }

// const PendingSalesTable: React.FC = () => {
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedTab, setSelectedTab] = useState<string>('all');
//   const [actionWarning, setActionWarning] = useState<{ show: boolean; id: string; action: string }>({ 
//     show: false, 
//     id: '', 
//     action: '' 
//   });
//   const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [showAllForm, setShowAllForm] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { token } = useAuth();

//   useEffect(() => {
//     const loadDepartments = async () => {
//       if (!token) return;

//       try {
//         setLoading(true);
//         const data = await fetchDepartments(token);
//         // Add status to each department for the tabs functionality
//         const departmentsWithStatus = data.map((dept: any) => ({
//           ...dept,
//           status: 'Pending Approval' // Default status for all departments
//         }));
//         setDepartments(departmentsWithStatus || []);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching departments:", err);
//         setError("Failed to load departments data");
//         setDepartments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDepartments();
//   }, [token]);

//   const handleActionClick = (id: string, action: string) => {
//     setActionWarning({ show: true, id, action });
//   };

//   const confirmAction = () => {
//     const action = actionWarning.action === 'approve' ? 'approved' : 'rejected';
//     setSuccessMessage(`Department ${actionWarning.id} ${action} successfully.`);
//     setActionWarning({ show: false, id: '', action: '' });
  
//     setTimeout(() => {
//       setSuccessMessage(null);
//     }, 3000);
//   };

//   const cancelAction = () => {
//     setActionWarning({ show: false, id: '', action: '' });
//   };

//   const handleViewDetails = (dept: Department) => {
//     setSelectedOrder({
//       id: dept.mId,
//       customer: dept.mName,
//       date: 'N/A',
//       amount: `₱${(dept.mBudget || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
//       status: dept.status,
//       items: [{
//         id: 'DEPT-001',
//         name: 'Department Budget Allocation',
//         quantity: 1,
//         unitPrice: dept.mBudget || 0
//       }],
//       description: `Department budget for ${dept.mName}`
//     });
//   };

//   const filteredDepartments = departments.filter(dept => {
//     if (selectedTab === 'approval') return dept.status === 'Pending Approval';
//     if (selectedTab === 'review') return dept.status === 'Pending Review';
//     return true; // 'all'
//   });

//   const countAll = departments.length;
//   const countApproval = departments.filter(d => d.status === 'Pending Approval').length;
//   const countReview = departments.filter(d => d.status === 'Pending Review').length;

//   if (loading) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
//         <div className="flex justify-center items-center h-32">
//           <p>Loading departments data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   if (departments.length === 0) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
//         <div className="text-center py-8">
//           <p>No departments found</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-bold text-gray-800">Department Budget Approvals</h3>
//             <div className="flex space-x-2">
//               <button 
//                 className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
//                 onClick={() => setShowAllForm(true)}
//               >
//                 View All <ChevronRight size={16} />
//               </button>
//               <button 
//                 className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
//                 onClick={() => setShowReportModal(true)}
//               >
//                 View Reports
//               </button>
//             </div>
//           </div>

//           <div className="flex border-b mb-4">
//             <button 
//               className={`px-4 py-2 text-sm font-medium ${selectedTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//               onClick={() => setSelectedTab('all')}
//             >
//               All Pending ({countAll})
//             </button>
//             <button 
//               className={`px-4 py-2 text-sm font-medium ${selectedTab === 'approval' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//               onClick={() => setSelectedTab('approval')}
//             >
//               Pending Approval ({countApproval})
//             </button>
//             <button 
//               className={`px-4 py-2 text-sm font-medium ${selectedTab === 'review' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//               onClick={() => setSelectedTab('review')}
//             >
//               Pending Review ({countReview})
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-600 text-left">
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department ID</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Budget</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredDepartments.map((dept) => (
//                   <tr key={dept.mId} className="hover:bg-gray-50">
//                     <td className="px-4 py-4 text-blue-600 font-medium">{dept.mId}</td>
//                     <td className="px-4 py-4 text-gray-900">{dept.mName}</td>
//                     <td className="px-4 py-4 text-gray-500">N/A</td>
//                     <td className="px-4 py-4 font-medium text-gray-900">
//                       ₱{(dept.mBudget || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className={`px-2 py-1 text-xs font-bold rounded-full ${
//                         dept.status.includes('Approval') 
//                           ? 'bg-yellow-100 text-yellow-800' 
//                           : 'bg-blue-100 text-blue-800'
//                       }`}>
//                         {dept.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex space-x-2">
//                         <button 
//                           className="p-1 text-blue-600 rounded hover:bg-blue-100"
//                           onClick={() => handleViewDetails(dept)}
//                           title="View Details"
//                         >
//                           <FileText size={18} />
//                         </button>
//                         <button 
//                           className="p-1 text-green-600 rounded hover:bg-green-100"
//                           onClick={() => handleActionClick(dept.mId, 'approve')}
//                           title="Approve"
//                         >
//                           <CheckCircle size={18} />
//                         </button>
//                         <button 
//                           className="p-1 text-red-600 rounded hover:bg-red-100"
//                           onClick={() => handleActionClick(dept.mId, 'reject')}
//                           title="Reject"
//                         >
//                           <XCircle size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <WarningModal 
//         warning={actionWarning}
//         onConfirm={confirmAction}
//         onCancel={cancelAction}
//       />

//       {selectedOrder && (
//         <OrderDetailsModal 
//           order={selectedOrder} 
//           onClose={() => setSelectedOrder(null)} 
//         />
//       )}

//       {showReportModal && (
//         <SalesReportModal onClose={() => setShowReportModal(false)} />
//       )}

//       {successMessage && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[9999]">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
//             <h3 className="text-xl font-bold mb-4 text-green-600">Done</h3>
//             <p className="mb-6">{successMessage}</p>
//             <button 
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               onClick={() => setSuccessMessage(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* View All Form */}
//       {showAllForm && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full h-5/6 flex flex-col">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-bold">All Department Budgets</h3>
//               <button 
//                 onClick={() => setShowAllForm(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="mb-6">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search by department ID or name..."
//                   className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <div className="absolute left-3 top-3 text-gray-400">
//                   <Search size={20} />
//                 </div>
//               </div>
//             </div>
            
//             <div className="overflow-y-auto flex-grow">
//               <table className="min-w-full bg-white">
//                 <thead className="sticky top-0 bg-white">
//                   <tr className="bg-gray-100 text-gray-600 text-left">
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department ID</th>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department Name</th>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Budget</th>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-600">
//                   {departments
//                     .filter(dept => 
//                       dept.mId.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                       dept.mName.toLowerCase().includes(searchQuery.toLowerCase())
//                     )
//                     .map((dept) => (
//                     <tr key={dept.mId} className="border-b border-gray-200 hover:bg-gray-50">
//                       <td className="px-4 py-4">{dept.mId}</td>
//                       <td className="px-4 py-4">{dept.mName}</td>
//                       <td className="px-4 py-4">₱{(dept.mBudget || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
//                       <td className="px-4 py-4">
//                         <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
//                           {dept.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4">
//                         <div className="flex space-x-2">
//                           <button 
//                             className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200" 
//                             title="Approve"
//                             onClick={() => handleActionClick(dept.mId, 'approve')}
//                           >
//                             <CheckCircle size={20} />
//                           </button>
//                           <button 
//                             className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200" 
//                             title="Decline"
//                             onClick={() => handleActionClick(dept.mId, 'reject')}
//                           >
//                             <XCircle size={20} />
//                           </button>
//                           <button 
//                             className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" 
//                             title="View Details"
//                             onClick={() => handleViewDetails(dept)}
//                           >
//                             <FileText size={20} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PendingSalesTable;


//  STATIC DATA

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
