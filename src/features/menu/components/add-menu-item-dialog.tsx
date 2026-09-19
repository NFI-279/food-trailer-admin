// src/features/menu/components/add-menu-item-dialog.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuItemForm } from "./menu-item-form";
import { useCreateMenuItem } from "../hooks";
import { MenuItemInput } from "../types";
import { useLanguage } from "@/providers/LanguageProvider";

export function AddMenuItemDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateMenuItem();
  const { t } = useLanguage();

  const onSubmit = (data: MenuItemInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false); // Close the modal on success
      },
    });
  };

  return (
    <>
      {/* Standalone button that directly opens the dialog */}
        <Button className="w-full sm:w-auto" onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> {t.menu.btnAdd}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.menuDialogs.addTitle}</DialogTitle>
            <DialogDescription>{t.menuDialogs.addDesc}</DialogDescription>
          </DialogHeader>
          <MenuItemForm onSubmit={onSubmit} isSubmitting={createMutation.isPending} />
        </DialogContent>
      </Dialog>
    </>
  );
}