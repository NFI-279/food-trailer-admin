// src/features/inventory/types.ts
import { z } from "zod";

export const inventoryItemSchema = z.object({
  name: z.string().min(2, "Name is required"),
  unit: z.enum(["kg", "buc", "litri", "porții"]), // The unit of measurement
  currentStock: z.number().min(0, "Stock cannot be negative"),
  lowStockThreshold: z.number().min(0, "Threshold cannot be negative"),
});

export type InventoryItemInput = z.infer<typeof inventoryItemSchema>;

export type InventoryItem = InventoryItemInput & {
  id: string;
  lastUpdated: string;
};