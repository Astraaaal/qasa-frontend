import React, { useEffect, useState } from 'react';
import { FinancialSummaryKpiCardsProps } from '../types/FinancialSummaryKpiCards';

const fetchFinancialSummaryKpiCards: React.FC = () => {
  const [kpis, setKpis] = useState<FinancialSummaryKpiCardsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const res = await fetch(''); // replace with your actual API
        if (!res.ok) throw new Error('Network response was not ok');
        const data: FinancialSummaryKpiCardsProps[] = await res.json();
        setKpis(data);
      } catch (err) {
        console.error('Failed to fetch KPIs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, []);

  if (loading) return <div>Loading KPIs...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi) => (
        <div key={kpi.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">{kpi.title}</h2>
            <p className="text-2xl font-bold text-[#20476E]">{kpi.value}</p>
          </div>
          {/*kpi.icon && <img src={kpi.icon} alt={kpi.title} className="h-8 w-8" />*/}
        </div>
      ))}
    </div>
  );
};
{/* For testing API https://dummyjson.com/custom-response*/}

export default fetchFinancialSummaryKpiCards;