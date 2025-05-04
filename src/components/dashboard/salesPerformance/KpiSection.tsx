import React from 'react';
import MetricCard from './KpiCard';
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';

const MetricsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <MetricCard 
        title="Total Sales This Month"
        value="₱548,290"
        icon={<ArrowUp className="text-green-600" size={20} />}
        change={{ value: '+12.5%', increase: true }}
      />
      <MetricCard 
        title="Total Orders"
        value="1,248"
        icon={<ArrowUp className="text-green-600" size={20} />}
        change={{ value: '+8.2%', increase: true }}
      />
      <MetricCard 
        title="Average Order Value"
        value="₱439"
        icon={<ArrowDown className="text-red-600" size={20} />}
        change={{ value: '-2.3%', increase: false }}
      />
      <MetricCard 
        title="Pending Approvals"
        value="24"
        icon={<ChevronDown className="text-amber-600" size={20} />}
        action={{ label: 'Review Now', onClick: () => console.log('Review clicked') }}
      />
    </div>
  );
};

export default MetricsSection;