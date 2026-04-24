"use client";

import { useState } from "react";

interface Photo {
  id: string;
  filename: string;
  title: string;
  date: string;
  size: string;
  kind: string;
  render: () => React.ReactNode;
}

// ── Pixel-art SVG thumbnails for each "photo" ─────────────────────────────────

function ProfileArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <image href="/louis-ar/profile.jpeg" x="0" y="0" width="80" height="80" preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}

function RobotArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="#f5f0e8" />
      {/* Signal waves */}
      <path d="M4 14 Q14 4 24 14" stroke="#1a1611" strokeWidth="2" fill="none" />
      <path d="M1 18 Q14 1 27 18" stroke="#1a1611" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      {/* Robot head */}
      <rect x="22" y="18" width="36" height="28" fill="#1a1611" />
      <rect x="24" y="20" width="32" height="24" fill="#f5f0e8" />
      {/* Eyes */}
      <rect x="29" y="25" width="8" height="8" fill="#1a1611" />
      <rect x="43" y="25" width="8" height="8" fill="#1a1611" />
      <rect x="31" y="27" width="4" height="4" fill="#f5f0e8" />
      <rect x="45" y="27" width="4" height="4" fill="#f5f0e8" />
      <rect x="32" y="28" width="2" height="2" fill="#1a1611" />
      <rect x="46" y="28" width="2" height="2" fill="#1a1611" />
      {/* Mouth */}
      <rect x="29" y="36" width="22" height="4" fill="#1a1611" />
      <rect x="31" y="37" width="2" height="2" fill="#f5f0e8" />
      <rect x="35" y="37" width="2" height="2" fill="#f5f0e8" />
      <rect x="39" y="37" width="2" height="2" fill="#f5f0e8" />
      <rect x="43" y="37" width="2" height="2" fill="#f5f0e8" />
      <rect x="47" y="37" width="2" height="2" fill="#f5f0e8" />
      {/* Antenna */}
      <rect x="39" y="10" width="2" height="8" fill="#1a1611" />
      <rect x="36" y="8" width="8" height="4" fill="#1a1611" />
      <rect x="37" y="6" width="6" height="2" fill="#1a1611" />
      {/* Body */}
      <rect x="28" y="46" width="24" height="18" fill="#1a1611" />
      <rect x="30" y="48" width="8" height="5" fill="#f5f0e8" />
      <rect x="42" y="48" width="8" height="5" fill="#f5f0e8" />
      {/* Circuit lines */}
      <rect x="30" y="56" width="20" height="1" fill="#f5f0e8" />
      <rect x="36" y="57" width="1" height="5" fill="#f5f0e8" />
      <rect x="44" y="57" width="1" height="5" fill="#f5f0e8" />
      {/* Legs */}
      <rect x="30" y="64" width="8" height="12" fill="#1a1611" />
      <rect x="42" y="64" width="8" height="12" fill="#1a1611" />
      <rect x="28" y="74" width="12" height="4" fill="#1a1611" />
      <rect x="40" y="74" width="12" height="4" fill="#1a1611" />
    </svg>
  );
}

function VisionArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="#f5f0e8" />
      {/* Camera body */}
      <rect x="8" y="22" width="48" height="36" fill="#1a1611" />
      <rect x="10" y="24" width="44" height="32" fill="#ede8df" />
      {/* Lens */}
      <rect x="18" y="30" width="28" height="20" fill="#1a1611" />
      <rect x="20" y="32" width="24" height="16" fill="#f5f0e8" />
      <rect x="22" y="34" width="20" height="12" fill="#1a1611" />
      <rect x="24" y="36" width="16" height="8" fill="#7a7267" />
      <rect x="28" y="38" width="8" height="4" fill="#f5f0e8" />
      {/* Flash */}
      <rect x="42" y="26" width="8" height="6" fill="#1a1611" />
      <rect x="43" y="27" width="6" height="4" fill="#f5f0e8" />
      {/* Detection grid overlay */}
      <rect x="56" y="10" width="20" height="20" fill="none" stroke="#1a1611" strokeWidth="1.5" />
      <rect x="58" y="12" width="6" height="6" fill="none" stroke="#1a1611" strokeWidth="1" />
      <rect x="66" y="12" width="6" height="6" fill="none" stroke="#1a1611" strokeWidth="1" />
      <rect x="58" y="20" width="6" height="6" fill="none" stroke="#1a1611" strokeWidth="1" />
      <rect x="66" y="20" width="6" height="6" fill="#1a1611" fillOpacity="0.3" stroke="#1a1611" strokeWidth="1" />
      {/* Arrow */}
      <line x1="54" y1="20" x2="60" y2="20" stroke="#1a1611" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Tray / result */}
      <rect x="56" y="36" width="20" height="32" fill="#1a1611" />
      <rect x="58" y="38" width="16" height="10" fill="#f5f0e8" />
      <rect x="60" y="40" width="4" height="4" fill="#1a1611" />
      <rect x="66" y="40" width="6" height="2" fill="#1a1611" />
      <rect x="66" y="43" width="4" height="2" fill="#1a1611" />
      <rect x="58" y="52" width="16" height="2" fill="#7a7267" />
      <rect x="58" y="56" width="10" height="2" fill="#7a7267" />
      <rect x="58" y="60" width="12" height="2" fill="#7a7267" />
    </svg>
  );
}

function MacArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="#f5f0e8" />
      {/* Monitor body */}
      <rect x="12" y="8" width="56" height="44" fill="#1a1611" />
      <rect x="14" y="10" width="52" height="40" fill="#ede8df" />
      {/* Screen */}
      <rect x="16" y="12" width="48" height="34" fill="#1a1611" />
      {/* Code lines on screen */}
      <rect x="19" y="15" width="8" height="2" fill="#f5f0e8" />
      <rect x="29" y="15" width="16" height="2" fill="#f5f0e8" fillOpacity="0.6" />
      <rect x="21" y="20" width="12" height="2" fill="#f5f0e8" fillOpacity="0.8" />
      <rect x="35" y="20" width="20" height="2" fill="#f5f0e8" fillOpacity="0.5" />
      <rect x="23" y="25" width="20" height="2" fill="#f5f0e8" fillOpacity="0.7" />
      <rect x="21" y="30" width="6" height="2" fill="#f5f0e8" />
      <rect x="29" y="30" width="24" height="2" fill="#f5f0e8" fillOpacity="0.5" />
      <rect x="19" y="35" width="30" height="2" fill="#f5f0e8" fillOpacity="0.4" />
      <rect x="19" y="40" width="16" height="2" fill="#f5f0e8" fillOpacity="0.6" />
      {/* Cursor */}
      <rect x="36" y="40" width="6" height="2" fill="#f5f0e8" />
      {/* Stand */}
      <rect x="34" y="52" width="12" height="4" fill="#1a1611" />
      <rect x="28" y="56" width="24" height="4" fill="#1a1611" />
      {/* Keyboard */}
      <rect x="18" y="62" width="44" height="12" fill="#1a1611" />
      <rect x="20" y="64" width="40" height="8" fill="#ede8df" />
      {/* Keys */}
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <rect key={i} x={21 + i * 4} y="65" width="3" height="3" fill="#1a1611" fillOpacity="0.4" />
      ))}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x={22 + i * 4} y="70" width="3" height="2" fill="#1a1611" fillOpacity="0.4" />
      ))}
    </svg>
  );
}

function DataArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="#f5f0e8" />
      {/* Chart background */}
      <rect x="8" y="8" width="64" height="50" fill="#1a1611" />
      <rect x="10" y="10" width="60" height="46" fill="#ede8df" />
      {/* Axes */}
      <line x1="18" y1="48" x2="64" y2="48" stroke="#1a1611" strokeWidth="1.5" />
      <line x1="18" y1="14" x2="18" y2="48" stroke="#1a1611" strokeWidth="1.5" />
      {/* Bars */}
      <rect x="22" y="34" width="6" height="14" fill="#1a1611" />
      <rect x="31" y="26" width="6" height="22" fill="#1a1611" />
      <rect x="40" y="20" width="6" height="28" fill="#1a1611" />
      <rect x="49" y="30" width="6" height="18" fill="#1a1611" />
      <rect x="58" y="22" width="6" height="26" fill="#1a1611" />
      {/* Trend line */}
      <polyline points="25,36 34,28 43,22 52,32 61,24" stroke="#7a7267" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
      {/* Dots */}
      <rect x="23" y="34" width="4" height="4" fill="#f5f0e8" />
      <rect x="32" y="26" width="4" height="4" fill="#f5f0e8" />
      <rect x="41" y="20" width="4" height="4" fill="#f5f0e8" />
      <rect x="50" y="30" width="4" height="4" fill="#f5f0e8" />
      <rect x="59" y="22" width="4" height="4" fill="#f5f0e8" />
      {/* Legend */}
      <rect x="10" y="62" width="8" height="8" fill="#1a1611" />
      <rect x="22" y="64" width="20" height="2" fill="#1a1611" fillOpacity="0.5" />
      <rect x="22" y="68" width="14" height="2" fill="#1a1611" fillOpacity="0.3" />
      <rect x="46" y="62" width="8" height="8" fill="#1a1611" fillOpacity="0.4" />
      <rect x="58" y="64" width="14" height="2" fill="#1a1611" fillOpacity="0.5" />
    </svg>
  );
}

function SwedishArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="#f5f0e8" />
      {/* Stockholm cityscape silhouette */}
      {/* Water */}
      <rect x="0" y="58" width="80" height="22" fill="#ede8df" />
      <rect x="0" y="58" width="80" height="2" fill="#1a1611" />
      {/* Buildings */}
      <rect x="2" y="38" width="12" height="20" fill="#1a1611" />
      <rect x="4" y="34" width="8" height="6" fill="#1a1611" />
      <rect x="6" y="30" width="4" height="6" fill="#1a1611" />
      <rect x="16" y="44" width="10" height="14" fill="#1a1611" />
      <rect x="18" y="40" width="6" height="6" fill="#1a1611" />
      <rect x="28" y="36" width="14" height="22" fill="#1a1611" />
      <rect x="31" y="28" width="8" height="10" fill="#1a1611" />
      <rect x="34" y="22" width="2" height="8" fill="#1a1611" />
      <rect x="44" y="42" width="10" height="16" fill="#1a1611" />
      <rect x="46" y="36" width="6" height="8" fill="#1a1611" />
      <rect x="56" y="40" width="12" height="18" fill="#1a1611" />
      <rect x="58" y="34" width="8" height="8" fill="#1a1611" />
      <rect x="60" y="30" width="4" height="6" fill="#1a1611" />
      {/* Windows */}
      {[0,1,2].map(row =>
        [0,1].map(col => (
          <rect key={`${row}-${col}`} x={4 + col * 4} y={40 + row * 5} width="2" height="3" fill="#f5f0e8" fillOpacity="0.5" />
        ))
      )}
      {/* Moon */}
      <rect x="62" y="6" width="12" height="12" fill="#1a1611" />
      <rect x="64" y="8" width="8" height="8" fill="#f5f0e8" />
      <rect x="66" y="10" width="4" height="4" fill="#1a1611" />
      {/* Stars */}
      <rect x="10" y="10" width="2" height="2" fill="#1a1611" />
      <rect x="20" y="6" width="2" height="2" fill="#1a1611" />
      <rect x="36" y="12" width="2" height="2" fill="#1a1611" />
      <rect x="48" y="8" width="2" height="2" fill="#1a1611" />
    </svg>
  );
}

// ── Photo data ────────────────────────────────────────────────────────────────

