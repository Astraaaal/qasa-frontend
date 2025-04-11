import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import FinancialSummary from "./dashboard/FinancialSummary";
import DashboardLayout from "./layout/DashboardLayout";

const Home = () => {
  return (
    <DashboardLayout>
      <Tabs defaultValue="financial-summary" className="w-full h-full">
        <TabsContent
          value="financial-summary"
          className="w-full h-full p-0 m-0"
        >
          <FinancialSummary />
        </TabsContent>
        <TabsContent value="sales-performance" className="w-full h-full p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#20476E] mb-4">
                Sales Performance Module
              </h2>
              <p className="text-gray-600">
                This module is under development. Check back soon for updates.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="procurement" className="w-full h-full p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#20476E] mb-4">
                Procurement Module
              </h2>
              <p className="text-gray-600">
                This module is under development. Check back soon for updates.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="inventory" className="w-full h-full p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#20476E] mb-4">
                Inventory Module
              </h2>
              <p className="text-gray-600">
                This module is under development. Check back soon for updates.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cash-flow" className="w-full h-full p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#20476E] mb-4">
                Cash Flow Module
              </h2>
              <p className="text-gray-600">
                This module is under development. Check back soon for updates.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="account" className="w-full h-full p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#20476E] mb-4">
                Account Management
              </h2>
              <p className="text-gray-600">
                This module is under development. Check back soon for updates.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Home;
