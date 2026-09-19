// [Frontend] src/features/orders/components/active-orders-list.tsx
"use client";

import { useEffect } from "react";
import { useActiveOrders } from "../hooks";
import { useSettings } from "@/features/settings/hooks";
import { useLanguage } from "@/providers/LanguageProvider"; // <-- IMPORT HOOK
import { OrderCard } from "./order-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardCheck } from "lucide-react";

export function ActiveOrdersList() {
  const { data: orders, isLoading, isError, error, refetch } = useActiveOrders();
  const { data: settings } = useSettings();
  const { t } = useLanguage(); // <-- INIT HOOK

  useEffect(() => {
    if (!orders || !settings) return;

    let notified: string[] = [];
    try {
      notified = JSON.parse(sessionStorage.getItem("notified_orders") || "[]");
    } catch {
      notified = []; // If corrupt, start fresh!
    }
    let hasNewOrder = false;

    orders.forEach((order) => {
      if (!notified.includes(order.id)) {
        hasNewOrder = true;
        notified.push(order.id);
      }
    });

    if (hasNewOrder) {
      // SECURITY FIX: Prevent memory leak by keeping only the last 100 orders!
      if (notified.length > 100) {
        notified = notified.slice(-100);
      }
      
      sessionStorage.setItem("notified_orders", JSON.stringify(notified));
      
      if (!settings.muteKitchenDing) {
        const audio = new Audio("/ding.mp3");
        audio.play().catch((e) => console.log("Audio play blocked by browser:", e));
      }
    }
  }, [orders, settings]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 font-semibold text-destructive">
        <p>{error instanceof Error ? error.message : "Failed to load active orders."}</p>
        <button className="mt-3 underline" onClick={() => refetch()}>Try again</button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-[18rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted/10 px-4 py-8 text-center text-muted-foreground sm:min-h-[22rem]">
        <ClipboardCheck className="mb-4 h-14 w-14 opacity-50 sm:h-16 sm:w-16" />
        {/* TRANSLATED! */}
        <h3 className="text-xl font-bold">{t.orders.noActive}</h3>
        <p className="max-w-sm">{t.orders.noActiveDesc}</p>
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
