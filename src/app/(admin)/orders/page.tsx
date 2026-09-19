// [Frontend Admin] src/app/(admin)/orders/page.tsx
"use client";

import { useState } from "react";
import { ActiveOrdersList } from "@/features/orders/components/active-orders-list";
import { CompletedOrdersList } from "@/features/orders/components/completed-orders-list";
import { UnpaidOrdersList } from "@/features/orders/components/unpaid-orders-list"; // <-- NEW
import { useLanguage } from "@/providers/LanguageProvider";
import { PageHeader } from "@/components/layout/page-header";

type OrderStatus = "unpaid" | "active" | "completed";

export default function OrdersPage() {
  const { t } = useLanguage();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("unpaid");
  const tabs: Array<{ value: OrderStatus; label: string }> = [
    { value: "unpaid", label: t.orders.tabUnpaid },
    { value: "active", label: t.orders.tabActive },
    { value: "completed", label: t.orders.tabCompleted },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 sm:gap-6">
      <PageHeader title={t.orders.title} description={t.orders.subtitle} />

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          aria-label={t.orders.title}
          className="box-border mb-5 grid w-full min-w-0 max-w-full grid-cols-3 gap-1 overflow-hidden rounded-xl bg-slate-200 p-1 sm:mb-6 dark:bg-slate-800"
          role="tablist"
        >
          {tabs.map((tab) => {
            const isSelected = selectedStatus === tab.value;
            return (
              <button
                key={tab.value}
                aria-selected={isSelected}
                id={`${tab.value}-orders-tab`}
                className={`box-border flex min-h-11 min-w-0 w-full items-center justify-center rounded-lg px-1.5 py-3 text-center text-[0.7rem] font-bold leading-normal whitespace-normal text-wrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1 ${
                  isSelected
                    ? "bg-slate-50 text-slate-950 shadow-sm dark:bg-slate-700 dark:text-slate-50"
                    : "bg-transparent text-slate-600 hover:bg-slate-300/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/60 dark:hover:text-slate-50"
                } sm:px-4 sm:text-sm md:px-6 md:text-base`}
                onClick={() => setSelectedStatus(tab.value)}
                role="tab"
                tabIndex={0}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          aria-labelledby={`${selectedStatus}-orders-tab`}
          className="min-w-0 flex-1"
          role="tabpanel"
        >
          {selectedStatus === "unpaid" && <UnpaidOrdersList />}
          {selectedStatus === "active" && <ActiveOrdersList />}
          {selectedStatus === "completed" && <CompletedOrdersList />}
        </div>
      </div>
    </div>
  );
}
