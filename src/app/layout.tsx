// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; // Or keep whatever font Next.js generated
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/providers/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

// 1. Prevent zooming when they double-tap the tablet!
export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
};

// 2. Add the iOS PWA tags and manifest link
export const metadata: Metadata = {
  title: "Food Trailer Admin",
  description: "Admin dashboard for the food trailer",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Trailer POS",
  },
};

export const metadata: Metadata = {
  title: "Food Trailer Admin",
  description: "Admin dashboard for the food trailer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>  {/* <-- ADD THIS HERE */}
          <QueryProvider>
            {children}
          </QueryProvider>
          <Toaster richColors position="bottom-center" />
        </LanguageProvider> {/* <-- AND HERE */}
      </body>
    </html>
  );
}
