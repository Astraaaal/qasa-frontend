import { PurchaseOrder, PurchaseItem, Supplier } from '../types/Procurement'; 

const pendingApprovals: PurchaseOrder[] = [
    { 
      id: 'PO-2025-042', 
      supplier: 'Office Supplies Co.', 
      amount: 122537.50, 
      date: '2025-04-20', 
      status: 'Pending',
      description: 'Office supplies for Q2 including paper, toner, and stationery',
      items: [
        { id: 'ITEM-001', name: 'A4 Paper (Reams)', quantity: 200, unitPrice: 250.50 },
        { id: 'ITEM-002', name: 'Printer Toner', quantity: 15, unitPrice: 3500.00 },
        { id: 'ITEM-003', name: 'Stationery Set', quantity: 50, unitPrice: 450.75 }
      ]
    },
    { 
      id: 'PO-2025-043', 
      supplier: 'Tech Solutions Inc.', 
      amount: 438000.00, 
      date: '2025-04-22', 
      status: 'Pending',
      description: 'Laptop computers and monitors for IT department upgrade',
      items: [
        { id: 'ITEM-004', name: 'Laptop Computers', quantity: 10, unitPrice: 35000.00 },
        { id: 'ITEM-005', name: '24" Monitors', quantity: 20, unitPrice: 6900.00 }
      ]
    },
    { 
      id: 'PO-2025-044', 
      supplier: 'Furniture Depot', 
      amount: 216275.00, 
      date: '2025-04-23', 
      status: 'Pending',
      description: 'Office furniture for new branch office',
      items: [
        { id: 'ITEM-006', name: 'Office Desks', quantity: 15, unitPrice: 8500.00 },
        { id: 'ITEM-007', name: 'Office Chairs', quantity: 15, unitPrice: 5250.00 },
        { id: 'ITEM-008', name: 'Filing Cabinets', quantity: 8, unitPrice: 3800.00 }
      ]
    },
    { 
      id: 'PO-2025-045', 
      supplier: 'Global Services Ltd.', 
      amount: 93762.50, 
      date: '2025-04-24', 
      status: 'Pending',
      description: 'Marketing materials and printing services',
      items: [
        { id: 'ITEM-009', name: 'Brochures (Boxes)', quantity: 50, unitPrice: 875.50 },
        { id: 'ITEM-010', name: 'Posters', quantity: 100, unitPrice: 350.00 },
        { id: 'ITEM-011', name: 'Banner Stands', quantity: 10, unitPrice: 2500.00 }
      ]
    },
  ];
  
  const topSuppliers: Supplier[] = [
    { name: 'Tech Solutions Inc.', amount: 1437500.00, percentage: 35, contact: 'John Rodriguez', email: 'john@techsolutions.ph' },
    { name: 'Office Supplies Co.', amount: 771037.50, percentage: 19, contact: 'Maria Santos', email: 'maria@officesupplies.ph' },
    { name: 'Furniture Depot', amount: 617025.00, percentage: 15, contact: 'David Cruz', email: 'david@furnituredepot.ph' },
    { name: 'Global Services Ltd.', amount: 543762.50, percentage: 13, contact: 'Ana Reyes', email: 'ana@globalservices.ph' },
    { name: 'Maintenance Systems', amount: 432000.00, percentage: 11, contact: 'Luis Garcia', email: 'luis@mainsys.ph' },
  ];
  
  const purchasesBySupplier = [
    { name: 'Tech Solutions Inc.', amount: 1437500 },
    { name: 'Office Supplies Co.', amount: 771037 },
    { name: 'Furniture Depot', amount: 617025 },
    { name: 'Global Services Ltd.', amount: 543762 },
    { name: 'Maintenance Systems', amount: 432000 },
    { name: 'Other Suppliers', amount: 283500 },
  ];