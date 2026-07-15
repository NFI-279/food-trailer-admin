import { InventoryItem, InventoryItemInput } from "./types";
import { apiFetch } from "@/lib/api-client";

export const inventoryApi = {
  getInventory: (): Promise<InventoryItem[]> => apiFetch("/inventory"),
  
  createItem: (data: InventoryItemInput): Promise<InventoryItem> => 
    apiFetch("/inventory", { method: "POST", body: JSON.stringify(data) }),
    
  adjustStock: (id: string, delta: number): Promise<InventoryItem> => 
    apiFetch(`/inventory/${id}/adjust`, { 
      method: "PATCH", 
      body: JSON.stringify({ delta }) // We send +1 or -1 now!
    }),
    
  updateItemSettings: (id: string, data: InventoryItemInput): Promise<InventoryItem> => 
    apiFetch(`/inventory/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    
  deleteItem: (id: string): Promise<void> => 
    apiFetch(`/inventory/${id}`, { method: "DELETE" }),
};