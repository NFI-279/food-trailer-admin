// src/features/inventory/hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryApi } from "./api";
import { InventoryItemInput } from "./types";

export const inventoryKeys = {
  all: ["inventory"] as const,
};

export function useInventory() {
  return useQuery({
    queryKey: inventoryKeys.all,
    queryFn: inventoryApi.getInventory,
    refetchInterval: 3000,
  });
}

export function useUpdateStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newStock }: { id: string; newStock: number }) => 
      inventoryApi.updateStock(id, newStock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
      // We also invalidate dashboard stats so the "Alerts" card updates!
      queryClient.invalidateQueries({ queryKey: ["dashboard"] }); 
    },
  });
}

export function useCreateInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inventoryApi.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
    },
  });
}

export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InventoryItemInput }) => 
      inventoryApi.updateItemSettings(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inventoryApi.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}