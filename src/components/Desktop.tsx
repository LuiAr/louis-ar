"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import DraggableWindow from "@/components/ui/DraggableWindow";
import MenuBar, { type MenuAction, type MenuItem } from "@/components/ui/MenuBar";
import { APPS } from "@/data/apps";
import { usePrefs } from "@/hooks/usePrefs";

// ── localStorage persistence ──────────────────────────────────────────────────

const STORAGE_KEY = "louis-ar-windows-v2";

interface StoredLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

function loadLayout(): Record<string, StoredLayout> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveLayout(id: string, data: StoredLayout) {
  try {
    const current = loadLayout();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [id]: data }));
  } catch {
    // ignore — storage may be unavailable
  }
}

// ── Window state ──────────────────────────────────────────────────────────────

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

function buildInitialState(): Record<string, WindowState> {
  return Object.fromEntries(
    APPS.map((app, i) => [
      app.id,
      { isOpen: app.initiallyOpen, isMinimized: false, zIndex: APPS.length - i },
    ])
  );
}

// ── Games folder ─────────────────────────────────────────────────────────────

const GAME_IDS = new Set(["snake", "dino"]);

function GamesFolderIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M2 8 L4 5 L10 5 L12 8 L26 8 L26 24 L2 24Z"
        fill="var(--color-cream-dark)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Joystick / game icon inside */}
      <rect x="8" y="13" width="5" height="5" fill="currentColor" opacity="0.8" />
      <rect x="6" y="15" width="9" height="2" fill="currentColor" opacity="0.8" />
      <rect x="16" y="14" width="3" height="2" fill="currentColor" opacity="0.8" />
      <rect x="19" y="14" width="2" height="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

interface GamesFolderWindowProps {
  onOpen: (id: string) => void;
}

