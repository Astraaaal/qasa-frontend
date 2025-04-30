

export interface TransactionProps {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: "income" | "expense";
};
  
export interface BankAccountProps {
    id: number;
    name: string;
    balance: number;
    accountNumber: string;
};
  
export interface CashFlowDataProps {
    month: string;
    inflow: number;
    outflow: number;
};