// [Frontend Admin] src/components/auth-guard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // LINT FIX: Initialize state safely
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("trailer_token");
    }
    return false;
  });

  useEffect(() => {
    const token = localStorage.getItem("trailer_token");
    if (!token) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-muted/20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground font-medium">Authenticating...</p>
      </div>
    );
  }

  return <>{children}</>;
}
