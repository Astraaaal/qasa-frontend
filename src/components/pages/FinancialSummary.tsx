import React from "react";
import KpiCards from "../modules/financialSummary/KpiCards";
import PendingTransactions from "../modules/financialSummary/PendingTransactions";
import ExpensesBreakdown from "../modules/financialSummary/ExpensesBreakdown";
import RevenueExpensesTrend from "../modules/financialSummary/RevenueExpensesTrend";
import ActionButtons from "../dashboard/common/RefreshButton";
import { FinancialSummaryProps } from "../types/FinancialSummary";


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
        <KpiCards id={""} title={""} value={""} />
      </div>

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
