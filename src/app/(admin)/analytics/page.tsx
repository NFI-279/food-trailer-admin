"use client";
import { RevenueChart } from "@/features/analytics/components/revenue-chart";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AnalyticsPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t.analytics.title}</h2>
        <p className="text-muted-foreground">{t.analytics.subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-full lg:col-span-4"><RevenueChart /></div>
        <div className="col-span-full lg:col-span-3">
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center text-muted-foreground">
            {t.analytics.moreInsights}
          </div>
        </div>
      </div>
    </div>
  );
}