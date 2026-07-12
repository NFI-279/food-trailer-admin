import { InventoryItem, InventoryItemInput } from "./types";
import { apiFetch } from "@/lib/api-client";

export const inventoryApi = {
  getInventory: (): Promise<InventoryItem[]> => apiFetch("/inventory"),
  
  createItem: (data: InventoryItemInput): Promise<InventoryItem> => 
    apiFetch("/inventory", { method: "POST", body: JSON.stringify(data) }),
    
  updateStock: (id: string, newStock: number): Promise<InventoryItem> => 
    apiFetch(`/inventory/${id}`, { method: "PATCH", body: JSON.stringify({ currentStock: newStock }) }),
    
  updateItemSettings: (id: string, data: InventoryItemInput): Promise<InventoryItem> => 
    apiFetch(`/inventory/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    
  deleteItem: (id: string): Promise<void> => 
    apiFetch(`/inventory/${id}`, { method: "DELETE" }),
};