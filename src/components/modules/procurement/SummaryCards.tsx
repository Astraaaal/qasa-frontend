import { AlertCircle, DollarSign, Users } from "lucide-react";


export const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Pending Approvals</p>
            <h2 className="text-2xl font-bold">4</h2>
          </div>
          {/*<div className="p-3 bg-blue-50 rounded-full">
            <AlertCircle size={24} className="text-blue-600" />
          </div>*/}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-600">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Purchases (April)</p>
            <h2 className="text-2xl font-bold">₱4,084,775.00</h2>
          </div>
          {/*<div className="p-3 bg-green-50 rounded-full">
            <DollarSign size={24} className="text-green-600" />
          </div>*/}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-600">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Active Suppliers</p>
            <h2 className="text-2xl font-bold">12</h2>
          </div>
          {/*<div className="p-3 bg-purple-50 rounded-full">
            <Users size={24} className="text-purple-600" />
          </div>*/}
        </div>
      </div>
    </div>
  );
};