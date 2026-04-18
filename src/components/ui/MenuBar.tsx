"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function MenuBar() {
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center h-[22px] bg-[var(--color-cream)] border-b-2 border-[var(--color-ink)]"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Apple logo */}
      <div className="mac-invert-hover px-3 h-full flex items-center text-[13px] font-bold border-r border-[var(--color-ink)]">

      </div>

      {/* Nav items */}
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="mac-invert-hover px-3 h-full flex items-center text-[11px] border-r border-[var(--color-ink)] no-underline"
        >
          {item.label}
        </a>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clock */}
      <div className="px-3 h-full flex items-center text-[11px] border-l border-[var(--color-ink)]">
        {time}
      </div>
    </nav>
  );
}
