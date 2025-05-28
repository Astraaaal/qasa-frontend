import { useEffect, useState } from "react";
import { useAuth } from "@/components/service/hooks/useAuth";
import { fetchDepartments } from "@/components/service/api/department";

interface Department {
  mId: string;
  mName: string;
  mBudget: number;
  // Add other department properties as needed
}

export const TopSuppliers = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const loadDepartments = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const data = await fetchDepartments(token);
        setDepartments(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments data");
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, [token]);

  // Calculate total budget and percentages
  const totalBudget = departments.reduce((sum, dept) => sum + (dept.mBudget || 0), 0);
  const topDepartments = departments
    .map(dept => ({
      ...dept,
      percentage: totalBudget > 0 ? Math.round((dept.mBudget / totalBudget) * 100) : 0
    }))
    .sort((a, b) => b.mBudget - a.mBudget) // Sort by budget descending
    .slice(0, 5); // Take top 5

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top Departments</h2>
        <div className="flex justify-center items-center h-40">
          <p>Loading department data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top Departments</h2>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top Departments</h2>
        <div className="text-center py-8">
          <p>No department data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Top Departments by Budget</h2>
      <div className="space-y-4">
        {topDepartments.map((dept) => (
          <div key={dept.mId} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold">{dept.mName || `Department ${dept.mId}`}</h3>
              <span className="text-blue-600 font-bold">₱{(dept.mBudget || 0).toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${dept.percentage}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">
              {dept.percentage}% of total budget
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// STATIC DATA

// import { Supplier} from '../../types/Procurement';

// const topSuppliers: Supplier[] = [
//   { name: 'Tech Solutions Inc.', amount: 1437500.00, percentage: 35, contact: 'John Rodriguez', email: 'john@techsolutions.ph' },
//   { name: 'Office Supplies Co.', amount: 771037.50, percentage: 19, contact: 'Maria Santos', email: 'maria@officesupplies.ph' },
//   { name: 'Furniture Depot', amount: 617025.00, percentage: 15, contact: 'David Cruz', email: 'david@furnituredepot.ph' },
//   { name: 'Global Services Ltd.', amount: 543762.50, percentage: 13, contact: 'Ana Reyes', email: 'ana@globalservices.ph' },
//   { name: 'Maintenance Systems', amount: 432000.00, percentage: 11, contact: 'Luis Garcia', email: 'luis@mainsys.ph' },
// ];

// export const TopSuppliers = () => {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Top Suppliers</h2>
//         <div className="space-y-4">
//           {topSuppliers.map((supplier) => (
//             <div key={supplier.name} className="bg-gray-50 p-4 rounded-lg">
//               <div className="flex justify-between mb-2">
//                 <h3 className="font-bold">{supplier.name}</h3>
//                 <span className="text-blue-600 font-bold">₱{supplier.amount.toLocaleString()}</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div 
//                   className="bg-blue-600 h-2.5 rounded-full" 
//                   style={{ width: `${supplier.percentage}%` }}
//                 ></div>
//               </div>
//               <div className="text-right text-xs text-gray-500 mt-1">
//                 {supplier.percentage}% of total purchases
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };
  

