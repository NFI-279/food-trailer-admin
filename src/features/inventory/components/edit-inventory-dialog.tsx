// src/features/inventory/components/edit-inventory-dialog.tsx
"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryForm } from "./inventory-form";
import { useUpdateInventoryItem } from "../hooks";
import { InventoryItem, InventoryItemInput } from "../types";
import { useLanguage } from "@/providers/LanguageProvider";

export function EditInventoryDialog({ item }: { item: InventoryItem }) {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateInventoryItem();
  const { t } = useLanguage();

  const onSubmit = (data: InventoryItemInput) => {
    updateMutation.mutate({ id: item.id, data }, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4 text-muted-foreground" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.inventoryForm.editTitle}</DialogTitle>
          </DialogHeader>
          {/* We pass the item as initialData here! */}
          <InventoryForm initialData={item} onSubmit={onSubmit} isSubmitting={updateMutation.isPending} />
        </DialogContent>
      </Dialog>
    </>
  );
}
