"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
}

export function StaggerChildren({
  children,
  className,
  style,
  staggerDelay = 0.07,
}: StaggerChildrenProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={
        reduced
          ? {}
          : {
              hidden: {},
              visible: {
                transition: { staggerChildren: staggerDelay },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduced
          ? {}
          : {
              hidden: { opacity: 0, scale: 0.97, y: 16 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number] },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
