// [Frontend Admin] src/features/orders/types.ts
export type OrderStatus = "UNPAID" | "PENDING" | "PREPARING" | "COMPLETED" | "CANCELLED";

export interface OrderItem {
  id: string;
  name: string; 
  quantity: number;
  notes?: string; 
}

export interface Order {
  id: string;
  orderNumber: string; 
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string; // <-- ADD THIS
  createdAt: string; 
  updatedAt: string; 
}
