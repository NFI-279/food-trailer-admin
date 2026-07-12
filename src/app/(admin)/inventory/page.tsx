"use client";
import { InventoryList } from "@/features/inventory/components/inventory-list";
import { AddInventoryDialog } from "@/features/inventory/components/add-inventory-dialog";
import { useLanguage } from "@/providers/LanguageProvider";

export default function InventoryPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t.inventory.title}</h2>
          <p className="text-muted-foreground">{t.inventory.subtitle}</p>
        </div>
        <AddInventoryDialog />
      </div>
      <InventoryList />
    </div>
  );
}