export const fetchFinancialSummaryKpiCards = async (token: string) => {
    const response = await fetch("http://localhost:9183/api/financialsummary", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch finanical");
    }
    
    const data = await response.json();
    
    return data.FinancialSummaryKpiCards || []; // Assuming the FinancialSummaryKpiCards data is inside 'FinancialSummaryKpiCards' field
  };
  