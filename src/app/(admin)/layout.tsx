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
        <main className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_left,rgba(120,82,52,0.05),transparent_24rem)] bg-muted/20">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:gap-4 sm:px-6">
            <SidebarTrigger /> 
            {/* Translated Header! */}
            <h1 className="truncate text-base font-semibold sm:text-lg">{t.header}</h1>
          </header>
          
          <div className="min-w-0 flex-1 overflow-auto px-4 py-5 sm:p-6">
            <div className="mx-auto w-full max-w-screen-2xl">{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
}