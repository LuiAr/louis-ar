"use client";

import { useState, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import DraggableWindow from "@/components/ui/DraggableWindow";
import MenuBar from "@/components/ui/MenuBar";
import DynamicHero from "@/components/sections/DynamicHero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

type WindowId = "hello" | "about" | "projects" | "experience" | "contact";

interface WindowConfig {
  id: WindowId;
  title: string;
  defaultPosition: { x: number; y: number };
  defaultWidth: number;
  defaultHeight: number;
  initiallyOpen: boolean;
  dockLabel: string;
}

const WINDOW_CONFIGS: WindowConfig[] = [
  {
    id: "hello",
    title: "Hello.txt",
    defaultPosition: { x: 40, y: 55 },   // left, slightly down from top
    defaultWidth: 480,
    defaultHeight: 320,
    initiallyOpen: true,
    dockLabel: "Hello.txt",
  },
  {
    id: "about",
    title: "ReadMe.txt",
    defaultPosition: { x: 660, y: 82 },  // right, a touch lower for natural feel
    defaultWidth: 520,
    defaultHeight: 420,
    initiallyOpen: true,
    dockLabel: "ReadMe.txt",
  },
  {
    id: "projects",
    title: "Projects — Finder",
    defaultPosition: { x: 300, y: 60 },
    defaultWidth: 640,
    defaultHeight: 460,
    initiallyOpen: false,
    dockLabel: "Projects",
  },
  {
    id: "experience",
    title: "Experience",
    defaultPosition: { x: 220, y: 100 },
    defaultWidth: 720,
    defaultHeight: 400,
    initiallyOpen: false,
    dockLabel: "Experience",
  },
  {
    id: "contact",
    title: "Get In Touch",
    defaultPosition: { x: 600, y: 120 },
    defaultWidth: 340,
    defaultHeight: 400,
    initiallyOpen: false,
    dockLabel: "Contact",
  },
];

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

function buildInitialState(): Record<WindowId, WindowState> {
  const state = {} as Record<WindowId, WindowState>;
  WINDOW_CONFIGS.forEach((c, i) => {
    state[c.id] = {
      isOpen: c.initiallyOpen,
      isMinimized: false,
      zIndex: WINDOW_CONFIGS.length - i,
    };
  });
  return state;
}

// ── Dock icons ────────────────────────────────────────────────────────────────

function DockIcon({ id }: { id: WindowId }) {
  switch (id) {
    case "hello":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="2" width="24" height="18" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream-dark)" />
          <rect x="4" y="4" width="20" height="12" fill="currentColor" />
          <rect x="6" y="6" width="16" height="8" fill="var(--color-cream)" />
          <rect x="10" y="20" width="8" height="3" fill="currentColor" />
          <rect x="7" y="23" width="14" height="2" fill="currentColor" />
        </svg>
      );
    case "about":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="5" y="2" width="16" height="22" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream)" />
          <line x1="8" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
        </svg>
      );
    case "projects":
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
    case "experience":
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
    case "contact":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="6" width="24" height="16" stroke="currentColor" strokeWidth="1.5" fill="var(--color-cream)" />
          <path d="M2 8 L14 16 L26 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      );
  }
}

// ── Desktop ───────────────────────────────────────────────────────────────────

export default function Desktop() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [states, setStates] = useState<Record<WindowId, WindowState>>(buildInitialState);
  const [activeId, setActiveId] = useState<WindowId>("hello");
  const topZ = useRef(WINDOW_CONFIGS.length);

  function focusWindow(id: WindowId) {
    topZ.current += 1;
    setActiveId(id);
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: topZ.current },
    }));
  }

  function closeWindow(id: WindowId) {
    setStates((prev) => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
    const next = WINDOW_CONFIGS.find((c) => c.id !== id && states[c.id].isOpen);
    if (next) setActiveId(next.id);
  }

  function toggleMinimize(id: WindowId) {
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }));
  }

  function openOrFocus(id: WindowId) {
    const s = states[id];
    if (!s.isOpen) {
      // Closed → open and bring to front
      topZ.current += 1;
      setActiveId(id);
      setStates((prev) => ({
        ...prev,
        [id]: { isOpen: true, isMinimized: false, zIndex: topZ.current },
      }));
    } else {
      // Already open → close it
      closeWindow(id);
    }
  }

  const activeTitle =
    WINDOW_CONFIGS.find((c) => c.id === activeId)?.title ?? "Portfolio";

  const windowContent: Record<WindowId, React.ReactNode> = {
    hello: <DynamicHero />,
    about: <AboutSection />,
    projects: <ProjectsSection />,
    experience: <ExperienceSection />,
    contact: <ContactSection />,
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top menu bar */}
      <MenuBar activeTitle={activeTitle} />

      {/* Desktop area */}
      <div
        ref={desktopRef}
        className="flex-1 relative overflow-hidden mac-desktop-bg"
      >
        <AnimatePresence>
          {WINDOW_CONFIGS.map((config) => {
            const s = states[config.id];
            if (!s.isOpen) return null;
            return (
              <DraggableWindow
                key={config.id}
                title={config.title}
                isActive={activeId === config.id}
                isMinimized={s.isMinimized}
                defaultPosition={config.defaultPosition}
                defaultWidth={config.defaultWidth}
                defaultHeight={config.defaultHeight}
                zIndex={s.zIndex}
                onFocus={() => focusWindow(config.id)}
                onClose={() => closeWindow(config.id)}
                onMinimize={() => toggleMinimize(config.id)}
                desktopRef={desktopRef}
              >
                {windowContent[config.id]}
              </DraggableWindow>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <div className="flex-shrink-0 h-16 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream)] flex items-center justify-center gap-1 px-4">
        {WINDOW_CONFIGS.map((config) => {
          const s = states[config.id];
          const isActive = activeId === config.id && s.isOpen;
          return (
            <button
              key={config.id}
              onClick={() => openOrFocus(config.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 border border-transparent hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-dark)] transition-colors",
                isActive && "bg-[var(--color-cream-dark)] border-[var(--color-ink)]"
              )}
            >
              <DockIcon id={config.id} />
              <span className="text-[9px] leading-tight">{config.dockLabel}</span>
              {/* Open indicator — square dot, no border-radius */}
              <span
                className="w-1 h-1 bg-[var(--color-ink)]"
                style={{ visibility: s.isOpen ? "visible" : "hidden" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
