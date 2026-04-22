"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import DraggableWindow from "@/components/ui/DraggableWindow";
import MenuBar, { type MenuAction } from "@/components/ui/MenuBar";
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
    defaultPosition: { x: 40, y: 55 },
    defaultWidth: 480,
    defaultHeight: 320,
    initiallyOpen: true,
    dockLabel: "Hello.txt",
  },
  {
    id: "about",
    title: "ReadMe.txt",
    defaultPosition: { x: 660, y: 82 },
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

// ── About modal ───────────────────────────────────────────────────────────────

function AboutMacSVG() {
  return (
    <svg width="56" height="64" viewBox="0 0 64 72" fill="none">
      <rect x="8" y="4" width="48" height="56" rx="4" fill="#f5f0e8" stroke="#f5f0e8" strokeWidth="2" />
      <rect x="6" y="2" width="52" height="58" rx="5" stroke="#f5f0e8" strokeWidth="3" fill="none" />
      <rect x="12" y="8" width="40" height="32" rx="2" fill="#1a1611" />
      <rect x="14" y="10" width="36" height="28" fill="#f5f0e8" />
      <rect x="21" y="17" width="5" height="6" fill="#1a1611" />
      <rect x="38" y="17" width="5" height="6" fill="#1a1611" />
      <path d="M22 28 Q32 36 42 28" stroke="#1a1611" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="18" y="44" width="28" height="4" rx="1" fill="#1a1611" opacity="0.3" />
      <rect x="16" y="60" width="32" height="6" rx="2" fill="#f5f0e8" stroke="#f5f0e8" strokeWidth="1" />
      <rect x="14" y="58" width="36" height="8" rx="2" stroke="#f5f0e8" strokeWidth="2" fill="none" />
      <rect x="24" y="66" width="16" height="4" fill="#f5f0e8" />
    </svg>
  );
}

function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
      onPointerDown={onClose}
    >
      <div
        className="mac-window w-[340px]"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center h-[22px] mac-titlebar-stripes border-b-2 border-[var(--color-ink)] relative">
          <div
            className="flex items-center gap-[3px] pl-[6px] z-10"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              aria-label="close"
              onClick={onClose}
              className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)] hover:bg-[var(--color-ink)]"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-[var(--color-window-bg)] px-2 text-[11px] font-bold">
              About This Portfolio
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 bg-[var(--color-window-bg)]">
          <div className="flex justify-center py-2 bg-[var(--color-ink)]">
            <AboutMacSVG />
          </div>

          <div className="text-center space-y-1">
            <p className="text-[13px] font-bold">Louis Ar&apos;s Portfolio</p>
            <p className="text-[11px] text-[var(--color-ink-muted)]">Version 1.0</p>
          </div>

          <div className="border-t border-[var(--color-ink-muted)] pt-3 space-y-1 text-center">
            <p className="text-[11px] text-[var(--color-ink-muted)]">
              Built with Next.js 15, Tailwind CSS v4,
            </p>
            <p className="text-[11px] text-[var(--color-ink-muted)]">
              and Motion v12.
            </p>
            <p className="text-[11px] text-[var(--color-ink-muted)] pt-1">
              Inspired by Mac OS System 7 (1991).
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="mac-button mac-button-default"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Desktop ───────────────────────────────────────────────────────────────────

