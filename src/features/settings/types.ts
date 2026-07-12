// src/features/settings/types.ts
import { z } from "zod";

export const settingsSchema = z.object({
  isAcceptingOrders: z.boolean(),
  openTime: z.string().min(5),
  closeTime: z.string().min(5),
  overrideOpen: z.boolean(),
  muteKitchenDing: z.boolean(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

export type AppSettings = SettingsInput & {
  id: string;
  updatedAt: string;
};