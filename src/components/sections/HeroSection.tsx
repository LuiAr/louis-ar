"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

const ROLES = [
  "Data Scientist",
  "Data Engineer",
  "Innovation Enthusiast",
];

export default function HeroSection() {
  const role = useTypewriter({ words: ROLES });

  return (
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
        Building AI solutions and data pipelines that turn messy real-world
        data into clear insights. Currently finishing a Master&apos;s thesis
        on 6G on-device AI for autonomous robots at RISE &amp; Husqvarna.
      </p>
    </div>
  );
}
