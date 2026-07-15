// src/features/orders/hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "./api";
import { isAppAuthenticated } from "@/components/auth-guard";

export const orderKeys = {
  active: ["orders", "active"] as const,
  completed: ["orders", "completed"] as const,
  unpaid: ["orders", "unpaid"] as const, // <-- ADD THIS
};

export function useActiveOrders() {
  return useQuery({
    queryKey: orderKeys.active,
    queryFn: ordersApi.getActiveOrders,
    refetchInterval: 3000, 
    enabled: isAppAuthenticated, // <-- ADD THIS TO ALL 3 GET QUERIES!
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
    refetchInterval: 3000,
    enabled: isAppAuthenticated,
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

export function useStartOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.startOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.active }),
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.active });
      // Invalidate dashboard and inventory because cancelling refunds the inventory!
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
}

export function useUnpaidOrders() {
  return useQuery({
    queryKey: orderKeys.unpaid,
    queryFn: ordersApi.getUnpaidOrders,
    refetchInterval: 3000,
    enabled: isAppAuthenticated,
  });
}

export function useMarkPaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.markPaid,
    onSuccess: () => {
      // It moves from Unpaid -> Active!
      queryClient.invalidateQueries({ queryKey: orderKeys.unpaid });
      queryClient.invalidateQueries({ queryKey: orderKeys.active });
    },
  });
}
