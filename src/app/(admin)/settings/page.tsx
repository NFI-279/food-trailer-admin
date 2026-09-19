// src/app/(admin)/settings/page.tsx
"use client";
import { SettingsForm } from "@/features/settings/components/settings-form";
import { useLanguage } from "@/providers/LanguageProvider";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader title={t.settings.title} description={t.settings.description} />

      <SettingsForm />
    </div>
  );
}