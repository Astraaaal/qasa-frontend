import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, FileText, DollarSign, Users, ChevronRight, XCircle, X, Search } from 'lucide-react';

type PurchaseOrder = {
  id: string;
  supplier: string;
  amount: number;
  date: string;
  status: string;
  description?: string;
  items?: PurchaseItem[];
};

type PurchaseItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

type Supplier = {
  name: string;
  amount: number;
  percentage: number;
  contact?: string;
  email?: string;
};

const pendingApprovals: PurchaseOrder[] = [
  { 
    id: 'PO-2025-042', 
    supplier: 'Office Supplies Co.', 
    amount: 122537.50, 
    date: '2025-04-20', 
    status: 'Pending',
    description: 'Office supplies for Q2 including paper, toner, and stationery',
    items: [
      { id: 'ITEM-001', name: 'A4 Paper (Reams)', quantity: 200, unitPrice: 250.50 },
      { id: 'ITEM-002', name: 'Printer Toner', quantity: 15, unitPrice: 3500.00 },
      { id: 'ITEM-003', name: 'Stationery Set', quantity: 50, unitPrice: 450.75 }
    ]
  },
  { 
    id: 'PO-2025-043', 
    supplier: 'Tech Solutions Inc.', 
    amount: 438000.00, 
    date: '2025-04-22', 
    status: 'Pending',
    description: 'Laptop computers and monitors for IT department upgrade',
    items: [
      { id: 'ITEM-004', name: 'Laptop Computers', quantity: 10, unitPrice: 35000.00 },
      { id: 'ITEM-005', name: '24" Monitors', quantity: 20, unitPrice: 6900.00 }
    ]
  },
  { 
    id: 'PO-2025-044', 
    supplier: 'Furniture Depot', 
    amount: 216275.00, 
    date: '2025-04-23', 
    status: 'Pending',
    description: 'Office furniture for new branch office',
    items: [
      { id: 'ITEM-006', name: 'Office Desks', quantity: 15, unitPrice: 8500.00 },
      { id: 'ITEM-007', name: 'Office Chairs', quantity: 15, unitPrice: 5250.00 },
      { id: 'ITEM-008', name: 'Filing Cabinets', quantity: 8, unitPrice: 3800.00 }
    ]
  },
  { 
    id: 'PO-2025-045', 
    supplier: 'Global Services Ltd.', 
    amount: 93762.50, 
    date: '2025-04-24', 
    status: 'Pending',
    description: 'Marketing materials and printing services',
    items: [
      { id: 'ITEM-009', name: 'Brochures (Boxes)', quantity: 50, unitPrice: 875.50 },
      { id: 'ITEM-010', name: 'Posters', quantity: 100, unitPrice: 350.00 },
      { id: 'ITEM-011', name: 'Banner Stands', quantity: 10, unitPrice: 2500.00 }
    ]
  },
];

const topSuppliers: Supplier[] = [
  { name: 'Tech Solutions Inc.', amount: 1437500.00, percentage: 35, contact: 'John Rodriguez', email: 'john@techsolutions.ph' },
  { name: 'Office Supplies Co.', amount: 771037.50, percentage: 19, contact: 'Maria Santos', email: 'maria@officesupplies.ph' },
  { name: 'Furniture Depot', amount: 617025.00, percentage: 15, contact: 'David Cruz', email: 'david@furnituredepot.ph' },
  { name: 'Global Services Ltd.', amount: 543762.50, percentage: 13, contact: 'Ana Reyes', email: 'ana@globalservices.ph' },
  { name: 'Maintenance Systems', amount: 432000.00, percentage: 11, contact: 'Luis Garcia', email: 'luis@mainsys.ph' },
];

