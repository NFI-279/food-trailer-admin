import { Order } from "./types";
import { apiFetch } from "@/lib/api-client";

export const ordersApi = {
  getActiveOrders: (): Promise<Order[]> => apiFetch("/orders/active"),
  
  getCompletedOrders: (): Promise<Order[]> => apiFetch("/orders/completed"),
  
  completeOrder: (id: string): Promise<void> => 
    apiFetch(`/orders/${id}/complete`, { method: "PATCH" }),
    
  revertOrder: (id: string): Promise<void> => 
    apiFetch(`/orders/${id}/revert`, { method: "PATCH" }),

  startOrder: (id: string): Promise<void> => 
    apiFetch(`/orders/${id}/start`, { method: "PATCH" }),

  cancelOrder: (id: string): Promise<void> => 
    apiFetch(`/orders/${id}/cancel`, { method: "PATCH" }),
};
