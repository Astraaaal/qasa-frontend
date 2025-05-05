import React from 'react';
import MetricsSection from '../modules/salesPerformance/KpiSection';
import ChartsSection from '../modules/salesPerformance/ChartSection';
import TopSellingProductsTable from '../modules/salesPerformance/TopSellingProductsTable';
import PendingSalesTable from '../modules/salesPerformance/PendingSalesTable';
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

      <div className="container mx-auto px-1 py-5">
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
