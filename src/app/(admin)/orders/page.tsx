// [Frontend] src/app/(admin)/orders/page.tsx
"use client";
import { ActiveOrdersList } from "@/features/orders/components/active-orders-list";
import { CompletedOrdersList } from "@/features/orders/components/completed-orders-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/providers/LanguageProvider";
import { useWakeLock } from "@/hooks/use-wake-lock";

export default function OrdersPage() {
  const { t } = useLanguage();
  useWakeLock(); 
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t.orders.title}</h2>
        <p className="text-muted-foreground">{t.orders.subtitle}</p>
      </div>

      <Tabs defaultValue="active" className="flex-1 flex flex-col">
        
        {/* Container: Removed fixed height, just using p-1 so it wraps the buttons perfectly */}
        {/* Container: flex and items-stretch forces the buttons to fit perfectly inside the padding! */}
        <TabsList className="flex items-stretch w-full max-w-md h-14 p-1 mb-6 bg-slate-200 dark:bg-slate-800 rounded-xl">
          
          <TabsTrigger 
            value="active" 
            className="flex-1 text-base sm:text-lg font-bold rounded-lg text-slate-500 hover:text-slate-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md transition-all"
          >
             {t.orders.tabActive}
          </TabsTrigger>
          
          <TabsTrigger 
            value="completed" 
            className="flex-1 text-base sm:text-lg font-bold rounded-lg text-slate-500 hover:text-slate-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md transition-all"
          >
             {t.orders.tabCompleted}
          </TabsTrigger>
          
        </TabsList>

        {/* THESE ARE REQUIRED TO SHOW THE ORDERS! Do not delete them! */}
        <TabsContent value="active" className="flex-1 mt-0">
          <ActiveOrdersList />
        </TabsContent>
        
        <TabsContent value="completed" className="flex-1 mt-0">
          <CompletedOrdersList />
        </TabsContent>

      </Tabs>
    </div>
  );
}