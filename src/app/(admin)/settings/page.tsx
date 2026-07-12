// src/app/(admin)/settings/page.tsx
"use client";
import { SettingsForm } from "@/features/settings/components/settings-form";
import { useLanguage } from "@/providers/LanguageProvider";

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t.settings.title}</h2>
        <p className="text-muted-foreground">{t.settings.description}</p>
      </div>

      <SettingsForm />
    </div>
  );
}