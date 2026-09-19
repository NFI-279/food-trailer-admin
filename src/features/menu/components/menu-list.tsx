// src/features/menu/components/menu-list.tsx
"use client";
import { EditMenuItemDialog } from "./edit-menu-item-dialog";
import { useMenu, useToggleAvailability, useDeleteMenuItem } from "../hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react"; // Add Trash2
import { Button } from "@/components/ui/button"; // Make sure Button is imported!
import { useLanguage } from "@/providers/LanguageProvider";

export function MenuList() {
  const { data: menuItems, isLoading, isError, error, refetch } = useMenu();
  const toggleMutation = useToggleAvailability();
  const deleteMutation = useDeleteMenuItem();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-destructive">
        <p>{error instanceof Error ? error.message : "Failed to load menu."}</p>
        <Button variant="outline" className="mt-3" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card">
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">{t.menu.colName}</TableHead>
            <TableHead className="w-[20%]">{t.menu.colCategory}</TableHead>
            <TableHead className="w-[20%]">{t.menu.colPrice}</TableHead>
            <TableHead className="w-[20%] text-right">{t.menu.colStock}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <span>{item.name}</span>
                  {/* Here is the Edit Button component! */}
                  <EditMenuItemDialog item={item} />
                </div>
                {item.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{item.category}</Badge>
              </TableCell>
              <TableCell>{item.price.toFixed(2)} RON</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-4">
                  {/* The Availability Switch */}
                  <Switch
                    aria-label={`Toggle availability for ${item.name}`}
                    checked={item.isAvailable}
                    disabled={toggleMutation.isPending}
                    onCheckedChange={() => toggleMutation.mutate(item.id)}
                  />
                  
                  {/* The Delete Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${item.name}`}
                    className="h-10 w-10 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this item?")) {
                        deleteMutation.mutate(item.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {menuItems?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                No menu items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}