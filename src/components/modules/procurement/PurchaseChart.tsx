import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart } from "recharts";
import { PurchaseItem } from '../../types/Procurement';

const purchasesBySupplier = [
    { name: 'Tech Solutions Inc.', amount: 1437500 },
    { name: 'Office Supplies Co.', amount: 771037 },
    { name: 'Furniture Depot', amount: 617025 },
    { name: 'Global Services Ltd.', amount: 543762 },
    { name: 'Maintenance Systems', amount: 432000 },
    { name: 'Other Suppliers', amount: 283500 },
  ];

export const PurchaseChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Purchases per Supplier</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={purchasesBySupplier}
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
              formatter={(value) => [`₱${value.toLocaleString()}`, "Amount"]} 
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