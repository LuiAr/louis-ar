"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export type BootStage = "booting" | "revealing" | "done";

export function useBootSequence(): BootStage {
  const [stage, setStage] = useState<BootStage>("booting");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage("done");
      return;
    }

    const bootTimer = setTimeout(() => {
      setStage("revealing");
      const revealTimer = setTimeout(() => {
        setStage("done");
      }, 600);
      return () => clearTimeout(revealTimer);
    }, 2800);

    return () => clearTimeout(bootTimer);
  }, [prefersReducedMotion]);

  return stage;
}
