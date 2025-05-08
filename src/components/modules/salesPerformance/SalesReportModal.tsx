import React from 'react';

interface Props {
  onClose: () => void;
}
// Static data muna
const SalesReportModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white max-w-xl w-full rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Sales Report Summary</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p>📈 Total Sales: ₱80,000</p>
          <p>🧾 Total Orders: 160</p>
          <p>✅ Approved: 120</p>
          <p>⏳ Pending: 40</p>
        </div>
        <div className="mt-6 text-right">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesReportModal;
