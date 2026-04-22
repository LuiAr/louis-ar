"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type MenuAction =
  | "about-portfolio"
  | "quit"
  | "close"
  | "minimize"
  | "open-hello"
  | "open-about"
  | "open-projects"
  | "open-experience"
  | "open-contact"
  | "github"
  | "linkedin";

interface MenuItem {
  label?: string;
  action?: MenuAction;
  shortcut?: string;
  disabled?: boolean;
  separator?: true;
}

const APPLE_ITEMS: MenuItem[] = [
  { label: "About This Portfolio", action: "about-portfolio" },
  { separator: true },
  { label: "Quit", action: "quit", shortcut: "⌘Q" },
];

const MENUS: { id: string; label: string; items: MenuItem[] }[] = [
  {
    id: "File",
    label: "File",
    items: [
      { label: "Close Window", action: "close", shortcut: "⌘W" },
      { separator: true },
      { label: "Get Info", disabled: true, shortcut: "⌘I" },
    ],
  },
  {
    id: "Edit",
    label: "Edit",
    items: [
      { label: "Undo", disabled: true, shortcut: "⌘Z" },
      { separator: true },
      { label: "Cut", disabled: true, shortcut: "⌘X" },
      { label: "Copy", disabled: true, shortcut: "⌘C" },
      { label: "Paste", disabled: true, shortcut: "⌘V" },
      { label: "Select All", disabled: true, shortcut: "⌘A" },
    ],
  },
  {
    id: "View",
    label: "View",
    items: [
      { label: "Hello.txt", action: "open-hello" },
      { label: "ReadMe.txt", action: "open-about" },
      { label: "Projects", action: "open-projects" },
      { label: "Experience", action: "open-experience" },
      { label: "Contact", action: "open-contact" },
    ],
  },
  {
    id: "Window",
    label: "Window",
    items: [
      { label: "Minimize", action: "minimize", shortcut: "⌘M" },
      { separator: true },
      { label: "Hello.txt", action: "open-hello" },
      { label: "ReadMe.txt", action: "open-about" },
      { label: "Projects", action: "open-projects" },
      { label: "Experience", action: "open-experience" },
      { label: "Contact", action: "open-contact" },
    ],
  },
  {
    id: "Help",
    label: "Help",
    items: [
      { label: "About This Portfolio", action: "about-portfolio" },
      { separator: true },
      { label: "GitHub ↗", action: "github" },
      { label: "LinkedIn ↗", action: "linkedin" },
    ],
  },
];

interface MenuBarProps {
  activeTitle?: string;
  onAction?: (action: MenuAction) => void;
}

function PearIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
      {/* Bottom body */}
      <ellipse cx="6" cy="10" rx="5" ry="4" />
      {/* Narrow neck */}
      <ellipse cx="6" cy="6" rx="3" ry="3.5" />
      {/* Stem */}
      <rect x="5.5" y="1" width="1" height="2.5" />
      {/* Leaf */}
      <path d="M6.5 2 Q9.5 0.5 8.5 3.5 Q7.5 2.5 6.5 2Z" />
    </svg>
  );
}

function DropdownMenu({
  items,
  onAction,
}: {
  items: MenuItem[];
  onAction: (action: MenuAction) => void;
}) {
  return (
    <div className="absolute top-full left-0 z-[200] min-w-[200px] bg-[var(--color-cream)] border-2 border-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)] py-1">
      {items.map((item, i) => {
        if (item.separator) {
          return (
            <div
              key={i}
              className="border-t border-[var(--color-ink-muted)] my-1 mx-2"
            />
          );
        }
        return (
          <button
            key={i}
            disabled={item.disabled}
            onClick={() => item.action && onAction(item.action)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-0.5 text-[11px] text-left cursor-default select-none",
              item.disabled
                ? "text-[var(--color-ink-muted)]"
                : "hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
            )}
          >
            <span>{item.label}</span>
            {item.shortcut && (
              <span
                className={cn(
                  "ml-8",
                  item.disabled && "opacity-50"
                )}
              >
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function MenuBar({
  activeTitle = "Portfolio",
  onAction,
}: MenuBarProps) {
  const [time, setTime] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menu when clicking outside the menu bar
  useEffect(() => {
    if (!openMenu) return;
    function handlePointerDown(e: PointerEvent) {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [openMenu]);

  function handleAction(action: MenuAction) {
    setOpenMenu(null);
    onAction?.(action);
  }

  function toggleMenu(id: string) {
    setOpenMenu((prev) => (prev === id ? null : id));
  }

  // While any menu is open, hovering another opens it immediately (classic Mac)
  function handleHover(id: string) {
    if (openMenu && openMenu !== id) setOpenMenu(id);
  }

  return (
    <nav
      ref={menuBarRef}
      className="relative z-10 flex-shrink-0 flex items-center h-[22px] bg-[var(--color-cream)] border-b-2 border-[var(--color-ink)]"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Pear logo — Apple menu */}
      <div className="relative h-full">
        <button
          onClick={() => toggleMenu("apple")}
          onMouseEnter={() => handleHover("apple")}
          className={cn(
            "px-3 h-full flex items-center border-r border-[var(--color-ink)] select-none cursor-default",
            openMenu === "apple"
              ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
              : "mac-invert-hover"
          )}
          aria-label="Apple menu"
        >
          <PearIcon />
        </button>
        {openMenu === "apple" && (
          <DropdownMenu items={APPLE_ITEMS} onAction={handleAction} />
        )}
      </div>

      {/* Active app name */}
      <div className="px-3 h-full flex items-center text-[11px] font-bold border-r border-[var(--color-ink)] select-none">
        {activeTitle}
      </div>

      {/* Menu items */}
      {MENUS.map((menu) => (
        <div key={menu.id} className="relative h-full">
          <button
            onClick={() => toggleMenu(menu.id)}
            onMouseEnter={() => handleHover(menu.id)}
            className={cn(
              "px-3 h-full flex items-center text-[11px] border-r border-[var(--color-ink)] cursor-default select-none",
              openMenu === menu.id
                ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
                : "mac-invert-hover"
            )}
          >
            {menu.label}
          </button>
          {openMenu === menu.id && (
            <DropdownMenu items={menu.items} onAction={handleAction} />
          )}
        </div>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clock */}
      <div className="px-3 h-full flex items-center text-[11px] border-l border-[var(--color-ink)] select-none tabular-nums">
        {time}
      </div>
    </nav>
  );
}
