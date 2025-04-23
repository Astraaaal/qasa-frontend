import React from "react";
import KpiCards from "../dashboard/KpiCards";
import PendingTransactions from "../dashboard/PendingTransactions";
import ExpensesBreakdown from "../dashboard/ExpensesBreakdown";
import RevenueExpensesTrend from "../dashboard/RevenueExpensesTrend";
import ActionButtons from "../dashboard/RefreshButton";

interface FinancialSummaryProps {
  title?: string;
  subtitle?: string;
}

const FinancialSummary = ({
  title = "Financial Summary",
  subtitle = "Overview of your financial performance",
}: FinancialSummaryProps) => {
  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#20476E]">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* KPI Cards Section */}
      <div className="mb-6">
        <KpiCards />
      </div>

      {/* Action Buttons
      <div className="mb-6">
        <ActionButtons />
      </div>*/}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <RevenueExpensesTrend />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <PendingTransactions />
          </div>
          <div>
            <ExpensesBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