export default function Desktop() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [states, setStates] = useState<Record<WindowId, WindowState>>(buildInitialState);
  const [activeId, setActiveId] = useState<WindowId>("hello");
  const [showAbout, setShowAbout] = useState(false);
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
    const next = WINDOW_CONFIGS.find(
      (c) => c.id !== id && states[c.id].isOpen && !states[c.id].isMinimized
    );
    if (next) setActiveId(next.id);
  }

  function toggleMinimize(id: WindowId) {
    const isCurrentlyMinimized = states[id].isMinimized;
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }));
    // When minimizing the active window, focus the next available non-minimized window
    if (!isCurrentlyMinimized && activeId === id) {
      const next = WINDOW_CONFIGS.find(
        (c) => c.id !== id && states[c.id].isOpen && !states[c.id].isMinimized
      );
      if (next) focusWindow(next.id);
    }
  }

  // Dock click: three-state toggle — closed→open, minimized→restore, open→minimize
  function openOrFocus(id: WindowId) {
    const s = states[id];
    if (!s.isOpen) {
      topZ.current += 1;
      setActiveId(id);
      setStates((prev) => ({
        ...prev,
        [id]: { isOpen: true, isMinimized: false, zIndex: topZ.current },
      }));
    } else if (s.isMinimized) {
      topZ.current += 1;
      setActiveId(id);
      setStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], isMinimized: false, zIndex: topZ.current },
      }));
    } else {
      toggleMinimize(id);
    }
  }

  // Menu action: never closes — opens/restores if needed, otherwise just focuses
  function showWindow(id: WindowId) {
    const s = states[id];
    if (!s.isOpen || s.isMinimized) {
      topZ.current += 1;
      setActiveId(id);
      setStates((prev) => ({
        ...prev,
        [id]: { isOpen: true, isMinimized: false, zIndex: topZ.current },
      }));
    } else {
      focusWindow(id);
    }
  }

  function handleQuit() {
    setStates((prev) => {
      const next = { ...prev };
      WINDOW_CONFIGS.forEach((c) => {
        next[c.id] = { ...next[c.id], isOpen: false };
      });
      return next;
    });
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!e.metaKey) return;
      switch (e.code) {
        case "KeyW":
          if (states[activeId]?.isOpen && !states[activeId]?.isMinimized) {
            e.preventDefault();
            closeWindow(activeId);
          }
          break;
        case "KeyM":
          if (states[activeId]?.isOpen) {
            e.preventDefault();
            toggleMinimize(activeId);
          }
          break;
        case "KeyQ":
          e.preventDefault();
          handleQuit();
          break;
        case "Backquote": {
          // Cmd+` — cycle through open non-minimized windows
          const openWindows = WINDOW_CONFIGS.filter(
            (c) => states[c.id].isOpen && !states[c.id].isMinimized
          );
          if (openWindows.length < 2) break;
          e.preventDefault();
          const currentIndex = openWindows.findIndex((c) => c.id === activeId);
          const nextIndex = (currentIndex + 1) % openWindows.length;
          focusWindow(openWindows[nextIndex].id);
          break;
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, states]);

  function handleMenuAction(action: MenuAction) {
    switch (action) {
      case "about-portfolio":
        setShowAbout(true);
        break;
      case "quit":
        handleQuit();
        break;
      case "close":
        if (states[activeId]?.isOpen) closeWindow(activeId);
        break;
      case "minimize":
        if (states[activeId]?.isOpen) toggleMinimize(activeId);
        break;
      case "open-hello":
        showWindow("hello");
        break;
      case "open-about":
        showWindow("about");
        break;
      case "open-projects":
        showWindow("projects");
        break;
      case "open-experience":
        showWindow("experience");
        break;
      case "open-contact":
        showWindow("contact");
        break;
      case "github":
        window.open("https://github.com/LuiAr", "_blank", "noopener,noreferrer");
        break;
      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/louis-arbey",
          "_blank",
          "noopener,noreferrer"
        );
        break;
    }
  }

  const activeTitle =
    WINDOW_CONFIGS.find((c) => c.id === activeId)?.title ?? "Portfolio";

  // Checked: windows that are open and visible (not minimized)
  const checkedActions = new Set<MenuAction>(
    WINDOW_CONFIGS
      .filter((c) => states[c.id].isOpen && !states[c.id].isMinimized)
      .map((c) => `open-${c.id}` as MenuAction)
  );

  // Dynamically disabled: close/minimize unavailable when no active visible window
  const disabledActions = new Set<MenuAction>();
  const activeState = states[activeId];
  if (!activeState?.isOpen || activeState?.isMinimized) {
    disabledActions.add("close");
    disabledActions.add("minimize");
  }

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
      <MenuBar
        activeTitle={activeTitle}
        onAction={handleMenuAction}
        checkedActions={checkedActions}
        disabledActions={disabledActions}
      />

      {/* Desktop area */}
      <div
        ref={desktopRef}
        className="flex-1 relative overflow-hidden mac-desktop-bg"
      >
        <AnimatePresence>
          {WINDOW_CONFIGS.map((config) => {
            const s = states[config.id];
            if (!s.isOpen || s.isMinimized) return null;
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
          const isActive = activeId === config.id && s.isOpen && !s.isMinimized;
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
              <span
                className={cn(
                  "w-1 h-1 border border-[var(--color-ink)]",
                  s.isOpen && !s.isMinimized ? "bg-[var(--color-ink)]" : "bg-transparent"
                )}
                style={{ visibility: s.isOpen ? "visible" : "hidden" }}
              />
            </button>
          );
        })}
      </div>

      {/* About modal */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}
