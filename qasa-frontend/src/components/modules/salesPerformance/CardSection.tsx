import React, { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: {
    value: string;
    increase: boolean;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, change, action }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-2 rounded-full ${change?.increase ? 'bg-green-100' : change ? 'bg-red-100' : 'bg-amber-100'}`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center mt-2">
          <span className={`text-sm font-bold ${change.increase ? 'text-green-600' : 'text-red-600'}`}>
            {change.value}
          </span>
          <span className="text-gray-500 text-sm ml-1">from last month</span>
        </div>
      )}
      {action && (
        <div className="flex mt-2">
          <button 
            className="text-blue-600 text-sm font-bold bg-blue-50 px-3 py-1 rounded-full mr-2"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default MetricCard;