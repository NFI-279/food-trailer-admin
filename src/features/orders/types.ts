// src/features/orders/types.ts

export type OrderStatus = "PENDING" | "PREPARING" | "COMPLETED" | "CANCELLED";

export interface OrderItem {
  id: string;
  name: string; // We copy the name here so if the menu changes, the receipt doesn't break
  quantity: number;
  notes?: string; // E.g., "Fără muștar" or "Extra sos"
}

export interface Order {
  id: string;
  orderNumber: string; // The number printed on the receipt/given to the customer (e.g., #014)
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string; // ISO date string
  updatedAt: string;
}
