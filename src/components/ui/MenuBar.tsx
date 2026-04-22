"use client";

import { useEffect, useState, useRef } from "react";

const MENUS = ["File", "Edit", "View", "Window", "Help"];

interface MenuBarProps {
  activeTitle?: string;
  onQuit?: () => void;
}

// Classic Macintosh rainbow Apple logo (1984)
function AppleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Apple shape with rainbow stripes */}
      <path d="M8 0C3.58 0 0 3.58 0 8C0 10.84 1.16 13.48 2.96 15.12L4.2 14.4C3.12 13.04 2.4 11.28 2.4 9.36C2.4 6.84 4.16 4.8 6.4 4.8C7.28 4.8 8.08 5.04 8.68 5.44L9.32 4.8C8.72 4.4 8 3.84 8 3.2C8 1.44 9.44 0 11.2 0C12.96 0 14.4 1.44 14.4 3.2C14.4 5.2 13.2 6.8 13.2 9.2C13.2 11.2 14.4 12.8 14.4 14.4C14.4 15.28 13.88 16 13.04 16L11.04 15.6C12.4 15.2 13.6 14.4 13.6 13.2C13.6 10.8 11.2 8.8 8.8 8.8H8V0Z" fill="url(#apple-gradient)"/>
      <defs>
        <linearGradient id="apple-gradient" x1="0" y1="0" x2="0" y2="16">
          <stop offset="0%" stopColor="#008000"/>   {/* Green */}
          <stop offset="20%" stopColor="#ffff00"/>  {/* Yellow */}
          <stop offset="40%" stopColor="#ffa500"/>  {/* Orange */}
          <stop offset="60%" stopColor="#ff0000"/>  {/* Red */}
          <stop offset="80%" stopColor="#800080"/>  {/* Purple */}
          <stop offset="100%" stopColor="#0000ff"/> {/* Blue */}
        </linearGradient>
      </defs>
    </svg>
  );
}

// Apple Menu Dropdown
function AppleMenuDropdown({ onClose, onAbout, onQuit }: { onClose: () => void; onAbout: () => void; onQuit: () => void; }) {
  return (
    <div
      className="absolute top-full left-0 bg-[var(--color-cream)] border-2 border-[var(--color-ink)] shadow-[3px_3px_0px_var(--color-ink)] z-50 w-[180px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-2 text-[11px]">
        <button
          onClick={() => { onAbout(); onClose(); }}
          className="w-full text-left px-2 py-1 mac-invert-hover select-none flex items-center gap-4"
        >
          <span>About Portfolio</span>
        </button>
        <div className="border-t border-[var(--color-ink)] my-1" />
        <button
          onClick={() => { onQuit(); onClose(); }}
          className="w-full text-left px-2 py-1 mac-invert-hover select-none"
        >
          Quit Portfolio
        </button>
      </div>
    </div>
  );
}

// Simple About Modal
function AboutModal({ onClose }: { onClose: () => void; }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[var(--color-window-bg)] border-2 border-[var(--color-ink)] shadow-[3px_3px_0px_var(--color-ink)] p-4 w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 flex items-center h-[22px] relative border-b-2 border-[var(--color-ink)] mb-4">
          <div className="flex items-center gap-[3px] pl-[6px]">
            <button
              aria-label="close"
              onClick={onClose}
              className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)] hover:bg-[var(--color-ink)]"
            />
            <button className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)]" />
            <button className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-[var(--color-cream)] px-2 text-[11px] font-bold leading-none text-[var(--color-ink)]">
              About
            </span>
          </div>
        </div>
        <p className="text-[13px] leading-relaxed text-center">
          Portfolio v1.0
          <br />
          A 1984 Macintosh-inspired portfolio
          <br />
          Built with Next.js 15
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[11px] border border-[var(--color-ink)] bg-[var(--color-cream-dark)] mac-invert-hover"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuBar({ activeTitle = "Portfolio", onQuit }: MenuBarProps) {
  const [time, setTime] = useState("");
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const appleMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (appleMenuRef.current && !appleMenuRef.current.contains(e.target as Node)) {
        setShowAppleMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showAppleMenu) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setShowAppleMenu(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showAppleMenu]);

  const handleQuit = () => {
    // Close all windows
    if (onQuit) onQuit();
  };

  return (
    <>
      <nav
        className="flex-shrink-0 flex items-center h-[22px] bg-[var(--color-cream)] border-b-2 border-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Apple logo with dropdown */}
        <div
          ref={appleMenuRef}
          className="relative"
        >
          <button
            onClick={() => setShowAppleMenu(!showAppleMenu)}
            className="mac-invert-hover px-3 h-full flex items-center border-r border-[var(--color-ink)] select-none"
            aria-label="Apple menu"
          >
            <AppleLogo />
          </button>
          {showAppleMenu && (
            <AppleMenuDropdown
              onClose={() => setShowAppleMenu(false)}
              onAbout={() => setShowAboutModal(true)}
              onQuit={handleQuit}
            />
          )}
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
      {showAboutModal && <AboutModal onClose={() => setShowAboutModal(false)} />}
    </>
  );
}
