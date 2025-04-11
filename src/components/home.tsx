import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import FinancialSummary from "./dashboard/FinancialSummary";
import DashboardLayout from "./layout/DashboardLayout";
import SalesPerformance from "./dashboard/SalesPerformance";
import Procurement from "./dashboard/Procurement";
import Inventory from "./dashboard/Inventory";
import CashFlow from "./dashboard/CashFlow";
import Account from "./dashboard/Account";

const Home = () => {
  return (
    <DashboardLayout>
      <Tabs>
        <TabsContent
          value="financial-summary"
          className="w-full h-full p-0 m-0"
        >
          <FinancialSummary />
        </TabsContent>
        <TabsContent
          value="sales-performance"
          className="w-full h-full p-0 m-0"
        >
          <SalesPerformance />
        </TabsContent>
        <TabsContent
          value="procurement"
          className="w-full h-full p-0 m-0"
        >
          <Procurement />
        </TabsContent>
        <TabsContent
          value="inventory"
          className="w-full h-full p-0 m-0"
        >
          <Inventory />
        </TabsContent>
        <TabsContent
          value="cash-flow"
          className="w-full h-full p-0 m-0"
        >
          <CashFlow />
        </TabsContent>
        <TabsContent
          value="account"
          className="w-full h-full p-0 m-0"
        >
          <Account />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Home;