const purchasesBySupplier = [
  { name: 'Tech Solutions Inc.', amount: 1437500 },
  { name: 'Office Supplies Co.', amount: 771037 },
  { name: 'Furniture Depot', amount: 617025 },
  { name: 'Global Services Ltd.', amount: 543762 },
  { name: 'Maintenance Systems', amount: 432000 },
  { name: 'Other Suppliers', amount: 283500 },
];

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Pending Approvals</p>
            <h2 className="text-2xl font-bold">4</h2>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <AlertCircle size={24} className="text-blue-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-600">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Purchases (April)</p>
            <h2 className="text-2xl font-bold">₱4,084,775.00</h2>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <DollarSign size={24} className="text-green-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-600">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Active Suppliers</p>
            <h2 className="text-2xl font-bold">12</h2>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Users size={24} className="text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PendingApprovalsTable = () => {
  const [showWarning, setShowWarning] = useState<{action: string, id: string} | null>(null);
  const [showDetailsForm, setShowDetailsForm] = useState<PurchaseOrder | null>(null);
  const [showAllForm, setShowAllForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  
  const handleAction = (action: string, id: string) => {
    setShowWarning({ action, id });
  };
  const confirmAction = () => {
    setShowWarning(null);
  };
  const cancelAction = () => {
    setShowWarning(null);
  };
  
  const handleViewDetails = (po: PurchaseOrder) => {
    setShowDetailsForm(po);
  };
  const handleViewAll = () => {
    setShowAllForm(true);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Pending Purchase Approvals</h2>
        <button 
          className="flex items-center text-blue-600 hover:text-blue-800"
          onClick={handleViewAll}
        >
          View All <ChevronRight size={16} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              <th className="py-3 px-4 font-bold">PO Number</th>
              <th className="py-3 px-4 font-bold">Supplier</th>
              <th className="py-3 px-4 font-bold">Amount</th>
              <th className="py-3 px-4 font-bold">Date</th>
              <th className="py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {pendingApprovals.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.supplier}</td>
                <td className="py-3 px-4">₱{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button 
                      className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200" 
                      title="Approve"
                      onClick={() => handleAction('approve', item.id)}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button 
                      className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200" 
                      title="Decline"
                      onClick={() => handleAction('decline', item.id)}
                    >
                      <XCircle size={20} />
                    </button>
                    <button 
                      className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" 
                      title="View Details"
                      onClick={() => handleViewDetails(item)}
                    >
                      <FileText size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Warning Dialog */}
      {showWarning && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {showWarning.action === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
            </h3>
            <p className="mb-6">
              {showWarning.action === 'approve' 
                ? `Are you sure you want to approve purchase order ${showWarning.id}? This action cannot be undone.`
                : `Are you sure you want to decline purchase order ${showWarning.id}? This action cannot be undone.`
              }
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={cancelAction}
              >
                Cancel
              </button>
              <button 
                className={`px-4 py-2 text-white rounded ${showWarning.action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                onClick={confirmAction}
              >
                {showWarning.action === 'approve' ? 'Approve' : 'Decline'}
              </button>
            </div>
          </div>
        </div>
      )}
      

      {/* View Details Form */}
      {showDetailsForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Purchase Order Details</h3>
              <button 
                onClick={() => setShowDetailsForm(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">PO Number</p>
                <p className="font-bold">{showDetailsForm.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                    {showDetailsForm.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Supplier</p>
                <p className="font-bold">{showDetailsForm.supplier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p>{showDetailsForm.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold text-blue-600">₱{showDetailsForm.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500">Description</p>
              <p>{showDetailsForm.description}</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Items</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-bold">Item</th>
                      <th className="text-right py-2 font-bold">Quantity</th>
                      <th className="text-right py-2 font-bold">Unit Price</th>
                      <th className="text-right py-2 font-bold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showDetailsForm.items?.map(item => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2 text-right">{item.quantity}</td>
                        <td className="py-2 text-right">₱{item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="py-2 text-right">₱{(item.quantity * item.unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold">
                      <td colSpan={3} className="py-2 text-right">Total:</td>
                      <td className="py-2 text-right">₱{showDetailsForm.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 z-[999]"
                onClick={() => handleAction('decline', showDetailsForm.id)}
              >
                Decline
              </button>
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleAction('approve', showDetailsForm.id)}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View All Form */}
      {showAllForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full h-5/6 flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">All Pending Purchase Orders</h3>
              <button 
                onClick={() => setShowAllForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by PO number, supplier..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-3 text-gray-400">
                  <Search size={20} />
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-grow">
              <table className="min-w-full bg-white">
                <thead className="sticky top-0 bg-white">
                  <tr className="bg-gray-100 text-gray-600 text-left">
                    <th className="py-3 px-4 font-bold">PO Number</th>
                    <th className="py-3 px-4 font-bold">Supplier</th>
                    <th className="py-3 px-4 font-bold">Amount</th>
                    <th className="py-3 px-4 font-bold">Date</th>
                    <th className="py-3 px-4 font-bold">Description</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {pendingApprovals
                    .filter(po => 
                      po.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      po.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (po.description && po.description.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.supplier}</td>
                      <td className="py-3 px-4">₱{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4 max-w-xs truncate">{item.description}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200" 
                            title="Approve"
                            onClick={() => {
                              handleAction('approve', item.id);
                            }}
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button 
                            className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200" 
                            title="Decline"
                            onClick={() => {
                              handleAction('decline', item.id)}}
                          >
                            <XCircle size={20} />
                          </button>
                          <button 
                            className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" 
                            title="View Details"
                            onClick={() =>{
                              handleViewDetails(item)}}
                          >
                            <FileText size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TopSuppliers = () => {
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

const PurchaseChart = () => {
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

export default function ProcurementDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen" style={{ fontFamily: 'Microsoft Sans Serif, Arial, sans-serif' }}>
      <div className="container mx-auto px-4 py-8">
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <PendingApprovalsTable />
          </div>
          <div className="lg:col-span-2">
            <PurchaseChart />
          </div>
          <div className="lg:col-span-1">
            <TopSuppliers />
          </div>
        </div>
      </div>
    </div>
  );
}