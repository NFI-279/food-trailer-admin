// [Frontend] src/hooks/use-wake-lock.ts
"use client";

import { useEffect, useRef } from "react";

export function useWakeLock() {
  // We store the "lock" in a ref so we can release it later
  const wakeLockRef = useRef<any>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        // Check if the browser actually supports this feature
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request("screen");
          console.log("Wake Lock is active! Screen will not sleep.");
        }
      } catch (err) {
        console.error("Wake Lock failed:", err);
      }
    };

    // If the user minimizes the browser and comes back, the lock breaks. 
    // This event listener immediately re-locks it when they come back!
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestWakeLock();
      }
    };

    // Start the lock
    requestWakeLock();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup: Release the lock when they leave the Orders page
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (wakeLockRef.current) {
        // SECURITY FIX: Safely catch the promise rejection!
        wakeLockRef.current.release().catch(console.error);
        wakeLockRef.current = null;
        console.log("Wake Lock released.");
      }
    };
  }, []);
}