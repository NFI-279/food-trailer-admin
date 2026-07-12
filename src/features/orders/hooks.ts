// src/features/orders/hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "./api";

export const orderKeys = {
  active: ["orders", "active"] as const,
  completed: ["orders", "completed"] as const,
};

export function useActiveOrders() {
  return useQuery({
    queryKey: orderKeys.active,
    queryFn: ordersApi.getActiveOrders,
    // Poll every 10 seconds to look for new orders! 
    // This simulates real-time updates until we add Socket.IO later.
    refetchInterval: 3000, 
  });
}

export function useCompleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.completeOrder,
    onSuccess: () => {
      // Refresh BOTH lists instantly!
      queryClient.invalidateQueries({ queryKey: orderKeys.active });
      queryClient.invalidateQueries({ queryKey: orderKeys.completed });
    },
  });
}

export function useCompletedOrders() {
  return useQuery({
    queryKey: orderKeys.completed,
    queryFn: ordersApi.getCompletedOrders,
    refetchInterval: 10000, // Keep it synced like the active ones
  });
}

export function useRevertOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.revertOrder,
    onSuccess: () => {
      // Refresh BOTH lists when an order changes state!
      queryClient.invalidateQueries({ queryKey: orderKeys.active });
      queryClient.invalidateQueries({ queryKey: orderKeys.completed });
    },
  });
}
