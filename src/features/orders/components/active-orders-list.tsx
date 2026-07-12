// src/features/orders/components/active-orders-list.tsx
"use client";

import { useEffect, useRef } from "react";
import { useActiveOrders } from "../hooks";
import { useSettings } from "@/features/settings/hooks";
import { OrderCard } from "./order-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardCheck } from "lucide-react";

export function ActiveOrdersList() {
  const { data: orders, isLoading, isError } = useActiveOrders();
  const { data: settings } = useSettings();
  
  // Keep track of how many orders we had last time it checked
  const previousOrderCount = useRef(0);

  useEffect(() => {
    if (!orders || !settings) return;

    // If the number of active orders went UP, and we are NOT muted
    if (orders.length > previousOrderCount.current && !settings.muteKitchenDing) {
      // Play the sound!
      const audio = new Audio("/ding.mp3");
      audio.play().catch((e) => console.log("Audio play blocked by browser:", e));
    }

    // Update the ref for the next time TanStack Query polls the database
    previousOrderCount.current = orders.length;
  }, [orders, settings]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
      </div>
    );
  }

  if (isError) return <div className="text-destructive font-semibold">Failed to load active orders.</div>;

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground bg-muted/10 rounded-2xl border-2 border-dashed">
        <ClipboardCheck className="h-16 w-16 mb-4 opacity-50" />
        <h3 className="text-xl font-bold">No active orders</h3>
        <p>You're all caught up! Time to clean the grill.</p>
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