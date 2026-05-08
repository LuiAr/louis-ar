"use client";

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

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center border border-[var(--color-ink)] bg-[var(--color-window-bg)] px-2 py-1 text-[10px] font-bold leading-none mac-invert-hover"
    >
      {label} ↗
    </a>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const hasLinks = Boolean(
    project.links.live ?? project.links.github ?? project.links.case_study
  );

  return (
    <article className="border-2 border-[var(--color-ink)] bg-[var(--color-window-bg)] shadow-[2px_2px_0_var(--color-ink)]">
      <div className="grid gap-3 p-3 sm:grid-cols-[56px_1fr_auto] sm:items-start">
        <div className="flex h-14 w-14 items-center justify-center border border-[var(--color-ink)] bg-[var(--color-cream-dark)]">
          <ProjectIcon type={project.iconType} />
        </div>

        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[13px] font-bold leading-tight">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-[var(--color-ink-muted)]">
              <StatusBadge status={project.status} />
              <span>{project.year}</span>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-[var(--color-ink-muted)]">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:max-w-[120px] sm:justify-end">
          {project.links.live && (
            <ProjectLink href={project.links.live} label="Link" />
          )}
          {project.links.github && (
            <ProjectLink href={project.links.github} label="GitHub" />
          )}
          {project.links.case_study && (
            <ProjectLink href={project.links.case_study} label="Case Study" />
          )}
          {!hasLinks && (
            <span className="inline-flex items-center justify-center border border-[var(--color-ink)] bg-[var(--color-cream-dark)] px-2 py-1 text-[10px] font-bold leading-none text-[var(--color-ink-muted)]">
              TODO
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <div className="p-4">
      <p className="text-[11px] text-[var(--color-ink-muted)] mb-4 px-2">
        {projects.length} projects
      </p>
      <StaggerChildren className="grid gap-3">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
