// [Frontend] src/features/dashboard/api.ts
import { apiFetch } from "@/lib/api-client"; // <-- Import the wrapper

export interface DashboardStats {
  revenueToday: number;
  revenueCash: number;
  revenueCard: number;
  ordersToday: number;
  activeOrders: number;
  lowStockItems: number;
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    // Look how clean this is now! We just pass the endpoint path.
    return apiFetch("/dashboard"); 
  },
};
