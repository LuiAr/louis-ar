"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import TiltCard from "@/components/animations/TiltCard";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
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

function getPrimaryProjectUrl(project: Project) {
  return project.links.live ?? project.links.github ?? project.links.case_study;
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-[10px] underline"
    >
      {label} ↗
    </a>
  );
}

function ProjectTooltip({
  project,
  anchorRect,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  anchorRect: DOMRect;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const style: React.CSSProperties = {
    position: "fixed",
    left: anchorRect.left + anchorRect.width / 2,
    top: anchorRect.top - 8,
    transform: "translate(-50%, -100%)",
    width: "224px",
    zIndex: 9999,
    pointerEvents: "auto",
  };

  return createPortal(
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      style={style}
      className="mac-window"
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
            <ProjectLink href={project.links.github} label="GitHub" />
          )}
          {project.links.live && (
            <ProjectLink href={project.links.live} label="Live" />
          )}
          {project.links.case_study && (
            <ProjectLink href={project.links.case_study} label="Case Study" />
          )}
        </div>
      </div>
    </motion.div>,
    document.body
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const primaryUrl = getPrimaryProjectUrl(project);

  function clearCloseTimeout() {
    if (!closeTimeoutRef.current) return;
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }

  function handleMouseEnter() {
    clearCloseTimeout();
    if (cardRef.current) setAnchorRect(cardRef.current.getBoundingClientRect());
  }

  function handleMouseLeave() {
    closeTimeoutRef.current = setTimeout(() => {
      setAnchorRect(null);
      closeTimeoutRef.current = null;
    }, 120);
  }

  useEffect(() => {
    if (!anchorRect) return;
    function update() {
      if (cardRef.current) setAnchorRect(cardRef.current.getBoundingClientRect());
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [anchorRect]);

  useEffect(() => clearCloseTimeout, []);

  const content = (
    <div
      ref={cardRef}
      className="flex flex-col items-center gap-2 p-4 cursor-pointer mac-invert-hover border border-transparent hover:border-[var(--color-ink)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ProjectIcon type={project.iconType} />
      <span className="text-[11px] text-center font-bold leading-tight max-w-[120px]">
        {project.title}
      </span>
      <StatusBadge status={project.status} />
    </div>
  );

  return (
    <TiltCard className="relative">
      {primaryUrl ? (
        <a
          href={primaryUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title}`}
          className="block text-inherit no-underline"
        >
          {content}
        </a>
      ) : (
        content
      )}

      <AnimatePresence>
        {anchorRect && (
          <ProjectTooltip
            project={project}
            anchorRect={anchorRect}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </AnimatePresence>
    </TiltCard>
  );
}

export default function ProjectsSection() {
  return (
    <div className="p-4">
      <p className="text-[11px] text-[var(--color-ink-muted)] mb-4 px-2">
        {projects.length} items
      </p>
      <StaggerChildren
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
      >
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
