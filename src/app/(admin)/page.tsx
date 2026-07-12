// src/app/(admin)/page.tsx
"use client";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { useLanguage } from "@/providers/LanguageProvider";

export default function DashboardPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t.dashboard.title}</h2>
        <p className="text-muted-foreground">
          {t.dashboard.subtitle}
        </p>  
      </div>
      
      {/* Dynamic stats component */}
      <DashboardStats />

      {/* We can add a chart or recent activity feed down here later! */}
    </div>
  );
}