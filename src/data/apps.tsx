import DynamicHero from "@/components/sections/DynamicHero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

// ── Dock icons ────────────────────────────────────────────────────────────────

function HelloIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="2" width="24" height="18" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream-dark)" />
      <rect x="4" y="4" width="20" height="12" fill="currentColor" />
      <rect x="6" y="6" width="16" height="8" fill="var(--color-cream)" />
      <rect x="10" y="20" width="8" height="3" fill="currentColor" />
      <rect x="7" y="23" width="14" height="2" fill="currentColor" />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5" y="2" width="16" height="22" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream)" />
      <line x1="8" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M2 9 Q2 6 5 6 L11 6 L13 9 L23 9 Q26 9 26 12 L26 23 Q26 26 23 26 L5 26 Q2 26 2 23Z"
        fill="var(--color-cream-dark)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="2" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="4" width="16" height="20" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream)" />
      <line x1="9" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9" y1="14" x2="19" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9" y1="18" x2="15" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="2" width="16" height="20" stroke="currentColor" strokeWidth="1" fill="var(--color-cream-dark)" />
      <line x1="6" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
      <line x1="6" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="6" width="24" height="16" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream)" />
      <path d="M2 8 L14 16 L26 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// ── App registry ──────────────────────────────────────────────────────────────

export interface AppConfig {
  id: string;
  title: string;
  menuLabel: string;
  dockLabel: string;
  defaultPosition: { x: number; y: number };
  defaultWidth: number;
  defaultHeight: number;
  initiallyOpen: boolean;
  Icon: React.ComponentType;
  Content: React.ComponentType;
}

/**
 * The global app registry. To add a new app:
 * 1. Create its content component in src/components/sections/ (or src/apps/)
 * 2. Create its dock icon component above
 * 3. Add an entry here
 * That's it — the dock, menus, and window management update automatically.
 */
export const APPS: AppConfig[] = [
  {
    id: "hello",
    title: "Hello.txt",
    menuLabel: "Hello.txt",
    dockLabel: "Hello.txt",
    defaultPosition: { x: 40, y: 55 },
    defaultWidth: 480,
    defaultHeight: 320,
    initiallyOpen: true,
    Icon: HelloIcon,
    Content: DynamicHero,
  },
  {
    id: "about",
    title: "ReadMe.txt",
    menuLabel: "ReadMe.txt",
    dockLabel: "ReadMe.txt",
    defaultPosition: { x: 660, y: 82 },
    defaultWidth: 520,
    defaultHeight: 420,
    initiallyOpen: true,
    Icon: AboutIcon,
    Content: AboutSection,
  },
  {
    id: "projects",
    title: "Projects — Finder",
    menuLabel: "Projects",
    dockLabel: "Projects",
    defaultPosition: { x: 300, y: 60 },
    defaultWidth: 640,
    defaultHeight: 460,
    initiallyOpen: false,
    Icon: ProjectsIcon,
    Content: ProjectsSection,
  },
  {
    id: "experience",
    title: "Experience",
    menuLabel: "Experience",
    dockLabel: "Experience",
    defaultPosition: { x: 220, y: 100 },
    defaultWidth: 720,
    defaultHeight: 400,
    initiallyOpen: false,
    Icon: ExperienceIcon,
    Content: ExperienceSection,
  },
  {
    id: "contact",
    title: "Get In Touch",
    menuLabel: "Contact",
    dockLabel: "Contact",
    defaultPosition: { x: 600, y: 120 },
    defaultWidth: 340,
    defaultHeight: 400,
    initiallyOpen: false,
    Icon: ContactIcon,
    Content: ContactSection,
  },
];
