import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, FileText, DollarSign, Users, ChevronRight, XCircle, X, Search } from 'lucide-react';
import { SummaryCards } from '../modules/procurement/SummaryCards';
import { PendingApprovalsTable } from '../modules/procurement/PendingApprovalTable';
import { PurchaseChart } from '../modules/procurement/PurchaseChart';
import { TopSuppliers } from '../modules/procurement/TopSuppliers';


interface ProcurementProps {
  title?: string;
  subtitle?: string;
}

const Procurement = ({
  title = "Procurement",
  subtitle = "Overview of your procurement performance",
}: ProcurementProps) => {
  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#20476E]">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="container mx-auto px-1 py-5">
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-3">
            <PendingApprovalsTable />
          </div>
          <div className="lg:col-span-2">
            <PurchaseChart />
          </div>
          <div className="lg:col-span-1">
            <TopSuppliers />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Procurement;