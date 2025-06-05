export interface PurchaseOrder {
    id: string;
    supplier: string;
    amount: number;
    date: string;
    status: string;
    description?: string;
    items?: PurchaseItem[];
};
  
export interface PurchaseItem {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
};
  
export interface Supplier {
    name: string;
    amount: number;
    percentage: number;
    contact?: string;
    email?: string;
};