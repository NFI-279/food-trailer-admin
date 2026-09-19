"use client";
import { MenuList } from "@/features/menu/components/menu-list";
import { AddMenuItemDialog } from "@/features/menu/components/add-menu-item-dialog";
import { useLanguage } from "@/providers/LanguageProvider";
import { PageHeader } from "@/components/layout/page-header";

export default function MenuPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <PageHeader
        title={t.menu.title}
        description={t.menu.subtitle}
        actions={<AddMenuItemDialog />}
      />
      <MenuList />
    </div>
  );
}