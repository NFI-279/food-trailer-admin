// [Frontend] src/features/inventory/components/inventory-list.tsx
"use client";

import { EditInventoryDialog } from "./edit-inventory-dialog";
import { useInventory, useAdjustStock, useDeleteInventoryItem } from "../hooks";
import { Trash2, Plus, Minus, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function InventoryList() {
  const { data: inventory, isLoading, isError } = useInventory();
  const adjustStock = useAdjustStock();
  const deleteStock = useDeleteInventoryItem();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-destructive font-bold">Failed to load inventory.</div>;
  }

  return (
    <div className="rounded-md border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[35%]">{t.inventory.colIngredient}</TableHead>
            <TableHead className="w-[25%] hidden md:table-cell">{t.inventory.colHealth}</TableHead>
            <TableHead className="w-[15%]">{t.inventory.colStatus}</TableHead>
            <TableHead className="w-[25%] text-right">{t.inventory.colUpdate}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory?.map((item) => {
            const isLowStock = item.currentStock <= item.lowStockThreshold;
            const isCritical = item.currentStock <= 0;
            
            // Calculate percentage based on double the threshold for a realistic bar
            const maxHealth = item.lowStockThreshold * 2;
            const percentage = Math.min((item.currentStock / maxHealth) * 100, 100);
            
            // Dynamic Color Logic: Green -> Yellow -> Red
            let barColor = "bg-green-500";
            if (percentage <= 50) barColor = "bg-yellow-500";
            if (isLowStock) barColor = "bg-red-500";

            return (
              <TableRow key={item.id} className="h-20">
                
                {/* 1. Ingredient Name & Edit Button */}
                <TableCell className="font-medium">
                  <div className="text-lg flex items-center">
                    <span className="font-bold">{item.name}</span>
                    <EditInventoryDialog item={item} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Alert at: {item.lowStockThreshold} {item.unit}
                  </div>
                </TableCell>
                
                {/* 2. Custom Progress Bar */}
                <TableCell className="hidden md:table-cell align-middle">
                  <div className="flex flex-col gap-2 w-[90%]">
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                      <div 
                        className={`h-full ${barColor} transition-all duration-500 ease-in-out`} 
                        style={{ width: `${percentage}%` }} 
                      />
                    </div>
                  </div>
                </TableCell>

                {/* 3. Status Badges */}
                <TableCell>
                  {isCritical ? (
                    <Badge variant="destructive" className="px-3 py-1 text-sm font-bold shadow-sm">{t.inventory.outOfStock}</Badge>
                  ) : isLowStock ? (
                    <Badge className="bg-orange-500 text-white hover:bg-orange-600 px-3 py-1 text-sm shadow-sm border-none">
                      <AlertCircle className="h-4 w-4 mr-1 inline" /> {t.inventory.low}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1 text-sm">
                      {t.inventory.healthy}
                    </Badge>
                  )}
                </TableCell>

                {/* 4. Action Buttons (+, -, Trash) */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 shrink-0"
                      disabled={adjustStock.isPending || item.currentStock <= 0}
                      onClick={() => adjustStock.mutate({ id: item.id, delta: -1 })}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-12 text-center font-bold text-lg">
                      {item.currentStock}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 shrink-0"
                      disabled={adjustStock.isPending}
                      onClick={() => adjustStock.mutate({ id: item.id, delta: 1 })}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 shrink-0 text-destructive hover:bg-destructive/10"
                      disabled={deleteStock.isPending}
                      onClick={() => {
                        if (window.confirm(t.inventory.deleteConfirm)) {
                          deleteStock.mutate(item.id); 
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
