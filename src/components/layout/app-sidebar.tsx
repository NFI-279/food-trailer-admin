// src/components/layout/app-sidebar.tsx
"use client";
import { useLanguage } from "@/providers/LanguageProvider";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  Package,
  LineChart,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Our navigation menu items.
const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Active Orders", url: "/orders", icon: ClipboardList },
  { title: "Menu Management", url: "/menu", icon: UtensilsCrossed },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Analytics", url: "/analytics", icon: LineChart },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { t } = useLanguage()
  const items = [
    { title: t.sidebar.dashboard, url: "/", icon: LayoutDashboard },
    { title: t.sidebar.orders, url: "/orders", icon: ClipboardList },
    { title: t.sidebar.menu, url: "/menu", icon: UtensilsCrossed },
    { title: t.sidebar.inventory, url: "/inventory", icon: Package },
    { title: t.sidebar.analytics, url: "/analytics", icon: LineChart },
    { title: t.sidebar.settings, url: "/settings", icon: Settings },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-bold uppercase tracking-wider text-primary">
            Food Trailer Admin
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Changed 'asChild' to the new 'render' prop pattern */}
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    className="py-5"
                    render={<Link href={item.url} />}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-base">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}