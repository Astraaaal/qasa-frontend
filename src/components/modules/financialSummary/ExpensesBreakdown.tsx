import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { fetchDepartments } from "@/components/service/api/department";
import { useAuth } from "@/components/service/hooks/useAuth";

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

const ExpensesBreakdown = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define the colors to cycle through
  const colors = ["#0078D7", "#1C61A1", "#20476E"];

  useEffect(() => {
    const loadDepartments = async () => {
      if (!token) return;
      try {
        const data = await fetchDepartments(token);
        // Ensure valid number values, replace invalid or missing with 0
        const transformedCategories = data.map((department: any, index: number) => {
          const budget = typeof department.mBudget === "number" && !isNaN(department.mBudget)
            ? department.mBudget
            : 1;
          return {
            name: department.mName || "Unnamed",
            value: budget,
            // Assign color based on the index, cycling through the colors array
            color: colors[index % colors.length],
          };
        });

        setCategories(transformedCategories.slice(0, 5));
        setError(null);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments");
      } finally {
        setLoading(false);
      }
    };
    loadDepartments();
  }, [token]);

  const totalExpenses = categories.reduce(
    (sum, category) => sum + (typeof category.value === "number" ? category.value : 0),
    0,
  );

  const formatCurrency = (value: number) => {
    if (typeof value !== "number" || isNaN(value)) value = 0;
    return new Intl.NumberFormat("en-PH", {
      currencySign: "standard",
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = totalExpenses > 0 ? ((data.value / totalExpenses) * 100).toFixed(1) : "0.0";
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold text-[#20476E]">{data.name}</p>
          <p className="text-[#0078D7]">{formatCurrency(data.value)}</p>
          <p className="text-gray-600">{`${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#20476E]">
          Expenses Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading expenses...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col h-full">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value) => (
                      <span className="text-sm text-[#20476E]">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categories.map((category, index) => {
                const percentage = totalExpenses > 0
                  ? ((category.value / totalExpenses) * 100).toFixed(1)
                  : "0.0";
                return (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-[#20476E]">{category.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-[#1C61A1]">
                        {formatCurrency(category.value)}
                      </span>
                      <span className="text-xs text-gray-500">{`${percentage}%`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesBreakdown;









// STATIC DATA

// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
// } from "recharts";

// interface ExpenseCategory {
//   name: string;
//   value: number;
//   color: string;
// }

// interface ExpensesBreakdownProps {
//   categories?: ExpenseCategory[];
//   title?: string;
// }

// const ExpensesBreakdown = ({
//   categories = [
//     { name: "Salaries", value: 45000, color: "#0078D7" },
//     { name: "Rent", value: 25000, color: "#1C61A1" },
//     { name: "Utilities", value: 15000, color: "#20476E" },
//   ],
//   title = "Expenses Breakdown",
// }: ExpensesBreakdownProps) => {
//   const totalExpenses = categories.reduce(
//     (sum, category) => sum + category.value,
//     0,
//   );

//   const formatCurrency = (value: number) => {
//     return new Intl.NumberFormat("en-PH", {
//       currencySign: "standard",
//       style: "currency",
//       currency: "PHP",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(value);
//   };

//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
//           <p className="font-bold text-[#20476E]">{data.name}</p>
//           <p className="text-[#0078D7]">{formatCurrency(data.value)}</p>
//           <p className="text-gray-600">{`${((data.value / totalExpenses) * 100).toFixed(1)}%`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <Card className="w-full h-full bg-white shadow-md">
//       <CardHeader>
//         <CardTitle className="text-lg font-bold text-[#20476E]">
//           {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-col h-full">
//           <div className="h-[200px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categories}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={40}
//                   outerRadius={80}
//                   paddingAngle={2}
//                   dataKey="value"
//                 >
//                   {categories.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend
//                   layout="vertical"
//                   verticalAlign="middle"
//                   align="right"
//                   formatter={(value) => (
//                     <span className="text-sm text-[#20476E]">{value}</span>
//                   )}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="mt-4 space-y-2">
//             {categories.map((category, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <div
//                     className="w-3 h-3 rounded-full mr-2"
//                     style={{ backgroundColor: category.color }}
//                   />
//                   <span className="text-sm text-[#20476E]">
//                     {category.name}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span className="text-sm font-semibold text-[#1C61A1]">
//                     {formatCurrency(category.value)}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {`${((category.value / totalExpenses) * 100).toFixed(1)}%`}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ExpensesBreakdown;
