export interface Product {
    id: number;
    name: string;
    sales: number;
    revenue: string;
    growth: number;
}
  
export interface SalesOrder {
    id: string;
    customer: string;
    date: string;
    amount: string;
    status: string;
}
  
export interface MonthlySales {
    month: string;
    sales: number;
}
  
export interface ProductSalesData {
    name: string;
    value: number;
}
  
export interface ActionWarning {
    show: boolean;
    orderId: string;
    action: string;
}
  