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

    let revealTimer: ReturnType<typeof setTimeout>;
    const bootTimer = setTimeout(() => {
      setStage("revealing");
      revealTimer = setTimeout(() => setStage("done"), 600);
    }, 2800);

    return () => {
      clearTimeout(bootTimer);
      clearTimeout(revealTimer);
    };
  }, [prefersReducedMotion]);

  return stage;
}
