import React from 'react';
import { Clock, ShoppingCart, Package, AlertTriangle } from 'lucide-react';

const SummaryCard = ({ title, count, value, iconType, color, isInventory }) => {
  // Determine which icon to render based on iconType
  const renderIcon = () => {
    switch (iconType) {
      case 'clock':
        return <Clock className="text-blue-500" />;
      case 'shopping-cart':
        return <ShoppingCart className="text-green-500" />;
      case 'package':
        return <Package className="text-purple-500" />;
      case 'alert-triangle':
        return <AlertTriangle className="text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`${color} p-4 rounded-lg shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{count}</p>
        </div>
        <div className="p-2 rounded-lg bg-white bg-opacity-60">
          {renderIcon()}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;