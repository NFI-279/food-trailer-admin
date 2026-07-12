import { MenuItem, MenuItemInput } from "./types";
import { apiFetch } from "@/lib/api-client";

export const menuApi = {
  getMenuItems: (): Promise<MenuItem[]> => apiFetch("/menu"),
  
  createMenuItem: (data: MenuItemInput): Promise<MenuItem> => 
    apiFetch("/menu", { method: "POST", body: JSON.stringify(data) }),
    
  updateMenuItem: (id: string, data: MenuItemInput): Promise<MenuItem> => 
    apiFetch(`/menu/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    
  toggleAvailability: (id: string): Promise<MenuItem> => 
    apiFetch(`/menu/${id}/toggle`, { method: "PATCH" }),
    
  deleteMenuItem: (id: string): Promise<void> => 
    apiFetch(`/menu/${id}`, { method: "DELETE" }),
};