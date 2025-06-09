import { Supplier} from '../../types/Procurement';

const topSuppliers: Supplier[] = [
  { name: 'Tech Solutions Inc.', amount: 1437500.00, percentage: 35, contact: 'John Rodriguez', email: 'john@techsolutions.ph' },
  { name: 'Office Supplies Co.', amount: 771037.50, percentage: 19, contact: 'Maria Santos', email: 'maria@officesupplies.ph' },
  { name: 'Furniture Depot', amount: 617025.00, percentage: 15, contact: 'David Cruz', email: 'david@furnituredepot.ph' },
  { name: 'Global Services Ltd.', amount: 543762.50, percentage: 13, contact: 'Ana Reyes', email: 'ana@globalservices.ph' },
  { name: 'Maintenance Systems', amount: 432000.00, percentage: 11, contact: 'Luis Garcia', email: 'luis@mainsys.ph' },
];

export const TopSuppliers = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top Suppliers</h2>
        <div className="space-y-4">
          {topSuppliers.map((supplier) => (
            <div key={supplier.name} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold">{supplier.name}</h3>
                <span className="text-blue-600 font-bold">₱{supplier.amount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${supplier.percentage}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">
                {supplier.percentage}% of total purchases
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  