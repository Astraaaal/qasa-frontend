import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart } from "recharts";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/service/hooks/useAuth";
import { fetchDepartments } from "@/components/service/api/department";

export const PurchaseChart = () => {
  const [departments, setDepartments] = useState([]);
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

  // Transform department data for the chart
  const chartData = departments.map(dept => ({
    name: dept.mName || `Department ${dept.mId}`,
    amount: dept.mBudget || 1
  })).sort((a, b) => b.amount - a.amount); // Sort by budget descending

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-center items-center h-80">
          <p>Loading department budgets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-center items-center h-80 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-center items-center h-80">
          <p>No department budget data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Department Budgets</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              tick={{ fontSize: 12 }} 
              height={70} 
            />
            <YAxis 
              tickFormatter={(value) => `₱${value.toLocaleString()}`} 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip 
              formatter={(value) => [`₱${value.toLocaleString()}`, "Budget"]} 
              labelStyle={{ fontWeight: "bold" }} 
            />
            <Bar 
              dataKey="amount" 
              fill="#0078D7" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};



// STATIC DATA

// import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart } from "recharts";
// import { PurchaseItem } from '../../types/Procurement';

// const purchasesBySupplier = [
//     { name: 'Tech Solutions Inc.', amount: 1437500 },
//     { name: 'Office Supplies Co.', amount: 771037 },
//     { name: 'Furniture Depot', amount: 617025 },
//     { name: 'Global Services Ltd.', amount: 543762 },
//     { name: 'Maintenance Systems', amount: 432000 },
//     { name: 'Other Suppliers', amount: 283500 },
//   ];

// export const PurchaseChart = () => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Purchases per Supplier</h2>
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={purchasesBySupplier}
//             margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//             <XAxis 
//               dataKey="name" 
//               angle={-45} 
//               textAnchor="end" 
//               tick={{ fontSize: 12 }} 
//               height={70} 
//             />
//             <YAxis 
//               tickFormatter={(value) => `₱${value.toLocaleString()}`} 
//               tick={{ fontSize: 12 }} 
//             />
//             <Tooltip 
//               formatter={(value) => [`₱${value.toLocaleString()}`, "Amount"]} 
//               labelStyle={{ fontWeight: "bold" }} 
//             />
//             <Bar 
//               dataKey="amount" 
//               fill="#0078D7" 
//               radius={[4, 4, 0, 0]} 
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };