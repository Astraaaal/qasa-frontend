import React from "react";

const Account = () => {
  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#20476E]">
          Account Management
        </h1>
        <p className="text-sm text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-[#20476E] mb-4">
              Account Management Module
            </h2>
            <p className="text-gray-600 mb-4">
              This module is under development. Check back soon for updates.
            </p>
            <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">
                Account settings and controls will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;