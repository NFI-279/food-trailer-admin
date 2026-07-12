// src/features/inventory/components/add-inventory-dialog.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryForm } from "./inventory-form";
import { useCreateInventoryItem } from "../hooks";
import { InventoryItemInput } from "../types";

export function AddInventoryDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateInventoryItem();

  const onSubmit = (data: InventoryItemInput) => {
    createMutation.mutate(data, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
          </DialogHeader>
          <InventoryForm onSubmit={onSubmit} isSubmitting={createMutation.isPending} />
        </DialogContent>
      </Dialog>
    </>
  );
}