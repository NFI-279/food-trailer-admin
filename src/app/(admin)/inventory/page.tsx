"use client";
import { InventoryList } from "@/features/inventory/components/inventory-list";
import { AddInventoryDialog } from "@/features/inventory/components/add-inventory-dialog";
import { useLanguage } from "@/providers/LanguageProvider";
import { PageHeader } from "@/components/layout/page-header";

export default function InventoryPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <PageHeader
        title={t.inventory.title}
        description={t.inventory.subtitle}
        actions={<AddInventoryDialog />}
      />
      <InventoryList />
    </div>
  );
}