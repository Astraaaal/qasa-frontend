import KpiCards from '../service/fetchTestFinancialSummaryKpiCards';

const Dashboard: React.FC = () => (
  <div className="p-6">
    <KpiCards />
    {/* other components like charts, tables, etc. */}
  </div>
);

export default Dashboard;