"use client";

import { useEffect, useState } from "react";

const MENUS = ["File", "Edit", "View", "Window", "Help"];

interface MenuBarProps {
  activeTitle?: string;
}

export default function MenuBar({ activeTitle = "Portfolio" }: MenuBarProps) {
  const [time, setTime] = useState("");

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

  return (
    <nav
      className="flex-shrink-0 flex items-center h-[22px] bg-[var(--color-cream)] border-b-2 border-[var(--color-ink)]"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Apple logo */}
      <div className="mac-invert-hover px-3 h-full flex items-center text-[13px] font-bold border-r border-[var(--color-ink)] select-none">

      </div>

      {/* Active app name */}
      <div className="px-3 h-full flex items-center text-[11px] font-bold border-r border-[var(--color-ink)] select-none">
        {activeTitle}
      </div>

      {/* Menu items */}
      {MENUS.map((item) => (
        <div
          key={item}
          className="mac-invert-hover px-3 h-full flex items-center text-[11px] border-r border-[var(--color-ink)] cursor-default select-none"
        >
          {item}
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
