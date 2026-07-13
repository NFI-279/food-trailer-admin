// [Frontend Admin] src/app/(admin)/orders/page.tsx
"use client";

import { ActiveOrdersList } from "@/features/orders/components/active-orders-list";
import { CompletedOrdersList } from "@/features/orders/components/completed-orders-list";
import { UnpaidOrdersList } from "@/features/orders/components/unpaid-orders-list"; // <-- NEW
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/providers/LanguageProvider";

export default function OrdersPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t.orders.title}</h2>
        <p className="text-muted-foreground">{t.orders.subtitle}</p>
      </div>

      <Tabs defaultValue="unpaid" className="flex-1 flex flex-col">
        {/* Changed grid-cols-2 to grid-cols-3 so all 3 tabs fit perfectly! */}
        <TabsList className="grid w-full max-w-2xl grid-cols-3 h-14 p-1 mb-6 bg-slate-200 dark:bg-slate-800 rounded-xl">
          
          <TabsTrigger 
            value="unpaid" 
            className="h-full text-sm sm:text-base font-bold rounded-lg text-slate-500 hover:text-slate-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md transition-all"
          >
            {t.orders.tabUnpaid}
          </TabsTrigger>
          
          <TabsTrigger 
            value="active" 
            className="h-full text-sm sm:text-base font-bold rounded-lg text-slate-500 hover:text-slate-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md transition-all"
          >
            {t.orders.tabActive}
          </TabsTrigger>
          
          <TabsTrigger 
            value="completed" 
            className="h-full text-sm sm:text-base font-bold rounded-lg text-slate-500 hover:text-slate-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md transition-all"
          >
            {t.orders.tabCompleted}
          </TabsTrigger>
          
        </TabsList>
        
        {/* The 3 Lists */}
        <TabsContent value="unpaid" className="flex-1 mt-0">
          <UnpaidOrdersList />
        </TabsContent>
        
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
