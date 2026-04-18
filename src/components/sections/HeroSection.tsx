"use client";

import { AnimatePresence, motion } from "motion/react";
import { useBootSequence } from "@/hooks/useBootSequence";
import { useTypewriter } from "@/hooks/useTypewriter";
import MacWindow from "@/components/ui/MacWindow";

const ROLES = [
  "Frontend Engineer",
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

function HappyMacSVG() {
  return (
    <svg width="64" height="72" viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="8" y="4" width="48" height="56" rx="4" fill="#f5f0e8" stroke="#f5f0e8" strokeWidth="2" />
      <rect x="6" y="2" width="52" height="58" rx="5" stroke="#f5f0e8" strokeWidth="3" fill="none" />
      {/* Screen bezel */}
      <rect x="12" y="8" width="40" height="32" rx="2" fill="#1a1611" />
      {/* Screen */}
      <rect x="14" y="10" width="36" height="28" fill="#f5f0e8" />
      {/* Eyes */}
      <rect x="21" y="17" width="5" height="6" fill="#1a1611" />
      <rect x="38" y="17" width="5" height="6" fill="#1a1611" />
      {/* Smile */}
      <path d="M22 28 Q32 36 42 28" stroke="#1a1611" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Disk slot */}
      <rect x="18" y="44" width="28" height="4" rx="1" fill="#1a1611" opacity="0.3" />
      {/* Base */}
      <rect x="16" y="60" width="32" height="6" rx="2" fill="#f5f0e8" stroke="#f5f0e8" strokeWidth="1" />
      <rect x="14" y="58" width="36" height="8" rx="2" stroke="#f5f0e8" strokeWidth="2" fill="none" />
      {/* Stand */}
      <rect x="24" y="66" width="16" height="4" fill="#f5f0e8" />
    </svg>
  );
}

export default function HeroSection() {
  const stage = useBootSequence();
  const role = useTypewriter({ words: ROLES });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center">
      <AnimatePresence>
        {stage === "booting" && (
          <motion.div
            key="boot"
            className="fixed inset-0 z-40 bg-[var(--color-ink)] flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HappyMacSVG />
            <div className="flex flex-col items-center gap-3">
              <div className="w-48 h-3 border border-[var(--color-cream)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--color-cream)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                />
              </div>
              <p className="text-[var(--color-cream)] text-[11px] opacity-60">
                Starting up…
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "done" && (
        <div className="w-full max-w-2xl mx-auto px-4 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <MacWindow title="Hello.txt" active className="w-full">
              <div className="p-8 space-y-4">
                <p className="text-[var(--color-ink-muted)] text-[11px] uppercase tracking-widest">
                  Welcome to my portfolio
                </p>
                <h1 className="text-4xl font-bold leading-tight">
                  Hello, I&apos;m Louis
                </h1>
                <div className="flex items-center gap-2 text-xl h-8">
                  <span className="text-[var(--color-ink-muted)]">I&apos;m a</span>
                  <span className="font-bold cursor-blink">{role}</span>
                </div>
                <p className="text-[13px] text-[var(--color-ink-muted)] max-w-lg">
                  I build fast, accessible, and beautifully crafted web experiences.
                  Passionate about design systems, developer tooling, and clean code.
                </p>
                <div className="flex gap-3 pt-2">
                  <a
                    href="#projects"
                    className="mac-button mac-button-default"
                  >
                    View Projects
                  </a>
                  <a href="#contact" className="mac-button">
                    Get in touch
                  </a>
                </div>
              </div>
            </MacWindow>
          </motion.div>
        </div>
      )}
    </section>
  );
}
