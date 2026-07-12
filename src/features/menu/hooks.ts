// src/features/menu/hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { menuApi } from "./api";

// Query Key factory (best practice to avoid typos)
export const menuKeys = {
  all: ["menu"] as const,
};

// Hook to fetch all menu items
export function useMenu() {
  return useQuery({
    queryKey: menuKeys.all,
    queryFn: menuApi.getMenuItems,
  });
}

// Hook to toggle availability
export function useToggleAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => menuApi.toggleAvailability(id),
    onSuccess: () => {
      // This tells TanStack Query: "The data changed! Refetch the menu!"
      queryClient.invalidateQueries({ queryKey: menuKeys.all });
    },
  });
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuApi.createMenuItem,
    onSuccess: () => {
      // Refresh the menu list instantly after a successful creation
      queryClient.invalidateQueries({ queryKey: menuKeys.all });
    },
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuApi.deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.all });
    },
  });
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MenuItemInput }) => 
      menuApi.updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.all });
    },
  });
}