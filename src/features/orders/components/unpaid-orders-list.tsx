// [Frontend Admin] src/features/orders/components/unpaid-orders-list.tsx
"use client";

import { useUnpaidOrders } from "../hooks";
import { useLanguage } from "@/providers/LanguageProvider";
import { OrderCard } from "./order-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Banknote } from "lucide-react";

export function UnpaidOrdersList() {
  const { data: orders, isLoading, isError, error, refetch } = useUnpaidOrders();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2].map((i) => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 font-semibold text-destructive">
        <p>{error instanceof Error ? error.message : "Failed to load unpaid orders."}</p>
        <button className="mt-3 underline" onClick={() => refetch()}>Try again</button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-[18rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted/10 px-4 py-8 text-center text-muted-foreground sm:min-h-[22rem]">
        <Banknote className="mb-4 h-14 w-14 opacity-50 sm:h-16 sm:w-16" />
        <h3 className="text-xl font-bold">{t.orders.noUnpaid}</h3>
        <p className="max-w-sm">{t.orders.noUnpaidDesc}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
