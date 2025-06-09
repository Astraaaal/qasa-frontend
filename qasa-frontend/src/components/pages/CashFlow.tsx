import { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Wallet, Banknote, ArrowDownCircle, ArrowUpCircle, Clock } from "lucide-react";
import { TransactionProps } from "../types/CashFlow";
import { BankAccountProps } from "../types/CashFlow";
import { CashFlowDataProps } from "../types/CashFlow";

const initialBankAccounts: BankAccountProps[] = [
  { id: 1, name: "Business Checking", balance: 24580.45, accountNumber: "**** 4532" },
  { id: 2, name: "Savings Account", balance: 52340.87, accountNumber: "**** 7890" },
  { id: 3, name: "Tax Reserve", balance: 15670.32, accountNumber: "**** 1234" },
];

const initialTransactions: TransactionProps[] = [
  { id: 1, date: "2025-04-25", description: "Client Payment - ABC Corp", amount: 12500.00, type: "income" },
  { id: 2, date: "2025-04-24", description: "Office Supplies", amount: 345.67, type: "expense" },
  { id: 3, date: "2025-04-23", description: "Client Payment - XYZ Ltd", amount: 8750.00, type: "income" },
  { id: 4, date: "2025-04-22", description: "Utility Bills", amount: 523.45, type: "expense" },
  { id: 5, date: "2025-04-21", description: "Software Subscription", amount: 199.99, type: "expense" },
  { id: 6, date: "2025-04-20", description: "Consulting Services", amount: 3500.00, type: "income" },
  { id: 7, date: "2025-04-19", description: "Office Rent", amount: 2200.00, type: "expense" },
];

const cashFlowData: CashFlowDataProps[] = [
  { month: "Jan", inflow: 42000, outflow: 38000 },
  { month: "Feb", inflow: 45000, outflow: 39500 },
  { month: "Mar", inflow: 51000, outflow: 42000 },
  { month: "Apr", inflow: 48000, outflow: 41000 },
  { month: "May", inflow: 52000, outflow: 44000 },
  { month: "Jun", inflow: 54000, outflow: 43000 },
];

export default function CashFlowDashboard() {
  const [bankAccounts, setBankAccounts] = useState<BankAccountProps[]>(initialBankAccounts);
  const [transactions, setTransactions] = useState<TransactionProps[]>(initialTransactions);
  const [cashOnHand, setCashOnHand] = useState<number>(2450.75);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const totalBankBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalAssets = totalBankBalance + cashOnHand;
  
  const distributionData = [
    { name: "Bank Accounts", value: totalBankBalance },
    { name: "Cash on Hand", value: cashOnHand }
  ];
  
  const COLORS = ["#0078D7", "#20476E"];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#20476E]">Cash Flow</h1>
        <p className="text-sm text-gray-600">
          Monitor your cash flow and liquidity
        </p>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Cash Flow</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Bank Balance */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Total Bank Balance</h3>
              <span className="bg-blue-100 p-2 rounded-full">
                <Banknote className="w-5 h-5 text-blue-600" />
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalBankBalance)}</div>
            <div className="text-sm text-gray-600 mt-2">{bankAccounts.length} accounts</div>
          </div>
          
          {/* Cash on Hand */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Cash on Hand</h3>
              <span className="bg-blue-100 p-2 rounded-full">
                <Wallet className="w-5 h-5 text-blue-600" />
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(cashOnHand)}</div>
            <div className="text-sm text-gray-600 mt-2">Updated today</div>
          </div>
          
          {/* Net Cash Flow */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Net Cash Flow (MTD)</h3>
              <span className="bg-blue-100 p-2 rounded-full">
                <ArrowUpCircle className="w-5 h-5 text-green-600" />
              </span>
            </div>
            <div className="text-2xl font-bold text-green-600">+{formatCurrency(11000)}</div>
            <div className="text-sm text-gray-600 mt-2">+8.2% from last month</div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Cash Flow Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Cash Flow</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashFlowData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#DCDCDC" />
                    <XAxis dataKey="month" stroke="#20476E" />
                    <YAxis stroke="#20476E" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="inflow" stroke="#0078D7" strokeWidth={2} activeDot={{ r: 8 }} name="Income" />
                    <Line type="monotone" dataKey="outflow" stroke="#20476E" strokeWidth={2} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Bank Accounts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Bank Accounts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Account</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Account Number</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bankAccounts.map((account) => (
                      <tr key={account.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.accountNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(account.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider" colSpan={2}>Total</td>
                      <td className="px-6 py-3 text-right text-xs font-bold text-gray-900 uppercase tracking-wider">{formatCurrency(totalBankBalance)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Cash Distribution Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Cash Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={distributionData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={60}
                      outerRadius={80} 
                      fill="#8884d8" 
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex items-center mx-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Bank ({((totalBankBalance / totalAssets) * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex items-center mx-2">
                  <div className="w-3 h-3 bg-blue-900 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Cash ({((cashOnHand / totalAssets) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
            
            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
                <span className="bg-gray-100 p-2 rounded-full">
                  <Clock className="w-4 h-4 text-gray-600" />
                </span>
              </div>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'income' ? 
                          <ArrowUpCircle className="w-4 h-4 text-green-600" /> : 
                          <ArrowDownCircle className="w-4 h-4 text-red-600" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  View all transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Transactions</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Description</th>
                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">{transaction.description}</td>
                      <td className={`px-4 py-2 text-sm text-right font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 capitalize">{transaction.type}</td>
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
}