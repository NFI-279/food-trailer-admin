// src/features/inventory/components/inventory-form.tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventoryItemSchema, InventoryItemInput } from "../types";
import { useLanguage } from "@/providers/LanguageProvider";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryFormProps {
  initialData?: InventoryItemInput;
  onSubmit: (data: InventoryItemInput) => void;
  isSubmitting?: boolean;
}

export function InventoryForm({ initialData, onSubmit, isSubmitting }: InventoryFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InventoryItemInput>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: initialData || {
      name: "",
      unit: "buc",
      currentStock: "" as unknown as number,
      lowStockThreshold: "" as unknown as number,
    },
  });
  const { t } = useLanguage();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t.inventoryForm.name}</Label>
        <Input id="name" placeholder={t.inventoryForm.namePlaceholder} {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>{t.inventoryForm.unit}</Label>
        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={t.inventoryForm.unitPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buc">Bucăți (buc)</SelectItem>
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="litri">Liters (L)</SelectItem>
                <SelectItem value="porții">Porții</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentStock">{t.inventoryForm.stock}</Label>
          <Input 
            id="currentStock" 
            type="number" 
            {...register("currentStock", { valueAsNumber: true })} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lowStockThreshold">{t.inventoryForm.threshold}</Label>
          <Input 
            id="lowStockThreshold" 
            type="number" 
            {...register("lowStockThreshold", { valueAsNumber: true })} 
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t.inventoryForm.btnSaving : t.inventoryForm.btnSave}
        </Button>
      </div>
    </form>
  );
}
