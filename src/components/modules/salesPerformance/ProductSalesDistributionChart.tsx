import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from "@/components/service/hooks/useAuth";
import { fetchDepartments } from "@/components/service/api/department";

import { COLORS } from '../../data/SalesPerformance';

interface DepartmentBudget {
  mId: string;
  mName: string;
  mBudget: number;
}

const BudgetDistributionChart: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentBudget[]>([]);
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
        setError("Failed to load department budgets");
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, [token]);

  // Transform department data for the pie chart
  const chartData = departments.map(dept => ({
    name: dept.mName || `Dept ${dept.mId}`,
    value: dept.mBudget || 10
  }));

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-bold text-gray-800">Department Budget Distribution</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <p>Loading department budgets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-bold text-gray-800">Department Budget Distribution</h3>
        </div>
        <div className="h-80 flex items-center justify-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-bold text-gray-800">Department Budget Distribution</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <p>No department budget data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 pb-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Department Budget Distribution</h3>
        </div>
      </div>
      <div className="h-80 flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Budget']} 
            />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetDistributionChart;


// STATIC DATA

// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { ProductSalesData } from '../../types/SalesPerformance';
// import { COLORS } from '../../data/SalesPerformance';


// interface ProductDistributionChartProps {
//   data: ProductSalesData[];
// }

// const ProductDistributionChart: React.FC<ProductDistributionChartProps> = ({ data }) => {
//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="p-6 pb-0">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-bold text-gray-800">Product Sales Distribution</h3>
//         </div>
//       </div>
//       <div className="h-80 flex justify-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//               label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip formatter={(value: number) => [value, 'Units Sold']} />
//             <Legend layout="vertical" align="right" verticalAlign="middle" />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ProductDistributionChart;