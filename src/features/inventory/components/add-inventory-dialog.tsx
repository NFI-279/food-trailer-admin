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
import { useLanguage } from "@/providers/LanguageProvider";

export function AddInventoryDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateInventoryItem();
  const { t } = useLanguage();

  const onSubmit = (data: InventoryItemInput) => {
    createMutation.mutate(data, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <Button className="w-full sm:w-auto" onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> {t.inventory.btnAdd}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.inventoryForm.addTitle}</DialogTitle>
          </DialogHeader>
          <InventoryForm onSubmit={onSubmit} isSubmitting={createMutation.isPending} />
        </DialogContent>
      </Dialog>
    </>
  );
}
