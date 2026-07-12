import { AppSettings, SettingsInput } from "./types";
import { apiFetch } from "@/lib/api-client";

export const settingsApi = {
  getSettings: (): Promise<AppSettings> => apiFetch("/settings"),
  
  updateSettings: (data: Partial<SettingsInput>): Promise<AppSettings> => 
    apiFetch("/settings", { method: "PATCH", body: JSON.stringify(data) }),
};