// [Frontend Admin] src/features/menu/components/menu-item-form.tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuItemSchema, MenuItemInput } from "../types";
import { useInventory } from "@/features/inventory/hooks"; 
import { useLanguage } from "@/providers/LanguageProvider";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItemFormProps {
  initialData?: MenuItemInput;
  onSubmit: (data: MenuItemInput) => void;
  isSubmitting?: boolean;
}

export function MenuItemForm({ initialData, onSubmit, isSubmitting }: MenuItemFormProps) {
  const { data: inventoryItems } = useInventory(); 
  const { t } = useLanguage(); 

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MenuItemInput>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: initialData ? {
      ...initialData,
      inventoryItemId: initialData.inventoryItemId || "NONE",
    } : {
      name: "",
      description: "",
      price: "" as unknown as number,
      category: "Grill",
      isAvailable: true,
      imageUrl: "",
      inventoryItemId: "NONE", 
      inventoryDeduction: 1,   
    },
  });

  const handleFormSubmit = (data: MenuItemInput) => {
    if (data.inventoryItemId === "NONE") {
      data.inventoryItemId = null;
      data.inventoryDeduction = null;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name">{t.menuForm.name}</Label>
        <Input id="name" placeholder={t.menuForm.namePlaceholder} {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">{t.menuForm.price}</Label>
          <Input id="price" type="number" step="0.1" {...register("price", { valueAsNumber: true })} />
          {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
        </div>

       {/* Category */}
        <div className="space-y-2">
          <Label>{t.menuForm.category}</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={t.menuForm.categoryPlaceholder}>
                    {field.value ? t.categories[field.value.toLowerCase() as keyof typeof t.categories] : t.menuForm.categoryPlaceholder}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grill">{t.categories.grill}</SelectItem>
                  <SelectItem value="Sides">{t.categories.sides}</SelectItem>
                  <SelectItem value="Drinks">{t.categories.drinks}</SelectItem>
                  <SelectItem value="Desserts">{t.categories.desserts}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Inventory Link Section */}
      <div className="grid grid-cols-2 gap-4 p-4 border rounded-md bg-muted/20">
        
        {/* THE INVENTORY DROPDOWN (Fixed!) */}
        <div className="space-y-2">
          <Label className="text-blue-600 font-bold">{t.menuForm.linkTitle}</Label>
          <Controller
            control={control}
            name="inventoryItemId"
            render={({ field }) => {
              // Helper to find the name of the selected ingredient so it displays properly!
              const selectedItem = inventoryItems?.find(i => i.id === field.value);
              
              return (
                <Select onValueChange={field.onChange} value={field.value || "NONE"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ingredient">
                      {field.value && field.value !== "NONE" && selectedItem
                        ? `${selectedItem.name} (${selectedItem.unit})`
                        : t.menuForm.noTracking}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">{t.menuForm.noTracking}</SelectItem>
                    {inventoryItems?.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>{t.menuForm.deduct}</Label>
          <Input 
            type="number" 
            step="0.1" 
            {...register("inventoryDeduction", { valueAsNumber: true })} 
          />
        </div>
      </div>

      {/* --- NEW: IMAGE URL FIELD --- */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">{t.menuForm.image}</Label>
        <Input id="imageUrl" placeholder={t.menuForm.imagePlaceholder} {...register("imageUrl")} />
        {errors.imageUrl && <p className="text-sm text-destructive">{errors.imageUrl.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">{t.menuForm.desc}</Label>
        <Textarea id="description" placeholder={t.menuForm.descPlaceholder} {...register("description")} />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t.menuForm.btnSaving : t.menuForm.btnSave}
        </Button>
      </div>
    </form>
  );
}
