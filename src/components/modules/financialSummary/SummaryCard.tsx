import React from 'react';
import { Clock, ShoppingCart, Package, AlertTriangle } from 'lucide-react';

const SummaryCard = ({ title, value, change, period, status, description, iconType, color }) => {
  // Determine which status to render based on color
  const renderStatus = () => {
    switch (status) {
      case 'green':
        return <Clock className="text-blue-500" />;
      case 'yellow':
        return <ShoppingCart className="text-green-500" />;
      case 'red':
        return <Package className="text-purple-500"  />;
      default:
        return null;
    }
  };

  return (
    <div className={`${color} p-4 rounded-lg shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-white bg-opacity-60">
          {renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;