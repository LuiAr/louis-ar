"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeInWhenVisible({
  children,
  className,
  delay = 0,
}: FadeInWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.0, 0.0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
