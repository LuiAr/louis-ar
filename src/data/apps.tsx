import DynamicHero from "@/components/sections/DynamicHero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import DinoGame from "@/components/sections/DinoGame";
import SnakeGame from "@/components/sections/SnakeGame";
import Terminal from "@/components/sections/Terminal";
import PhotoViewer from "@/components/sections/PhotoViewer";

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

function SnakeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Winding body */}
      <rect x="2" y="20" width="6" height="5" fill="currentColor" />
      <rect x="8" y="20" width="6" height="5" fill="currentColor" />
      <rect x="14" y="20" width="6" height="5" fill="currentColor" />
      <rect x="14" y="14" width="6" height="6" fill="currentColor" />
      <rect x="8" y="14" width="6" height="6" fill="currentColor" />
      <rect x="8" y="8" width="6" height="6" fill="currentColor" />
      {/* Head */}
      <rect x="14" y="5" width="10" height="9" fill="currentColor" />
      {/* Eye */}
      <rect x="20" y="7" width="2" height="2" fill="var(--color-cream)" />
      {/* Food dot */}
      <rect x="2" y="4" width="5" height="5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function DinoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Body */}
      <rect x="5" y="12" width="13" height="10" fill="currentColor" />
      {/* Head */}
      <rect x="11" y="6" width="10" height="8" fill="currentColor" />
      {/* Eye */}
      <rect x="18" y="8" width="2" height="2" fill="var(--color-cream)" />
      {/* Tail */}
      <rect x="2" y="14" width="4" height="4" fill="currentColor" />
      {/* Leg 1 */}
      <rect x="7" y="22" width="3" height="4" fill="currentColor" />
      {/* Leg 2 */}
      <rect x="13" y="22" width="3" height="4" fill="currentColor" />
      {/* Ground */}
      <rect x="2" y="26" width="24" height="1" fill="currentColor" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Frame */}
      <rect x="2" y="4" width="24" height="18" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream)" />
      {/* Mountain / landscape */}
      <polygon points="2,22 9,12 15,18 20,13 26,22" fill="currentColor" />
      {/* Sun */}
      <rect x="18" y="7" width="5" height="5" stroke="currentColor" strokeWidth="1" fill="var(--color-cream-dark)" />
      {/* Film strip bottom */}
      <rect x="2" y="22" width="24" height="4" fill="currentColor" />
      <rect x="4" y="23" width="3" height="2" fill="var(--color-cream)" />
      <rect x="9" y="23" width="3" height="2" fill="var(--color-cream)" />
      <rect x="14" y="23" width="3" height="2" fill="var(--color-cream)" />
      <rect x="19" y="23" width="3" height="2" fill="var(--color-cream)" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Screen background */}
      <rect x="2" y="2" width="24" height="18" stroke="currentColor" strokeWidth="1.5" fill="var(--color-ink)" />
      {/* Prompt */}
      <rect x="5" y="6" width="4" height="2" fill="var(--color-cream)" />
      <rect x="5" y="10" width="8" height="2" fill="var(--color-cream)" opacity="0.6" />
      <rect x="5" y="14" width="6" height="2" fill="var(--color-cream)" opacity="0.3" />
      {/* Base */}
      <rect x="4" y="20" width="20" height="3" fill="currentColor" />
      <rect x="7" y="23" width="14" height="2" fill="currentColor" />
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
    defaultWidth: 540,
    defaultHeight: 380,
    initiallyOpen: true,
    Icon: HelloIcon,
    Content: DynamicHero,
  },
  {
    id: "about",
    title: "ReadMe.txt",
    menuLabel: "ReadMe.txt",
    dockLabel: "ReadMe.txt",
    defaultPosition: { x: 600, y: 55 },
    defaultWidth: 580,
    defaultHeight: 500,
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
  {
    id: "dino",
    title: "DinoRun.app",
    menuLabel: "DinoRun",
    dockLabel: "DinoRun",
    defaultPosition: { x: 180, y: 80 },
    defaultWidth: 580,
    defaultHeight: 330,
    initiallyOpen: false,
    Icon: DinoIcon,
    Content: DinoGame,
  },
  {
    id: "snake",
    title: "Snake.app",
    menuLabel: "Snake",
    dockLabel: "Snake",
    defaultPosition: { x: 200, y: 90 },
    defaultWidth: 520,
    defaultHeight: 360,
    initiallyOpen: false,
    Icon: SnakeIcon,
    Content: SnakeGame,
  },
  {
    id: "terminal",
    title: "Terminal",
    menuLabel: "Terminal",
    dockLabel: "Terminal",
    defaultPosition: { x: 150, y: 80 },
    defaultWidth: 560,
    defaultHeight: 380,
    initiallyOpen: false,
    Icon: TerminalIcon,
    Content: Terminal,
  },
  {
    id: "photos",
    title: "Photos",
    menuLabel: "Photos",
    dockLabel: "Photos",
    defaultPosition: { x: 260, y: 70 },
    defaultWidth: 520,
    defaultHeight: 420,
    initiallyOpen: false,
    Icon: PhotoIcon,
    Content: PhotoViewer,
  },
];
