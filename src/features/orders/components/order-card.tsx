// [Frontend Admin] src/features/orders/components/order-card.tsx
"use client";

import { Order } from "../types";
import { useCompleteOrder, useRevertOrder, useStartOrder, useCancelOrder } from "../hooks";
import { useLanguage } from "@/providers/LanguageProvider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, RotateCcw, ChefHat, X } from "lucide-react";
import { toast } from "sonner";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const startMutation = useStartOrder();
  const completeMutation = useCompleteOrder();
  const revertMutation = useRevertOrder();
  const cancelMutation = useCancelOrder();
  
  const { t } = useLanguage();

  const timeToDisplay = new Date(order.status === "COMPLETED" ? order.updatedAt : order.createdAt);
  const orderTime = timeToDisplay.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });

  const handleComplete = () => {
    completeMutation.mutate(order.id, {
      onSuccess: () => {
        toast.success(`Order #${order.orderNumber} completed`, {
          duration: 5000,
          action: {
            label: "Undo",
            onClick: () => revertMutation.mutate(order.id),
          },
        });
      }
    });
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to CANCEL this order? The stock will be refunded.")) {
      cancelMutation.mutate(order.id);
    }
  };

  return (
    <Card className={`flex flex-col h-full border-2 shadow-sm ${order.status === "COMPLETED" ? "bg-muted/50 border-muted opacity-80" : "border-muted"}`}>
      <CardHeader className={`pb-3 flex flex-row items-center justify-between rounded-t-lg ${order.status === 'PENDING' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-muted/30'}`}>
        <CardTitle className="text-3xl font-black">#{order.orderNumber}</CardTitle>
        <Badge variant="secondary" className="flex items-center gap-1 text-sm px-2 py-1">
          <Clock className="h-4 w-4" />
          {orderTime}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1 pt-4">
        <ul className="space-y-3">
          {order.items.map((item) => (
            <li key={item.id} className="flex flex-col">
              <div className="flex justify-between items-start">
                <span className="text-lg font-bold">{item.quantity}x {item.name}</span>
              </div>
              {item.notes && <span className="text-sm font-semibold text-destructive mt-0.5">* {item.notes}</span>}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 border-t mt-auto">
        
        {/* STATE 1: PENDING (Just arrived) */}
        {order.status === "PENDING" && (
          <div className="flex gap-2 w-full">
            <Button 
              className="flex-1 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={() => startMutation.mutate(order.id)}
              disabled={startMutation.isPending}
            >
              <ChefHat className="mr-2 h-6 w-6" />
              {startMutation.isPending ? "..." : t.orders.btnStart}
            </Button>
            <Button 
              variant="outline" 
              className="h-14 w-14 border-destructive text-destructive hover:bg-destructive hover:text-white" 
              onClick={handleCancel}
              disabled={cancelMutation.isPending}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* STATE 2: PREPARING (Cooking) */}
        {order.status === "PREPARING" && (
          <Button 
            className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white" 
            onClick={handleComplete}
            disabled={completeMutation.isPending}
          >
            <CheckCircle className="mr-2 h-6 w-6" />
            {completeMutation.isPending ? "..." : t.orders.btnComplete}
          </Button>
        )}

        {/* STATE 3: COMPLETED */}
        {order.status === "COMPLETED" && (
          <Button 
            variant="outline"
            className="w-full h-14 text-lg font-bold" 
            onClick={() => revertMutation.mutate(order.id)}
            disabled={revertMutation.isPending}
          >
            <RotateCcw className="mr-2 h-6 w-6" />
            {revertMutation.isPending ? "..." : t.orders.btnRevert}
          </Button>
        )}

      </CardFooter>
    </Card>
  );
}
