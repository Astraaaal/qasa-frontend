import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialSummary from "./FinancialSummary";
import DashboardLayout from "../layout/DashboardLayout";
import SalesPerformance from "./SalesPerformance";
import Procurement from "./Procurement";
import Inventory from "./Inventory";
import CashFlow from "./CashFlow";

const Home = () => {
  const [activeTab, setActiveTab] = useState("financial-summary");

  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#20476E]">dashboard</h1>
        <p className="text-sm text-gray-600">
          Manage your dashboard processes
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-[#20476E] mb-4">
              dashboard Module
            </h2>
            <p className="text-gray-600 mb-4">
              This module is under development. Check back soon for updates.
            </p>
            <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">
                Dashboard data and controls will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
