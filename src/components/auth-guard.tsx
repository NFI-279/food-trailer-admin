// [Frontend] src/components/auth-guard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem("trailer_token");
    
    if (!token) {
      // Kick them to the login page
      router.push("/login");
    } else {
      // Let them in!
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  // Show a loading spinner while we check, so the sidebar doesn't flash on screen!
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