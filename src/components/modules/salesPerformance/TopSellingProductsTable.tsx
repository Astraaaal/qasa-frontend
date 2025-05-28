import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, X } from 'lucide-react';
import { useAuth } from "@/components/service/hooks/useAuth";
import { fetchDepartments } from "@/components/service/api/department";

interface Department {
  mId: string;
  mName: string;
  mBudget: number;
  mGrowth: number; // Percentage growth from previous period
  mStatus: string;
  mDate: string;
}

const TopBudgetDepartmentsTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const loadDepartments = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const data = await fetchDepartments(token);
        // Set default values for budget and growth if they are not present
        const departmentsWithDefaults = (data || []).map(dept => ({
          ...dept,
          mBudget: dept.mBudget || 1, // Set to 1 if mBudget is not defined or falsy
          mGrowth: dept.mGrowth || 1  // Set to 1 if mGrowth is not defined or falsy
        }));
        // Sort by budget descending and take top 5
        const sortedDepts = departmentsWithDefaults

//  const data = await fetchDepartments(token);
//         // Sort by budget descending and take top 5
//         const sortedDepts = (data || [])
        
          .sort((a, b) => (b.mBudget || 0) - (a.mBudget || 0))
          .slice(0, 5);
        setDepartments(sortedDepts);
        setError(null);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load department budgets");
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, [token]);

  const handleOpenDetailsModal = (dept: Department) => {
    setSelectedDept(dept);
  };

  const handleCloseDetailsModal = () => {
    setSelectedDept(null);
  };

  const handleOpenAllModal = () => {
    setShowAllModal(true);
  };

  const handleCloseAllModal = () => {
    setShowAllModal(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-center items-center h-40">
            <p>Loading department budgets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-center items-center h-40 text-red-500">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-center items-center h-40">
            <p>No department budget data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Top Budget Departments</h3>
            <button
              onClick={handleOpenAllModal}
              className="text-blue-600 text-sm font-bold"
            >
              View All Departments
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Growth
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
                {departments.map((dept) => (
                  <tr key={dept.mId} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{dept.mName}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(dept.mBudget)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${dept.mGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {dept.mGrowth >= 0 ? (
                          <ArrowUp size={16} className="mr-1" />
                        ) : (
                          <ArrowDown size={16} className="mr-1" />
                        )}
                        {Math.abs(dept.mGrowth)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        dept.mStatus === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : dept.mStatus === 'Pending Approval' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {dept.mStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleOpenDetailsModal(dept)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Department Details Modal */}
      {selectedDept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseDetailsModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Department Details</h2>
            <p className="text-sm text-gray-600 mb-2"><strong>Name:</strong> {selectedDept.mName}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Budget:</strong> {formatCurrency(selectedDept.mBudget)}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Growth:</strong> {selectedDept.mGrowth}%</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Status:</strong> {selectedDept.mStatus}</p>
            <p className="text-sm text-gray-600"><strong>Last Updated:</strong> {selectedDept.mDate}</p>
          </div>
        </div>
      )}

      {/* All Departments Modal */}
      {showAllModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseAllModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">All Departments</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Growth</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departments.map((dept) => (
                  <tr key={dept.mId}>
                    <td className="px-4 py-2 text-sm text-gray-700">{dept.mName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{formatCurrency(dept.mBudget)}</td>
                    <td className={`px-4 py-2 text-sm ${dept.mGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dept.mGrowth >= 0 ? <ArrowUp size={14} className="inline mr-1" /> : <ArrowDown size={14} className="inline mr-1" />}
                      {Math.abs(dept.mGrowth)}%
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        dept.mStatus === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : dept.mStatus === 'Pending Approval' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {dept.mStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBudgetDepartmentsTable;




// STATIC DATA

// import React, { useState } from 'react';
// import { ArrowUp, ArrowDown, X } from 'lucide-react';
// import { Product } from '../../types/SalesPerformance';

// interface TopSellingProductsTableProps {
//   products: Product[];
// }

// const TopSellingProductsTable: React.FC<TopSellingProductsTableProps> = ({ products }) => {
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [showAllModal, setShowAllModal] = useState(false);

//   const handleOpenDetailsModal = (product: Product) => {
//     setSelectedProduct(product);
//   };

//   const handleCloseDetailsModal = () => {
//     setSelectedProduct(null);
//   };

//   const handleOpenAllModal = () => {
//     setShowAllModal(true);
//   };

//   const handleCloseAllModal = () => {
//     setShowAllModal(false);
//   };

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-bold text-gray-800">Top-Selling Products</h3>
//             <button
//               onClick={handleOpenAllModal}
//               className="text-blue-600 text-sm font-bold"
//             >
//               View All Products
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-600 text-left">
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                     Product Name
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                     Sales Count
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                     Revenue
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                     Growth
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {products.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{product.sales}</div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{product.revenue}</div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className={`flex items-center text-sm ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                         {product.growth >= 0 ? (
//                           <ArrowUp size={16} className="mr-1" />
//                         ) : (
//                           <ArrowDown size={16} className="mr-1" />
//                         )}
//                         {Math.abs(product.growth)}%
//                       </div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm">
//                       <button
//                         onClick={() => handleOpenDetailsModal(product)}
//                         className="text-blue-600 hover:text-blue-800 font-medium mr-2"
//                       >
//                         Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* View Details */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
//             <button
//               onClick={handleCloseDetailsModal}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>
//             <h2 className="text-lg font-bold text-gray-800 mb-4">Product Details</h2>
//             <p className="text-sm text-gray-600 mb-2"><strong>Name:</strong> {selectedProduct.name}</p>
//             <p className="text-sm text-gray-600 mb-2"><strong>Sales:</strong> {selectedProduct.sales}</p>
//             <p className="text-sm text-gray-600 mb-2"><strong>Revenue:</strong> {selectedProduct.revenue}</p>
//             <p className="text-sm text-gray-600"><strong>Growth:</strong> {selectedProduct.growth}%</p>
//           </div>
//         </div>
//       )}
//       {/* View All Products */}
//       {showAllModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={handleCloseAllModal}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>
//             <h2 className="text-lg font-bold text-gray-800 mb-4">All Products</h2>
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-600 text-left">
//                   <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sales</th>
//                   <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Revenue</th>
//                   <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Growth</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {products.map((product) => (
//                   <tr key={product.id}>
//                     <td className="px-4 py-2 text-sm text-gray-700">{product.name}</td>
//                     <td className="px-4 py-2 text-sm text-gray-700">{product.sales}</td>
//                     <td className="px-4 py-2 text-sm text-gray-700">{product.revenue}</td>
//                     <td className={`px-4 py-2 text-sm ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                       {product.growth >= 0 ? <ArrowUp size={14} className="inline mr-1" /> : <ArrowDown size={14} className="inline mr-1" />}
//                       {Math.abs(product.growth)}%
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TopSellingProductsTable;
