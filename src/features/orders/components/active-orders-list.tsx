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
  const { data: orders, isLoading, isError } = useActiveOrders();
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

  if (isError) return <div className="text-destructive font-semibold">Error.</div>;

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground bg-muted/10 rounded-2xl border-2 border-dashed">
        <ClipboardCheck className="h-16 w-16 mb-4 opacity-50" />
        {/* TRANSLATED! */}
        <h3 className="text-xl font-bold">{t.orders.noActive}</h3>
        <p>{t.orders.noActiveDesc}</p>
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