function GamesFolderWindow({ onOpen }: GamesFolderWindowProps) {
  const games = APPS.filter((a) => GAME_IDS.has(a.id));
  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 flex items-center justify-center gap-8 p-6"
        style={{ backgroundColor: "var(--color-window-bg)" }}
      >
        {games.map((app) => {
          const Icon = app.Icon;
          return (
            <button
              key={app.id}
              onClick={() => onOpen(app.id)}
              className="flex flex-col items-center gap-2 px-5 py-4 border border-transparent hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-dark)] active:bg-[var(--color-ink)] active:text-[var(--color-cream)]"
              aria-label={`Open ${app.dockLabel}`}
            >
              <span className="scale-[2] block mt-2 mb-2">
                <Icon />
              </span>
              <span
                className="text-[11px]"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {app.dockLabel}
              </span>
            </button>
          );
        })}
      </div>
      <div
        className="flex items-center px-3 border-t-2 text-[10px]"
        style={{
          borderColor: "var(--color-ink)",
          backgroundColor: "var(--color-cream-dark)",
          padding: "3px 10px",
          fontFamily: "var(--font-space-mono)",
        }}
      >
        {games.length} items — double-click to open
      </div>
    </div>
  );
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
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

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
            <button onClick={onClose} className="mac-button mac-button-default">
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
  const prefs = usePrefs();
  const [states, setStates] = useState<Record<string, WindowState>>(buildInitialState);
  const [activeId, setActiveId] = useState<string>(
    APPS.find((a) => a.initiallyOpen)?.id ?? APPS[0].id
  );
  const [showAbout, setShowAbout] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [gamesZ, setGamesZ] = useState(0);
  const [gamesActive, setGamesActive] = useState(false);
  const topZ = useRef(APPS.length);

  const dockApps = APPS.filter((a) => a.inDock);
  const desktopIconApps = APPS.filter((a) => !a.inDock && !GAME_IDS.has(a.id));

  // Click sounds — plays a retro Mac beep when prefs.sounds is enabled
  useEffect(() => {
    if (!prefs.sounds) return;
    function playClick() {
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
        ctx.close();
      } catch {
        // Web Audio API may be unavailable
      }
    }
    window.addEventListener("click", playClick);
    return () => window.removeEventListener("click", playClick);
  }, [prefs.sounds]);

  // Loaded once for defaultPosition/defaultWidth/defaultHeight on first mount
  const [storedLayout] = useState<Record<string, StoredLayout>>(loadLayout);
  // Mutable ref tracking live layout so position and size callbacks share state
  const layoutRef = useRef<Record<string, StoredLayout>>({ ...storedLayout });

  function focusWindow(id: string) {
    topZ.current += 1;
    setActiveId(id);
    setGamesActive(false);
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: topZ.current },
    }));
  }

  function closeWindow(id: string) {
    setStates((prev) => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
    const next = APPS.find(
      (a) => a.id !== id && states[a.id]?.isOpen && !states[a.id]?.isMinimized
    );
    if (next) setActiveId(next.id);
  }

  function toggleMinimize(id: string) {
    const isCurrentlyMinimized = states[id]?.isMinimized ?? false;
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }));
    if (!isCurrentlyMinimized && activeId === id) {
      const next = APPS.find(
        (a) => a.id !== id && states[a.id]?.isOpen && !states[a.id]?.isMinimized
      );
      if (next) focusWindow(next.id);
    }
  }

  // Dock click: three-state — closed→open, minimized→restore, open→minimize
  function openOrFocus(id: string) {
    setGamesActive(false);
    const s = states[id];
    if (!s) return;
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

  function openGamesFolder() {
    topZ.current += 1;
    setGamesOpen(true);
    setGamesZ(topZ.current);
    setGamesActive(true);
  }

  function focusGames() {
    topZ.current += 1;
    setGamesZ(topZ.current);
    setGamesActive(true);
  }

  // Menu action: never closes — opens/restores if needed, otherwise focuses
  function showWindow(id: string) {
    const s = states[id];
    if (!s) return;
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
      APPS.forEach((a) => {
        next[a.id] = { ...next[a.id], isOpen: false };
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
          const openWindows = APPS.filter(
            (a) => states[a.id]?.isOpen && !states[a.id]?.isMinimized
          );
          if (openWindows.length < 2) break;
          e.preventDefault();
          const currentIndex = openWindows.findIndex((a) => a.id === activeId);
          const nextIndex = (currentIndex + 1) % openWindows.length;
          focusWindow(openWindows[nextIndex].id);
          break;
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // closeWindow/toggleMinimize/focusWindow/handleQuit are recreated each render but all
    // depend only on `states` and `activeId`, which ARE in the deps array — adding the
    // functions themselves would be redundant and noisy.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, states]);

  function handleMenuAction(action: MenuAction) {
    if (action.startsWith("open-")) {
      showWindow(action.slice(5));
      return;
    }
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

  const activeTitle = gamesActive
    ? "Games"
    : (APPS.find((a) => a.id === activeId)?.title ?? "Portfolio");

  // Build window menu items from the registry for MenuBar
  const windowMenuItems: MenuItem[] = APPS.map((app) => ({
    label: app.menuLabel,
    action: `open-${app.id}` as MenuAction,
  }));

  // Checked: windows that are open and visible
  const checkedActions = new Set<MenuAction>(
    APPS
      .filter((a) => states[a.id]?.isOpen && !states[a.id]?.isMinimized)
      .map((a) => `open-${a.id}` as MenuAction)
  );

  // Dynamically disabled: close/minimize when no visible active window
  const disabledActions = new Set<MenuAction>();
  if (gamesActive) {
    disabledActions.add("close");
    disabledActions.add("minimize");
  } else {
    const activeState = states[activeId];
    if (!activeState?.isOpen || activeState?.isMinimized) {
      disabledActions.add("close");
      disabledActions.add("minimize");
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top menu bar */}
      <MenuBar
        activeTitle={activeTitle}
        onAction={handleMenuAction}
        checkedActions={checkedActions}
        disabledActions={disabledActions}
        windowMenuItems={windowMenuItems}
      />

      {/* Desktop area */}
      <div
        ref={desktopRef}
        className={cn("flex-1 relative overflow-hidden", {
          "mac-desktop-bg":       prefs.desktopPattern === "crosshatch",
          "mac-desktop-bg-dense": prefs.desktopPattern === "dense",
          "mac-desktop-bg-dots":  prefs.desktopPattern === "dots",
          "mac-desktop-bg-solid": prefs.desktopPattern === "solid",
        })}
      >
        {/* Desktop icons — right column, non-dock apps + Games folder */}
        <div className="absolute right-2 top-2 flex flex-col gap-0.5 z-[2] pointer-events-none">
          {/* Games folder */}
          <button
            className="pointer-events-auto flex flex-col items-center gap-0.5 w-16 px-1 py-1 border border-transparent hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-dark)]"
            onClick={openGamesFolder}
            aria-label="Open Games folder"
          >
            <GamesFolderIcon />
            <span className="text-[9px] leading-tight text-center" style={{ fontFamily: "var(--font-space-mono)" }}>
              Games
            </span>
          </button>

          {/* Other desktop apps */}
          {desktopIconApps.map((app) => {
            const s = states[app.id];
            const Icon = app.Icon;
            return (
              <button
                key={app.id}
                className="pointer-events-auto flex flex-col items-center gap-0.5 w-16 px-1 py-1 border border-transparent hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-dark)]"
                onClick={() => openOrFocus(app.id)}
                aria-label={`Open ${app.dockLabel}`}
              >
                <Icon />
                <span
                  className="text-[9px] leading-tight text-center truncate w-full"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {app.dockLabel}
                </span>
                {s.isOpen && (
                  <span className="w-1 h-1 bg-[var(--color-ink)] border border-[var(--color-ink)]" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {/* Games folder window */}
          {gamesOpen && (
            <DraggableWindow
              key="games-folder"
              title="Games"
              isActive={gamesActive}
              isMinimized={false}
              defaultPosition={{ x: 220, y: 90 }}
              defaultWidth={380}
              defaultHeight={260}
              zIndex={gamesZ}
              onFocus={focusGames}
              onClose={() => setGamesOpen(false)}
              onMinimize={() => setGamesOpen(false)}
              desktopRef={desktopRef}
            >
              <GamesFolderWindow onOpen={openOrFocus} />
            </DraggableWindow>
          )}

          {APPS.map((app) => {
            const s = states[app.id];
            if (!s.isOpen || s.isMinimized) return null;
            const stored = storedLayout[app.id];
            const Content = app.Content;
            return (
              <DraggableWindow
                key={app.id}
                title={app.title}
                isActive={activeId === app.id}
                isMinimized={s.isMinimized}
                defaultPosition={stored ? { x: stored.x, y: stored.y } : app.defaultPosition}
                defaultWidth={stored?.width ?? app.defaultWidth}
                defaultHeight={stored?.height ?? app.defaultHeight}
                zIndex={s.zIndex}
                onFocus={() => focusWindow(app.id)}
                onClose={() => closeWindow(app.id)}
                onMinimize={() => toggleMinimize(app.id)}
                onPositionChange={(pos) => {
                  const current = layoutRef.current[app.id] ?? { width: app.defaultWidth, height: app.defaultHeight, x: 0, y: 0 };
                  const updated = { ...current, ...pos };
                  layoutRef.current[app.id] = updated;
                  saveLayout(app.id, updated);
                }}
                onSizeChange={(size) => {
                  const current = layoutRef.current[app.id] ?? { x: app.defaultPosition.x, y: app.defaultPosition.y, width: app.defaultWidth, height: app.defaultHeight };
                  const updated = { ...current, ...size };
                  layoutRef.current[app.id] = updated;
                  saveLayout(app.id, updated);
                }}
                desktopRef={desktopRef}
              >
                <Content />
              </DraggableWindow>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock — portfolio apps only */}
      <div className="flex-shrink-0 h-16 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream)] flex items-center justify-center px-4 overflow-x-auto">
        <div className="flex items-center gap-1">
          {dockApps.map((app) => {
            const s = states[app.id];
            const isActive = activeId === app.id && s.isOpen && !s.isMinimized;
            const Icon = app.Icon;
            return (
              <button
                key={app.id}
                onClick={() => openOrFocus(app.id)}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-1 border border-transparent hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-dark)] transition-colors",
                  isActive && "bg-[var(--color-cream-dark)] border-[var(--color-ink)]"
                )}
              >
                <Icon />
                <span className="text-[9px] leading-tight">{app.dockLabel}</span>
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
      </div>

      {/* About modal */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}
