"use client";

import { useEffect, useState } from "react";

export type DesktopPattern = "crosshatch" | "dense" | "dots" | "solid";

export interface Prefs {
  desktopPattern: DesktopPattern;
  sounds: boolean;
}

const PREFS_KEY = "louis-ar-prefs";

export const DEFAULT_PREFS: Prefs = {
  desktopPattern: "crosshatch",
  sounds: false,
};

export function readPrefs(): Prefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function writePrefs(prefs: Prefs): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new CustomEvent("prefs-change", { detail: prefs }));
  } catch {
    // storage unavailable
  }
}

export function usePrefs(): Prefs {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => {
    setPrefs(readPrefs());
    const handler = (e: Event) => setPrefs((e as CustomEvent<Prefs>).detail);
    window.addEventListener("prefs-change", handler);
    return () => window.removeEventListener("prefs-change", handler);
  }, []);

  return prefs;
}
