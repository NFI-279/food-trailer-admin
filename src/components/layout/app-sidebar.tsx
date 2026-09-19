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
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { clearAccessToken } from "@/lib/auth-session";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const { t } = useLanguage()
  const pathname = usePathname();
  const items = [
    { title: t.sidebar.dashboard, url: "/", icon: LayoutDashboard },
    { title: t.sidebar.orders, url: "/orders", icon: ClipboardList },
    { title: t.sidebar.menu, url: "/menu", icon: UtensilsCrossed },
    { title: t.sidebar.inventory, url: "/inventory", icon: Package },
    { title: t.sidebar.analytics, url: "/analytics", icon: LineChart },
    { title: t.sidebar.settings, url: "/settings", icon: Settings },
  ];
  return (
    <Sidebar variant="floating" className="py-3 pl-3 pr-2">
      <SidebarContent className="rounded-2xl bg-sidebar/95 shadow-[0_12px_30px_-24px_rgba(45,32,24,0.7)] ring-1 ring-sidebar-border/60">
        <SidebarGroup>
          <SidebarGroupLabel className="h-auto flex-col items-start gap-1 px-4 py-4 text-sidebar-foreground">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/60">
              Food Trailer
            </span>
            <span className="text-base font-bold tracking-tight text-sidebar-foreground">
              Admin
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Changed 'asChild' to the new 'render' prop pattern */}
                  <SidebarMenuButton 
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className="h-11 rounded-xl px-3 text-sm font-medium text-sidebar-foreground/75 data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-active:shadow-sm"
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
      <SidebarFooter className="px-2 pb-3">
        <SidebarMenu className="border-t border-sidebar-border/50 pt-3">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              className="h-11 rounded-xl text-sidebar-foreground/70"
              onClick={() => {
                clearAccessToken();
                window.location.assign("/login");
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className="text-base">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}