// src/features/menu/components/edit-menu-item-dialog.tsx
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
import { MenuItemForm } from "./menu-item-form";
import { useUpdateMenuItem } from "../hooks";
import { MenuItem, MenuItemInput } from "../types";

export function EditMenuItemDialog({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateMenuItem();

  const onSubmit = (data: MenuItemInput) => {
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
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <MenuItemForm
            initialData={item} 
            onSubmit={onSubmit} 
            isSubmitting={updateMutation.isPending} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
}