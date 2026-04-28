"use client";

import { useEffect, useState } from "react";

const CX = 100, CY = 100;

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function hand(deg: number, length: number, tailLen: number, width: number) {
  return (
    <rect
      x={CX - width / 2}
      y={CY - length}
      width={width}
      height={length + tailLen}
      fill="var(--color-ink)"
      transform={`rotate(${deg} ${CX} ${CY})`}
    />
  );
}

function ClockFace({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) {
  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hrDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Outer frame with classic Mac hard shadow */}
      <rect x="0" y="0" width="200" height="200" fill="var(--color-ink)" />
      <rect x="0" y="0" width="197" height="197" fill="var(--color-window-bg)" stroke="var(--color-ink)" strokeWidth="3" />

      {/* Hour tick marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30 - 90;
        const rad = (angle * Math.PI) / 180;
        const x1 = CX + Math.cos(rad) * 74;
        const y1 = CY + Math.sin(rad) * 74;
        const x2 = CX + Math.cos(rad) * 86;
        const y2 = CY + Math.sin(rad) * 86;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--color-ink)"
            strokeWidth="4"
            strokeLinecap="square"
          />
        );
      })}

      {/* Minute tick marks */}
      {Array.from({ length: 60 }).map((_, i) => {
        if (i % 5 === 0) return null;
        const angle = i * 6 - 90;
        const rad = (angle * Math.PI) / 180;
        const x1 = CX + Math.cos(rad) * 81;
        const y1 = CY + Math.sin(rad) * 81;
        const x2 = CX + Math.cos(rad) * 86;
        const y2 = CY + Math.sin(rad) * 86;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--color-ink)"
            strokeWidth="1"
            strokeLinecap="square"
          />
        );
      })}

      {/* Hour hand */}
      {hand(hrDeg, 52, 14, 7)}
      {/* Minute hand */}
      {hand(minDeg, 70, 14, 4)}
      {/* Second hand */}
      {hand(secDeg, 78, 20, 2)}

      {/* Center cap covers all hand bases */}
      <rect x="94" y="94" width="12" height="12" fill="var(--color-ink)" />
    </svg>
  );
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="flex items-center justify-center h-full" style={{ color: "var(--color-ink-muted)" }}>
        —
      </div>
    );
  }

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const pad = (n: number) => String(n).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-5"
      style={{ padding: "20px", background: "var(--color-cream)" }}
    >
      <ClockFace hours={h} minutes={m} seconds={s} />

      {/* Digital time */}
      <div
        style={{
          border: "2px solid var(--color-ink)",
          background: "var(--color-cream-dark)",
          boxShadow: "3px 3px 0px var(--color-ink)",
          padding: "6px 16px",
          display: "flex",
          alignItems: "baseline",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontSize: "28px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
            color: "var(--color-ink)",
          }}
        >
          {pad(h12)}:{pad(m)}:{pad(s)}
        </span>
        <span style={{ fontSize: "11px", color: "var(--color-ink-muted)", fontFamily: "var(--font-mono)" }}>
          {ampm}
        </span>
      </div>

      {/* Date */}
      <div style={{ textAlign: "center", lineHeight: "1.7", fontSize: "12px" }}>
        <div style={{ color: "var(--color-ink)", fontFamily: "var(--font-mono)" }}>
          {DAYS[now.getDay()]}
        </div>
        <div style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-mono)" }}>
          {MONTHS[now.getMonth()]} {now.getDate()}, {now.getFullYear()}
        </div>
      </div>
    </div>
  );
}
