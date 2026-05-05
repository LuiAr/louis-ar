"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import Desktop from "@/components/Desktop";
import MobileApp from "@/components/mobile/MobileApp";

export default function ClientLayout() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "var(--color-cream)",
        }}
      />
    );
  }

  return isMobile ? <MobileApp /> : <Desktop />;
}
