import React from 'react';
import SummaryCards from '../modules/salesPerformance/SummaryCards';
import MonthlySalesChart from '../modules/salesPerformance/MonthlySalesChart';
import ProductSalesDistributionChart from '../modules/salesPerformance/ProductSalesDistributionChart';
import TopSellingProducts from '../modules/salesPerformance/TopSellingProductsTable';
import PendingSalesTransaction from '../modules/salesPerformance/PendingSalesTransaction';
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
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MonthlySalesChart data={monthlySalesData} />
          <ProductSalesDistributionChart data={productSalesData} />
        </div>
        <TopSellingProducts products={topSellingProducts} />
        <PendingSalesTransaction orders={pendingSalesOrders} />
      </div>
    </div>
  );
};

export default SalesPerformance;
