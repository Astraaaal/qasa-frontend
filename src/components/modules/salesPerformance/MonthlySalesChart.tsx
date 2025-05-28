import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from "@/components/service/hooks/useAuth";
import { fetchDepartments } from "@/components/service/api/department";

interface DepartmentBudget {
  mId: string;
  mName: string;
  mBudget: number;
  // Add other department properties as needed
}

const MonthlyBudgetChart: React.FC = () => {
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

  const formatCurrency = (value: number): string => {
    return `₱${value.toLocaleString()}`;
  };

  // Transform department data for the chart
  const chartData = departments.map(dept => ({
    name: dept.mName || `Department ${dept.mId}`,
    budget: dept.mBudget || 2
  })).sort((a, b) => a.budget - b.budget); // Sort by budget ascending

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-bold text-gray-800">Department Budget Allocation</h3>
        </div>
        <div className="px-6 h-80 flex items-center justify-center">
          <p>Loading department budgets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-bold text-gray-800">Department Budget Allocation</h3>
        </div>
        <div className="px-6 h-80 flex items-center justify-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-bold text-gray-800">Department Budget Allocation</h3>
        </div>
        <div className="px-6 h-80 flex items-center justify-center">
          <p>No department budget data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 pb-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Department Budget Allocation</h3>
        </div>
      </div>
      <div className="px-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            layout="vertical" // Makes bars horizontal
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${formatCurrency(value)}`, 'Budget']}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Bar dataKey="budget" fill="#0078D7" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyBudgetChart;


// STATIC DATA

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { MonthlySales } from '../../types/SalesPerformance';

// interface MonthlySalesChartProps {
//   data: MonthlySales[];
// }

// const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ data }) => {
//   const formatCurrency = (value: number): string => {
//     return `₱${value.toLocaleString()}`;
//   };

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="p-6 pb-0">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-bold text-gray-800">Monthly Sales Performance</h3>
//         </div>
//       </div>
//       <div className="px-6 h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="month" />
//             <YAxis 
//               tickFormatter={formatCurrency}
//               tick={{ fontSize: 12 }}
//             />
//             <Tooltip 
//               formatter={(value: number) => [`${formatCurrency(value)}`, 'Sales']}
//               labelStyle={{ fontWeight: 'bold' }}
//             />
//             <Bar dataKey="sales" fill="#0078D7" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default MonthlySalesChart;