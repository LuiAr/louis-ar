"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import MacWindow from "@/components/ui/MacWindow";
import TiltCard from "@/components/animations/TiltCard";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

function FolderIcon() {
  return (
    <svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 8 Q0 4 4 4 L18 4 L22 8 L44 8 Q48 8 48 12 L48 36 Q48 40 44 40 L4 40 Q0 40 0 36Z" fill="var(--color-cream-dark)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path d="M0 12 L48 12" stroke="var(--color-ink)" strokeWidth="1" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2 L28 2 L38 12 L38 46 Q38 48 36 48 L4 48 Q2 48 2 46Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path d="M28 2 L28 12 L38 12" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="20" x2="32" y2="20" stroke="var(--color-ink)" strokeWidth="1" />
      <line x1="8" y1="26" x2="32" y2="26" stroke="var(--color-ink)" strokeWidth="1" />
      <line x1="8" y1="32" x2="24" y2="32" stroke="var(--color-ink)" strokeWidth="1" />
    </svg>
  );
}

function AppIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="40" height="40" rx="8" fill="var(--color-ink)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <rect x="6" y="6" width="32" height="24" rx="2" fill="var(--color-cream)" />
      <rect x="18" y="36" width="8" height="4" fill="var(--color-cream-dark)" />
      <circle cx="22" cy="18" r="6" fill="var(--color-ink)" />
      <circle cx="22" cy="18" r="3" fill="var(--color-cream)" />
    </svg>
  );
}

function ProjectIcon({ type }: { type: Project["iconType"] }) {
  if (type === "folder") return <FolderIcon />;
  if (type === "document") return <DocumentIcon />;
  return <AppIcon />;
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    live: "● Live",
    "in-progress": "◐ In Progress",
    archived: "○ Archived",
  };
  return (
    <span className="text-[10px] text-[var(--color-ink-muted)]">{map[status]}</span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard className="relative">
      <div
        className="flex flex-col items-center gap-2 p-4 cursor-pointer mac-invert-hover border border-transparent hover:border-[var(--color-ink)] group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ProjectIcon type={project.iconType} />
        <span className="text-[11px] text-center font-bold leading-tight max-w-[120px]">
          {project.title}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 mac-window z-20 pointer-events-none"
          >
            <div className="p-3 space-y-1">
              <p className="font-bold text-[12px]">{project.title}</p>
              <p className="text-[11px] text-[var(--color-ink-muted)]">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {project.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] border border-[var(--color-ink)] px-1">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                {project.links.github && (
                  <span className="text-[10px] underline">GitHub ↗</span>
                )}
                {project.links.live && (
                  <span className="text-[10px] underline">Live ↗</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TiltCard>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeInWhenVisible>
          <MacWindow title="Projects — Finder" active showScrollTrack className="w-full">
            <div className="p-4">
              <p className="text-[11px] text-[var(--color-ink-muted)] mb-4 px-2">
                {projects.length} items
              </p>
              <StaggerChildren className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
                {projects.map((project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </MacWindow>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
