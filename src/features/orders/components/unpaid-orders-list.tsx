// [Frontend Admin] src/features/orders/components/unpaid-orders-list.tsx
"use client";

import { useUnpaidOrders } from "../hooks";
import { useLanguage } from "@/providers/LanguageProvider";
import { OrderCard } from "./order-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Banknote } from "lucide-react";

export function UnpaidOrdersList() {
  const { data: orders, isLoading, isError } = useUnpaidOrders();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2].map((i) => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
      </div>
    );
  }

  if (isError) return <div className="text-destructive font-semibold">Error.</div>;

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground bg-muted/10 rounded-2xl border-2 border-dashed">
        <Banknote className="h-16 w-16 mb-4 opacity-50" />
        <h3 className="text-xl font-bold">{t.orders.noUnpaid}</h3>
        <p>{t.orders.noUnpaidDesc}</p>
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
