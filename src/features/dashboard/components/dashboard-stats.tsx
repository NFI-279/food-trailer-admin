// src/features/dashboard/components/dashboard-stats.tsx
"use client";

import { useDashboardStats } from "../hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Banknote, ShoppingBag, ClipboardList, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";

export function DashboardStats() {
  const { data: stats, isLoading, isError, error, refetch } = useDashboardStats();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-destructive">
        <p>{error instanceof Error ? error.message : "Failed to load dashboard stats."}</p>
        <Button variant="outline" className="mt-3" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Revenue Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t.dashboard.revenue}</CardTitle>
          <Banknote className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.revenueToday.toFixed(2)} RON</div>
          {/* NEW: Split the revenue visually! */}
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs text-muted-foreground bg-muted/50 font-normal">
              {t.dashboard.cash}: <span className="font-bold ml-1 text-foreground">{stats.revenueCash.toFixed(2)}</span>
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground bg-muted/50 font-normal">
              {t.dashboard.card}: <span className="font-bold ml-1 text-foreground">{stats.revenueCard.toFixed(2)}</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Orders Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t.dashboard.orders}</CardTitle>
          <ShoppingBag className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.ordersToday}</div>
          <p className="text-xs text-muted-foreground pt-1">
            {t.dashboard.completedAndActive}
          </p>
        </CardContent>
      </Card>

      {/* Active Orders Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t.dashboard.active}</CardTitle>
          <ClipboardList className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeOrders}</div>
          <p className="text-xs text-muted-foreground pt-1">
            {t.dashboard.waiting}
          </p>
        </CardContent>
      </Card>

      {/* Alerts Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t.dashboard.alerts}</CardTitle>
          <AlertTriangle className={`h-4 w-4 ${stats.lowStockItems > 0 ? 'text-red-600' : 'text-muted-foreground'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.lowStockItems}</div>
          <p className="text-xs text-muted-foreground pt-1">
            {stats.lowStockItems > 0 ? t.dashboard.runningLow : t.dashboard.allGood}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
