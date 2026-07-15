// src/features/analytics/hooks.ts
import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "./api";
import { isAppAuthenticated } from "@/components/auth-guard";

export function useAnalyticsChart() {
  return useQuery({
    queryKey: ["analytics", "chart"],
    queryFn: analyticsApi.getChartData,
    enabled: isAppAuthenticated,
  });
}