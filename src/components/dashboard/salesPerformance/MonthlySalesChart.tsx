import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlySales } from '../../types/SalesPerformance';

interface MonthlySalesChartProps {
  data: MonthlySales[];
}

const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ data }) => {
  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 pb-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Monthly Sales Performance</h3>
        </div>
      </div>
      <div className="px-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${formatCurrency(value)}`, 'Sales']}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Bar dataKey="sales" fill="#0078D7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySalesChart;