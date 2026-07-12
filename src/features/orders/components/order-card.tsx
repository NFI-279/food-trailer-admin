// src/features/orders/components/order-card.tsx
"use client";

import { Order } from "../types";
import { useCompleteOrder, useRevertOrder } from "../hooks";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner"; // <-- Shadcn's toast component!

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const completeMutation = useCompleteOrder();
  const revertMutation = useRevertOrder();

  // If completed, show when it was completed. Otherwise, show when it was ordered.
  const timeToDisplay = new Date(order.status === "COMPLETED" ? order.updatedAt : order.createdAt);
  const orderTime = timeToDisplay.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleComplete = () => {
    completeMutation.mutate(order.id, {
      onSuccess: () => {
        // Trigger the Toast popup with an Undo action!
        toast.success(`Order #${order.orderNumber} completed`, {
          duration: 5000, // Stays on screen for 5 seconds
          action: {
            label: "Undo",
            onClick: () => revertMutation.mutate(order.id),
          },
        });
      }
    });
  };

  return (
    <Card className={`flex flex-col h-full border-2 shadow-sm ${order.status === "COMPLETED" ? "bg-muted/50 border-muted opacity-80" : "border-muted"}`}>
      <CardHeader className="pb-3 flex flex-row items-center justify-between bg-muted/30 rounded-t-lg">
        <CardTitle className="text-3xl font-black">
          #{order.orderNumber}
        </CardTitle>
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
                <span className="text-lg font-bold">
                  {item.quantity}x {item.name}
                </span>
              </div>
              {item.notes && (
                <span className="text-sm font-semibold text-destructive mt-0.5">
                  * {item.notes}
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 border-t mt-auto">
        {order.status === "ACTIVE" ? (
          <Button 
            className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white" 
            onClick={handleComplete}
            disabled={completeMutation.isPending}
          >
            <CheckCircle className="mr-2 h-6 w-6" />
            {completeMutation.isPending ? "..." : "Complete Order"}
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="w-full h-14 text-lg font-bold" 
            onClick={() => revertMutation.mutate(order.id)}
            disabled={revertMutation.isPending}
          >
            <RotateCcw className="mr-2 h-6 w-6" />
            {revertMutation.isPending ? "..." : "Revert to Active"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}