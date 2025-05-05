import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ActionWarning } from '../../types/SalesPerformance';

interface WarningModalProps {
  warning: ActionWarning;
  onConfirm: () => void;
  onCancel: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ warning, onConfirm, onCancel }) => {
  if (!warning.show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4 text-amber-500">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-bold">Confirmation Required</h3>
        </div>
        
        <p className="text-gray-700 mb-6">
          Are you sure you want to {warning.action === 'approve' ? 'approve' : 'reject'} order {warning.orderId}? 
          This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-2">
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className={`px-4 py-2 text-white rounded font-medium ${
              warning.action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
            onClick={onConfirm}
          >
            {warning.action === 'approve' ? 'Approve' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;