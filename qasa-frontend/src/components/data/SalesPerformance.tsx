import { MonthlySales, ProductSalesData, Product, SalesOrder } from '../types/SalesPerformance';

export const monthlySalesData: MonthlySales[] = [
  { month: 'Jan', sales: 65000 },
  { month: 'Feb', sales: 59000 },
  { month: 'Mar', sales: 80000 },
  { month: 'Apr', sales: 81000 },
  { month: 'May', sales: 56000 },
  { month: 'Jun', sales: 55000 },
  { month: 'Jul', sales: 40000 },
  { month: 'Aug', sales: 94000 },
  { month: 'Sep', sales: 78000 },
  { month: 'Oct', sales: 100000 },
  { month: 'Nov', sales: 76000 },
  { month: 'Dec', sales: 91000 },
];

export const productSalesData: ProductSalesData[] = [
  { name: 'Accounting Software', value: 400 },
  { name: 'Tax Filing Service', value: 300 },
  { name: 'Payroll System', value: 200 },
  { name: 'Financial Consultation', value: 100 },
  { name: 'Audit Services', value: 150 }
];

export const topSellingProducts: Product[] = [
  { id: 1, name: 'Enterprise Accounting Software', sales: 145, revenue: '₱72,500', growth: 12.3 },
  { id: 2, name: 'Tax Filing Pro Package', sales: 132, revenue: '₱39,600', growth: 8.7 },
  { id: 3, name: 'Payroll Management System', sales: 97, revenue: '₱48,500', growth: -3.2 },
  { id: 4, name: 'Financial Consulting (10hr)', sales: 84, revenue: '₱25,200', growth: 15.8 },
  { id: 5, name: 'Audit Services Basic', sales: 76, revenue: '₱15,200', growth: 2.4 },
];

export const pendingSalesOrders: SalesOrder[] = [
  { id: 'SO-7829', customer: 'Acme Corporation', date: '2025-04-22', amount: '₱12,450.00', status: 'Pending Approval' },
  { id: 'SO-7830', customer: 'TechGiant Industries', date: '2025-04-23', amount: '₱8,975.25', status: 'Pending Review' },
  { id: 'SO-7831', customer: 'Global Enterprises', date: '2025-04-23', amount: '₱5,680.75', status: 'Pending Approval' },
  { id: 'SO-7832', customer: 'Smith & Associates', date: '2025-04-24', amount: '₱3,450.00', status: 'Pending Review' },
  { id: 'SO-7833', customer: 'InnoTech Solutions', date: '2025-04-24', amount: '₱9,240.50', status: 'Pending Approval' },
];

export const COLORS = ['#0078D7', '#1C61A1', '#20476E', '#3A8DDE', '#5AAAF2'];
