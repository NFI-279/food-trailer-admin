// src/features/orders/components/completed-orders-list.tsx
"use client";

import { useCompletedOrders } from "../hooks";
import { OrderCard } from "./order-card";
import { Skeleton } from "@/components/ui/skeleton";
import { History } from "lucide-react";

export function CompletedOrdersList() {
  const { data: orders, isLoading, isError } = useCompletedOrders();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
      </div>
    );
  }

  if (isError) return <div className="text-destructive font-semibold">Failed to load completed orders.</div>;

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground bg-muted/10 rounded-2xl border-2 border-dashed">
        <History className="h-16 w-16 mb-4 opacity-50" />
        <h3 className="text-xl font-bold">No completed orders yet</h3>
        <p>Orders finished today will appear here.</p>
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