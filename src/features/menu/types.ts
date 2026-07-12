// src/features/menu/types.ts
import { z } from "zod";

// 1. Define the schema for creating/updating a product
// This will be directly plugged into React Hook Form later!
// src/features/menu/types.ts
export const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().nullish(), // <-- Changed to nullish
  price: z.number().min(0, "Price must be at least 0"),
  category: z.enum(["Grill", "Sides", "Drinks", "Desserts"]),
  isAvailable: z.boolean(),
  imageUrl: z.string().url().nullish().or(z.literal("")), // <-- Changed to nullish
  
  inventoryItemId: z.string().nullish(),    // <-- Changed to nullish
  inventoryDeduction: z.number().nullish(), // <-- Changed to nullish
});

// 2. Infer the TypeScript type from the Zod schema
export type MenuItemInput = z.infer<typeof menuItemSchema>;

// 3. Define the full product type (what the API returns, including ID)
export type MenuItem = MenuItemInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};