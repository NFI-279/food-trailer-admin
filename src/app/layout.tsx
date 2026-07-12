// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or keep whatever font Next.js generated
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/providers/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

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