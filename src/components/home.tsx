import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialSummary from "./dashboard/FinancialSummary";
import DashboardLayout from "./layout/DashboardLayout";
import SalesPerformance from "./dashboard/SalesPerformance";
import Procurement from "./dashboard/Procurement";
import Inventory from "./dashboard/Inventory";
import CashFlow from "./dashboard/CashFlow";

const Home = () => {
  const [activeTab, setActiveTab] = useState("financial-summary");

  return (
    <DashboardLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList>
          <TabsTrigger value="financial-summary"></TabsTrigger>
          <TabsTrigger value="sales-performance"></TabsTrigger>
          <TabsTrigger value="procurement"></TabsTrigger>
          <TabsTrigger value="inventory"></TabsTrigger>
          <TabsTrigger value="cash-flow"></TabsTrigger>
        </TabsList>

        <TabsContent value="financial-summary" className="">
          <FinancialSummary />
        </TabsContent>
        <TabsContent value="sales-performance" className="">
          <SalesPerformance />
        </TabsContent>
        <TabsContent value="procurement" className="">
          <Procurement />
        </TabsContent>
        <TabsContent value="inventory" className="">
          <Inventory />
        </TabsContent>
        <TabsContent value="cash-flow" className="">
          <CashFlow />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Home;
