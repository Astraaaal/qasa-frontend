import React from 'react';
import MonthlySalesChart from './MonthlySalesChart';
import ProductDistributionChart from './ProductDistributionChart';
import { MonthlySales, ProductSalesData } from '../../types/SalesPerformance';

interface ChartsSectionProps {
  monthlySalesData: MonthlySales[];
  productSalesData: ProductSalesData[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ monthlySalesData, productSalesData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <MonthlySalesChart data={monthlySalesData} />
      <ProductDistributionChart data={productSalesData} />
    </div>
  );
};

export default ChartsSection;