const PHOTOS: Photo[] = [
  {
    id: "profile",
    filename: "profile.jpeg",
    title: "Louis AR",
    date: "2025-01-01",
    size: "248 KB",
    kind: "JPEG image",
    render: ProfileArt,
  },
  {
    id: "robot",
    filename: "6g_robot_vision.png",
    title: "6G On-Device AI for Robots",
    date: "2026-01-15",
    size: "512 KB",
    kind: "PNG image",
    render: RobotArt,
  },
  {
    id: "vision",
    filename: "self_checkout_vision.png",
    title: "Self-Checkout Vision System",
    date: "2023-06-10",
    size: "384 KB",
    kind: "PNG image",
    render: VisionArt,
  },
  {
    id: "mac",
    filename: "portfolio_website.png",
    title: "Portfolio Website",
    date: "2025-04-01",
    size: "156 KB",
    kind: "PNG image",
    render: MacArt,
  },
  {
    id: "data",
    filename: "data_science_work.png",
    title: "Data Science @ Redfield AB",
    date: "2025-09-01",
    size: "290 KB",
    kind: "PNG image",
    render: DataArt,
  },
  {
    id: "stockholm",
    filename: "stockholm_nights.png",
    title: "Stockholm Nights",
    date: "2025-11-20",
    size: "201 KB",
    kind: "PNG image",
    render: SwedishArt,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PhotoViewer() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedPhoto = PHOTOS.find((p) => p.id === selected) ?? null;
  const selectedIndex = PHOTOS.findIndex((p) => p.id === selected);

  const navigate = (dir: -1 | 1) => {
    const next = (selectedIndex + dir + PHOTOS.length) % PHOTOS.length;
    setSelected(PHOTOS[next].id);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-cream)] select-none">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 border-b-2 border-[var(--color-ink)] bg-[var(--color-cream-dark)]">
        <button
          onClick={() => setSelected(null)}
          disabled={!selected}
          className="px-2 py-0.5 text-xs border border-[var(--color-ink)] bg-[var(--color-cream)] disabled:opacity-30 mac-invert-hover active:scale-95"
          style={{ boxShadow: "1px 1px 0 var(--color-ink)" }}
        >
          ◉ Grid
        </button>
        <div className="w-px h-4 bg-[var(--color-ink)] mx-1 opacity-30" />
        <button
          onClick={() => navigate(-1)}
          disabled={!selected}
          className="px-2 py-0.5 text-xs border border-[var(--color-ink)] bg-[var(--color-cream)] disabled:opacity-30 mac-invert-hover active:scale-95"
          style={{ boxShadow: "1px 1px 0 var(--color-ink)" }}
        >
          ◂ Prev
        </button>
        <button
          onClick={() => navigate(1)}
          disabled={!selected}
          className="px-2 py-0.5 text-xs border border-[var(--color-ink)] bg-[var(--color-cream)] disabled:opacity-30 mac-invert-hover active:scale-95"
          style={{ boxShadow: "1px 1px 0 var(--color-ink)" }}
        >
          Next ▸
        </button>
        <span className="ml-auto text-[10px] text-[var(--color-ink-muted)] font-mono">
          {selected
            ? `${selectedIndex + 1} of ${PHOTOS.length}`
            : `${PHOTOS.length} items`}
        </span>
      </div>

      {/* Main area */}
      <div className="flex-1 min-h-0 overflow-auto">
        {selected && selectedPhoto ? (
          /* ── Single photo view ── */
          <div className="flex flex-col items-center justify-center h-full p-4 gap-3">
            <div
              className="border-2 border-[var(--color-ink)] overflow-hidden cursor-pointer"
              style={{
                boxShadow: "3px 3px 0 var(--color-ink)",
                width: 260,
                height: 260,
              }}
              onClick={() => setSelected(null)}
              title="Click to return to grid"
            >
              {selectedPhoto.render()}
            </div>
            <div className="text-center">
              <p className="font-mono text-sm font-bold text-[var(--color-ink)]">
                {selectedPhoto.title}
              </p>
              <p className="font-mono text-[10px] text-[var(--color-ink-muted)] mt-0.5">
                {selectedPhoto.filename}
              </p>
            </div>
          </div>
        ) : (
          /* ── Grid view ── */
          <div className="p-3 grid grid-cols-3 gap-3">
            {PHOTOS.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelected(photo.id)}
                className="flex flex-col items-center gap-1 p-1.5 border border-[var(--color-ink)] bg-[var(--color-window-bg)] mac-invert-hover group"
                style={{ boxShadow: "2px 2px 0 var(--color-ink)" }}
              >
                <div
                  className="border border-[var(--color-ink)] overflow-hidden"
                  style={{ width: 80, height: 80 }}
                >
                  {photo.render()}
                </div>
                <span className="font-mono text-[9px] text-[var(--color-ink)] text-center leading-tight max-w-full truncate w-full">
                  {photo.filename}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="px-2 py-0.5 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream-dark)] flex items-center justify-between">
        {selectedPhoto ? (
          <>
            <span className="font-mono text-[10px] text-[var(--color-ink)]">
              {selectedPhoto.kind}
            </span>
            <span className="font-mono text-[10px] text-[var(--color-ink-muted)]">
              {selectedPhoto.date} · {selectedPhoto.size}
            </span>
          </>
        ) : (
          <span className="font-mono text-[10px] text-[var(--color-ink-muted)]">
            {PHOTOS.length} items — click to view
          </span>
        )}
      </div>
    </div>
  );
}
