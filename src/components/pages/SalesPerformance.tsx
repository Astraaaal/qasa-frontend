import React from 'react';
import MetricsSection from '../dashboard/salesPerformance/KpiSection';
import ChartsSection from '../dashboard/salesPerformance/ChartSection';
import TopSellingProductsTable from '../dashboard/salesPerformance/TopSellingProductsTable';
import PendingSalesTable from '../dashboard/salesPerformance/PendingSalesTable';
import { 
  monthlySalesData, 
  productSalesData, 
  topSellingProducts, 
  pendingSalesOrders 
} from '../data/SalesPerformance';

interface SalesPerformanceProps {
    title?: string;
    subtitle?: string;
}

const SalesPerformance = ({
    title = "Sales Performance",
    subtitle = "Overview of your financial performance",
}: SalesPerformanceProps) => {
  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#20476E]">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="container mx-auto px-6 py-6">
        <MetricsSection />
        <ChartsSection 
          monthlySalesData={monthlySalesData}
          productSalesData={productSalesData}
        />
        <TopSellingProductsTable products={topSellingProducts} />
        <PendingSalesTable orders={pendingSalesOrders} />
      </div>
    </div>
  );
};

export default SalesPerformance;
