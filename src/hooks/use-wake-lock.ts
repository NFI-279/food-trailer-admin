// [Frontend Admin] src/hooks/use-wake-lock.ts
"use client";

import { useEffect, useRef } from "react";

export function useWakeLock() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wakeLockRef = useRef<any>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          // SECURITY FIX: Release the old lock before grabbing a new one!
          if (wakeLockRef.current) {
            await wakeLockRef.current.release().catch(() => {});
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          wakeLockRef.current = await (navigator as any).wakeLock.request("screen");
          console.log("Wake Lock is active!");
        }
      } catch (err) {
        console.error("Wake Lock failed:", err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestWakeLock();
      }
    };

    requestWakeLock();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(console.error);
        wakeLockRef.current = null;
        console.log("Wake Lock released.");
      }
    };
  }, []);
}