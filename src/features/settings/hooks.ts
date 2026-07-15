// src/features/settings/hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsApi } from "./api";
import { toast } from "sonner";
import { isAppAuthenticated } from "@/components/auth-guard";

export const settingsKeys = {
  all: ["settings"] as const,
};

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: settingsApi.getSettings,
    enabled: isAppAuthenticated,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
      toast.success("Settings saved successfully!");
    },
    onError: () => {
      toast.error("Failed to save settings.");
    }
  });
}