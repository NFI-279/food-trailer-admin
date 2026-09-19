// [Frontend Admin] src/components/auth-guard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getAccessToken, onAuthChanged } from "@/lib/auth-session";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      const authenticated = Boolean(getAccessToken());
      setIsAuthenticated(authenticated);
      if (!authenticated) router.replace("/login");
    };

    syncAuthState();
    return onAuthChanged(syncAuthState);
  }, [router, pathname]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-muted/20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 font-medium text-muted-foreground">Authenticating...</p>
      </div>
    );
  }

  return <>{children}</>;
}
