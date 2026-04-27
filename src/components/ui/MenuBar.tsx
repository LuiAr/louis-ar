"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type MenuAction =
  | "about-portfolio"
  | "quit"
  | "close"
  | "minimize"
  | "github"
  | "linkedin"
  | `open-${string}`;

export interface MenuItem {
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

const FILE_ITEMS: MenuItem[] = [
  { label: "Close Window", action: "close", shortcut: "⌘W" },
  { separator: true },
  { label: "Get Info", disabled: true, shortcut: "⌘I" },
];

const EDIT_ITEMS: MenuItem[] = [
  { label: "Undo", disabled: true, shortcut: "⌘Z" },
  { separator: true },
  { label: "Cut", disabled: true, shortcut: "⌘X" },
  { label: "Copy", disabled: true, shortcut: "⌘C" },
  { label: "Paste", disabled: true, shortcut: "⌘V" },
  { label: "Select All", disabled: true, shortcut: "⌘A" },
];

const HELP_ITEMS: MenuItem[] = [
  { label: "About This Portfolio", action: "about-portfolio" },
  { separator: true },
  { label: "GitHub ↗", action: "github" },
  { label: "LinkedIn ↗", action: "linkedin" },
];

function buildMenus(windowItems: MenuItem[]) {
  return [
    { id: "File", label: "File", items: FILE_ITEMS },
    { id: "Edit", label: "Edit", items: EDIT_ITEMS },
    { id: "View", label: "View", items: windowItems },
    {
      id: "Window",
      label: "Window",
      items: [
        { label: "Minimize", action: "minimize" as MenuAction, shortcut: "⌘M" },
        { separator: true as const },
        ...windowItems,
      ],
    },
    { id: "Help", label: "Help", items: HELP_ITEMS },
  ];
}

/** Indices of items that can be keyboard-focused (non-separator, non-disabled) */
function getNavigableIndices(
  items: MenuItem[],
  disabledActions?: Set<MenuAction>
): number[] {
  return items.reduce<number[]>((acc, item, i) => {
    const isDynDisabled = item.action && disabledActions?.has(item.action);
    if (!item.separator && !item.disabled && !isDynDisabled) acc.push(i);
    return acc;
  }, []);
}

interface MenuBarProps {
  activeTitle?: string;
  onAction?: (action: MenuAction) => void;
  checkedActions?: Set<MenuAction>;
  disabledActions?: Set<MenuAction>;
  /** Window items for the View and Window menus — built by the parent from the app registry */
  windowMenuItems?: MenuItem[];
}

function PearIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
      <ellipse cx="6" cy="10" rx="5" ry="4" />
      <ellipse cx="6" cy="6" rx="3" ry="3.5" />
      <rect x="5.5" y="1" width="1" height="2.5" />
      <path d="M6.5 2 Q9.5 0.5 8.5 3.5 Q7.5 2.5 6.5 2Z" />
    </svg>
  );
}

