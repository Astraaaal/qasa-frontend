export interface FinancialSummaryKpiCardsProps {
  id: string;
  title: string;
  value: string;
  change?: {
    value: string;
    type: "increase" | "decrease";
    percentage: string;
  };
  period?: string;
  icon?: React.ReactNode;
  status?: "green" | "yellow" | "red";
  description?: string;
}

export interface FinancialSummaryKpiCardsProps {
  cards?: FinancialSummaryKpiCardsProps[];
}

export interface FinancialSummaryProps {
  title?: string;
  subtitle?: string;
}