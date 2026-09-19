// src/app/(admin)/page.tsx
"use client";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { useLanguage } from "@/providers/LanguageProvider";
import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <PageHeader title={t.dashboard.title} description={t.dashboard.subtitle} />
      
      {/* Dynamic stats component */}
      <DashboardStats />

      {/* We can add a chart or recent activity feed down here later! */}
    </div>
  );
}