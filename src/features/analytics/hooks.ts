// src/features/analytics/hooks.ts
import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "./api";

export function useAnalyticsChart() {
  return useQuery({
    queryKey: ["analytics", "chart"],
    queryFn: analyticsApi.getChartData,
  });
}