function DropdownMenu({
  items,
  onAction,
  focusedIndex,
  checkedActions,
  disabledActions,
}: {
  items: MenuItem[];
  onAction: (action: MenuAction) => void;
  focusedIndex: number;
  checkedActions?: Set<MenuAction>;
  disabledActions?: Set<MenuAction>;
}) {
  return (
    <div className="absolute top-full left-0 z-[200] min-w-[200px] bg-[var(--color-cream)] border-2 border-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)] py-1">
      {items.map((item, i) => {
        const itemKey = item.label ?? item.action ?? `sep-${i}`;
        if (item.separator) {
          return (
            <div
              key={itemKey}
              className="border-t border-[var(--color-ink-muted)] my-1 mx-2"
            />
          );
        }

        const isDynDisabled = item.action && disabledActions?.has(item.action);
        const isDisabled = item.disabled || isDynDisabled;
        const isChecked = item.action && checkedActions?.has(item.action);
        const isFocused = focusedIndex === i;

        return (
          <button
            key={itemKey}
            disabled={!!isDisabled}
            onClick={() => item.action && !isDisabled && onAction(item.action)}
            className={cn(
              "w-full flex items-center px-3 py-0.5 text-[11px] text-left cursor-default select-none",
              isDisabled
                ? "text-[var(--color-ink-muted)]"
                : isFocused
                ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
                : "hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
            )}
          >
            {/* Fixed-width checkmark column keeps labels aligned */}
            <span className="w-[14px] flex-shrink-0 text-center">
              {isChecked ? "✓" : ""}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className={cn("ml-8", isDisabled && "opacity-50")}>
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
  checkedActions,
  disabledActions,
  windowMenuItems = [],
}: MenuBarProps) {
  const [time, setTime] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuBarRef = useRef<HTMLElement>(null);

  const MENUS = useMemo(() => buildMenus(windowMenuItems), [windowMenuItems]);
  const ALL_MENU_IDS = useMemo(() => ["apple", ...MENUS.map((m) => m.id)], [MENUS]);

  function getItemsForMenu(menuId: string): MenuItem[] {
    if (menuId === "apple") return APPLE_ITEMS;
    return MENUS.find((m) => m.id === menuId)?.items ?? [];
  }

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
        setFocusedIndex(-1);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [openMenu]);

  // Keyboard navigation inside open menus
  useEffect(() => {
    if (!openMenu) return;

    function handleKeyDown(e: KeyboardEvent) {
      const currentItems = getItemsForMenu(openMenu!);
      const navIndices = getNavigableIndices(currentItems, disabledActions);
      const currentNavPos = navIndices.indexOf(focusedIndex);
      const menuPos = ALL_MENU_IDS.indexOf(openMenu!);

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setOpenMenu(null);
          setFocusedIndex(-1);
          break;

        case "ArrowDown": {
          e.preventDefault();
          const next =
            currentNavPos === -1
              ? navIndices[0]
              : navIndices[Math.min(currentNavPos + 1, navIndices.length - 1)];
          if (next !== undefined) setFocusedIndex(next);
          break;
        }

        case "ArrowUp": {
          e.preventDefault();
          const next =
            currentNavPos <= 0 ? navIndices[0] : navIndices[currentNavPos - 1];
          if (next !== undefined) setFocusedIndex(next);
          break;
        }

        case "ArrowLeft": {
          e.preventDefault();
          const prev =
            ALL_MENU_IDS[(menuPos - 1 + ALL_MENU_IDS.length) % ALL_MENU_IDS.length];
          setOpenMenu(prev);
          setFocusedIndex(-1);
          break;
        }

        case "ArrowRight": {
          e.preventDefault();
          const next = ALL_MENU_IDS[(menuPos + 1) % ALL_MENU_IDS.length];
          setOpenMenu(next);
          setFocusedIndex(-1);
          break;
        }

        case "Enter": {
          e.preventDefault();
          if (focusedIndex >= 0) {
            const item = currentItems[focusedIndex];
            if (item?.action) handleAction(item.action);
          }
          break;
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openMenu, focusedIndex, disabledActions, MENUS]);

  function handleAction(action: MenuAction) {
    setOpenMenu(null);
    setFocusedIndex(-1);
    onAction?.(action);
  }

  function toggleMenu(id: string) {
    setOpenMenu((prev) => (prev === id ? null : id));
    setFocusedIndex(-1);
  }

  function handleHover(id: string) {
    if (openMenu && openMenu !== id) {
      setOpenMenu(id);
      setFocusedIndex(-1);
    }
  }

  return (
    <nav
      ref={menuBarRef}
      className="relative z-[9999] flex-shrink-0 flex items-center h-[22px] bg-[var(--color-cream)] border-b-2 border-[var(--color-ink)]"
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
          <DropdownMenu
            items={APPLE_ITEMS}
            onAction={handleAction}
            focusedIndex={focusedIndex}
            checkedActions={checkedActions}
            disabledActions={disabledActions}
          />
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
            <DropdownMenu
              items={menu.items}
              onAction={handleAction}
              focusedIndex={focusedIndex}
              checkedActions={checkedActions}
              disabledActions={disabledActions}
            />
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
