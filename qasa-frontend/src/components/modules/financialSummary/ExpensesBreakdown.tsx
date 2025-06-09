import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

interface ExpensesBreakdownProps {
  categories?: ExpenseCategory[];
  title?: string;
}

const ExpensesBreakdown = ({
  categories = [
    { name: "Salaries", value: 45000, color: "#0078D7" },
    { name: "Rent", value: 25000, color: "#1C61A1" },
    { name: "Utilities", value: 15000, color: "#20476E" },
  ],
  title = "Expenses Breakdown",
}: ExpensesBreakdownProps) => {
  const totalExpenses = categories.reduce(
    (sum, category) => sum + category.value,
    0,
  );

  const formatCurrency = (value: number) => {
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
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold text-[#20476E]">{data.name}</p>
          <p className="text-[#0078D7]">{formatCurrency(data.value)}</p>
          <p className="text-gray-600">{`${((data.value / totalExpenses) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#20476E]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
            {categories.map((category, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-[#20476E]">
                    {category.name}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-[#1C61A1]">
                    {formatCurrency(category.value)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {`${((category.value / totalExpenses) * 100).toFixed(1)}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesBreakdown;
