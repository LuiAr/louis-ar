import DynamicHero from "@/components/sections/DynamicHero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import DinoGame from "@/components/sections/DinoGame";
import SnakeGame from "@/components/sections/SnakeGame";
import Terminal from "@/components/sections/Terminal";
import PhotoViewer from "@/components/sections/PhotoViewer";
import MacPaint from "@/components/sections/MacPaint";
import MusicPlayer from "@/components/sections/MusicPlayer";
import Clock from "@/components/sections/Clock";
import StickyNote from "@/components/sections/StickyNote";
import Calculator from "@/components/sections/Calculator";
import SystemPreferences from "@/components/sections/SystemPreferences";
import Finder from "@/components/sections/Finder";

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

function MacPaintIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Canvas */}
      <rect x="2" y="3" width="20" height="17" fill="var(--color-cream)" stroke="currentColor" strokeWidth="1.5" />
      {/* Zigzag drawing on canvas */}
      <polyline points="4,16 7,9 11,15 14,9 18,13" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Pencil */}
      <rect x="22" y="3" width="3" height="12" fill="currentColor" transform="rotate(35, 22, 3)" />
      <polygon points="20,22 23,22 21.5,26" fill="currentColor" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Vinyl record */}
      <circle cx="14" cy="16" r="11" fill="var(--color-cream-dark)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="16" r="5" fill="currentColor" />
      <circle cx="14" cy="16" r="2" fill="var(--color-cream)" />
      {/* Music note above */}
      <rect x="17" y="4" width="2" height="8" fill="currentColor" />
      <rect x="11" y="4" width="8" height="2" fill="currentColor" />
      <rect x="9" y="10" width="4" height="3" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Clock face */}
      <rect x="2" y="2" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream)" />
      {/* 4 hour tick marks */}
      <rect x="13" y="3" width="2" height="3" fill="currentColor" />
      <rect x="13" y="22" width="2" height="3" fill="currentColor" />
      <rect x="3" y="13" width="3" height="2" fill="currentColor" />
      <rect x="22" y="13" width="3" height="2" fill="currentColor" />
      {/* Hour hand pointing ~10 */}
      <rect x="13" y="8" width="2" height="7" fill="currentColor" transform="rotate(-60 14 14)" />
      {/* Minute hand pointing ~2 */}
      <rect x="13" y="7" width="2" height="8" fill="currentColor" transform="rotate(60 14 14)" />
      {/* Center dot */}
      <rect x="13" y="13" width="2" height="2" fill="currentColor" />
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

function StickyNoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Note body */}
      <rect x="3" y="3" width="22" height="22" fill="#faf6e0" stroke="currentColor" strokeWidth="1.5" />
      {/* Folded corner */}
      <path d="M19 3 L25 9 L19 9 Z" fill="var(--color-cream-dark)" stroke="currentColor" strokeWidth="1" />
      {/* Lines */}
      <line x1="6" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="21" x2="13" y2="21" stroke="currentColor" strokeWidth="1" />
      {/* Pencil */}
      <rect x="6" y="6" width="9" height="2" fill="currentColor" />
    </svg>
  );
}

function SystemPrefsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Gear body */}
      <rect x="11" y="2"  width="6" height="4" fill="currentColor" />
      <rect x="11" y="22" width="6" height="4" fill="currentColor" />
      <rect x="2"  y="11" width="4" height="6" fill="currentColor" />
      <rect x="22" y="11" width="4" height="6" fill="currentColor" />
      <rect x="4"  y="4"  width="4" height="4" fill="currentColor" />
      <rect x="20" y="4"  width="4" height="4" fill="currentColor" />
      <rect x="4"  y="20" width="4" height="4" fill="currentColor" />
      <rect x="20" y="20" width="4" height="4" fill="currentColor" />
      {/* Center circle (ring) */}
      <rect x="8"  y="8"  width="12" height="12" fill="currentColor" />
      <rect x="10" y="10" width="8"  height="8"  fill="var(--color-cream)" />
      <rect x="12" y="12" width="4"  height="4"  fill="currentColor" />
    </svg>
  );
}

function FinderIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Folder body */}
      <path
        d="M2 8 L4 5 L10 5 L12 8 L26 8 L26 24 L2 24Z"
        fill="var(--color-cream-dark)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* List rows inside */}
      <rect x="4" y="12" width="2" height="2" fill="currentColor" />
      <line x1="8" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="16" width="2" height="2" fill="currentColor" />
      <line x1="8" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="20" width="2" height="2" fill="currentColor" />
      <line x1="8" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CalcIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Calculator body */}
      <rect x="4" y="2" width="20" height="24" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream)" />
      {/* Display */}
      <rect x="6" y="4" width="16" height="6" fill="currentColor" />
      <rect x="7" y="5" width="12" height="4" fill="var(--color-cream-dark)" />
      {/* Button rows */}
      <rect x="6"  y="12" width="4" height="3" fill="currentColor" />
      <rect x="12" y="12" width="4" height="3" fill="currentColor" />
      <rect x="18" y="12" width="4" height="3" fill="currentColor" />
      <rect x="6"  y="17" width="4" height="3" fill="currentColor" />
      <rect x="12" y="17" width="4" height="3" fill="currentColor" />
      <rect x="18" y="17" width="4" height="3" fill="currentColor" />
      <rect x="6"  y="22" width="10" height="3" fill="currentColor" />
      <rect x="18" y="22" width="4" height="3" fill="currentColor" />
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
  /** Show in the bottom dock bar. False = desktop icon only. */
  inDock: boolean;
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
    defaultPosition: { x: 64, y: 90 },
    defaultWidth: 610,
    defaultHeight: 316,
    initiallyOpen: true,
    inDock: true,
    Icon: HelloIcon,
    Content: DynamicHero,
  },
  {
    id: "about",
    title: "ReadMe.txt",
    menuLabel: "ReadMe.txt",
    dockLabel: "ReadMe.txt",
    defaultPosition: { x: 819, y: 159 },
    defaultWidth: 592,
    defaultHeight: 337,
    initiallyOpen: true,
    inDock: true,
    Icon: AboutIcon,
    Content: AboutSection,
  },
  {
    id: "projects",
    title: "Projects — Finder",
    menuLabel: "Projects",
    dockLabel: "Projects",
    defaultPosition: { x: 312, y: 425 },
    defaultWidth: 554,
    defaultHeight: 413,
    initiallyOpen: true,
    inDock: true,
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
    inDock: true,
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
    inDock: true,
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
    inDock: false,
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
    inDock: false,
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
    inDock: false,
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
    inDock: false,
    Icon: PhotoIcon,
    Content: PhotoViewer,
  },
  {
    id: "macpaint",
    title: "MacPaint",
    menuLabel: "MacPaint",
    dockLabel: "MacPaint",
    defaultPosition: { x: 180, y: 65 },
    defaultWidth: 560,
    defaultHeight: 400,
    initiallyOpen: false,
    inDock: false,
    Icon: MacPaintIcon,
    Content: MacPaint,
  },
  {
    id: "music",
    title: "Jukebox",
    menuLabel: "Jukebox",
    dockLabel: "Jukebox",
    defaultPosition: { x: 350, y: 90 },
    defaultWidth: 480,
    defaultHeight: 420,
    initiallyOpen: false,
    inDock: false,
    Icon: MusicIcon,
    Content: MusicPlayer,
  },
  {
    id: "clock",
    title: "Clock",
    menuLabel: "Clock",
    dockLabel: "Clock",
    defaultPosition: { x: 520, y: 110 },
    defaultWidth: 300,
    defaultHeight: 400,
    initiallyOpen: false,
    inDock: false,
    Icon: ClockIcon,
    Content: Clock,
  },
  {
    id: "stickynote",
    title: "Sticky Notes",
    menuLabel: "Sticky Notes",
    dockLabel: "Sticky Notes",
    defaultPosition: { x: 160, y: 100 },
    defaultWidth: 340,
    defaultHeight: 420,
    initiallyOpen: false,
    inDock: false,
    Icon: StickyNoteIcon,
    Content: StickyNote,
  },
  {
    id: "calculator",
    title: "Calculator",
    menuLabel: "Calculator",
    dockLabel: "Calculator",
    defaultPosition: { x: 380, y: 120 },
    defaultWidth: 280,
    defaultHeight: 380,
    initiallyOpen: false,
    inDock: false,
    Icon: CalcIcon,
    Content: Calculator,
  },
  {
    id: "systemprefs",
    title: "System Preferences",
    menuLabel: "System Preferences",
    dockLabel: "Prefs",
    defaultPosition: { x: 240, y: 100 },
    defaultWidth: 400,
    defaultHeight: 460,
    initiallyOpen: false,
    inDock: false,
    Icon: SystemPrefsIcon,
    Content: SystemPreferences,
  },
  {
    id: "finder",
    title: "Finder",
    menuLabel: "Finder",
    dockLabel: "Finder",
    defaultPosition: { x: 180, y: 75 },
    defaultWidth: 560,
    defaultHeight: 420,
    initiallyOpen: false,
    inDock: false,
    Icon: FinderIcon,
    Content: Finder,
  },
];
