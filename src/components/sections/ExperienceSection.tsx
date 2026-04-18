"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import MacWindow from "@/components/ui/MacWindow";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { experience } from "@/data/experience";
import type { ExperienceEntry } from "@/types";

function formatDate(date: string | "present") {
  if (date === "present") return "Present";
  const [year, month] = date.split("-");
  const d = new Date(Number(year), Number(month) - 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function ExperienceRow({ entry }: { entry: ExperienceEntry }) {
  const [open, setOpen] = useState(false);
  const isCurrent = entry.endDate === "present";

  return (
    <div>
      <div
        className={`mac-list-row gap-3 cursor-pointer select-none ${isCurrent ? "mac-list-row-active font-bold" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="text-[10px] transition-transform duration-150"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block" }}
        >
          ▶
        </span>
        <span className="flex-1 text-[12px] truncate">{entry.company}</span>
        <span className="text-[11px] text-[var(--color-ink-muted)] hidden sm:block w-40 truncate">
          {entry.role}
        </span>
        <span className="text-[11px] text-[var(--color-ink-muted)] hidden md:block w-32 text-right">
          {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
        </span>
        <span className="text-[11px] text-[var(--color-ink-muted)] w-20 text-right capitalize hidden lg:block">
          {entry.type}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 py-4 bg-[var(--color-cream-dark)] border-b border-[var(--color-ink)] space-y-3">
              <div className="sm:hidden text-[11px] text-[var(--color-ink-muted)]">
                {entry.role} · {formatDate(entry.startDate)} — {formatDate(entry.endDate)} · {entry.location}
              </div>
              <div className="hidden sm:block text-[11px] text-[var(--color-ink-muted)]">
                {entry.location} · {entry.type}
              </div>
              <p className="text-[12px]">{entry.description}</p>
              <ul className="space-y-1">
                {entry.bullets.map((bullet, i) => (
                  <li key={i} className="text-[12px] flex gap-2">
                    <span className="text-[var(--color-ink-muted)] flex-shrink-0">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1 pt-1">
                {entry.skills.map((skill) => (
                  <span key={skill} className="text-[10px] border border-[var(--color-ink)] px-1.5 py-0.5 bg-[var(--color-window-bg)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeInWhenVisible>
          <MacWindow title="Experience — List View" active className="w-full">
            <div>
              {/* Header row */}
              <div className="mac-list-header">
                <span className="w-4" />
                <span className="flex-1">Company</span>
                <span className="hidden sm:block w-40">Role</span>
                <span className="hidden md:block w-32 text-right">Period</span>
                <span className="hidden lg:block w-20 text-right">Type</span>
              </div>

              {experience.map((entry) => (
                <ExperienceRow key={entry.id} entry={entry} />
              ))}
            </div>
          </MacWindow>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
