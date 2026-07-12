"use client";
import { MenuList } from "@/features/menu/components/menu-list";
import { AddMenuItemDialog } from "@/features/menu/components/add-menu-item-dialog";
import { useLanguage } from "@/providers/LanguageProvider";

export default function MenuPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t.menu.title}</h2>
          <p className="text-muted-foreground">{t.menu.subtitle}</p>
        </div>
        <AddMenuItemDialog />
      </div>
      <MenuList />
    </div>
  );
}