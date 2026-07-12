// [Frontend] src/app/(admin)/layout.tsx
"use client";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLanguage } from "@/providers/LanguageProvider";
import { AuthGuard } from "@/components/auth-guard"; // <-- Import the Bouncer

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
   return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden w-full bg-muted/20">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger /> 
            {/* Translated Header! */}
            <h1 className="font-semibold text-lg">{t.header}</h1>
          </header>
          
          <div className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
}