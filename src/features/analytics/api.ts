import { apiFetch } from "@/lib/api-client";

export interface DailyStat {
  day: string;
  revenue: number;
  orders: number;
}

export const analyticsApi = {
  getChartData: (): Promise<DailyStat[]> => apiFetch("/dashboard/chart"),
};