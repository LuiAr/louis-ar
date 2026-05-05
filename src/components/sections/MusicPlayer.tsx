"use client";

import { useEffect, useState } from "react";

type ArtKey = "mac" | "chime" | "finder" | "pixel" | "beachball" | "piano";

interface Track {
  title: string;
  artist: string;
  album: string;
  duration: number;
  art: ArtKey;
}

const TRACKS: Track[] = [
  { title: "Happy Mac",        artist: "Apple Computer",     album: "System 7 Sounds", duration: 185, art: "mac"       },
  { title: "Startup Chime",    artist: "Jim Reekes",         album: "Classic Mac OS",  duration: 212, art: "chime"     },
  { title: "Finder Shuffle",   artist: "System Software",    album: "Macintosh Plus",  duration: 198, art: "finder"    },
  { title: "Pixel Dance",      artist: "MacPaint Orchestra", album: "8-Bit Dreams",    duration: 224, art: "pixel"     },
  { title: "Beach Ball Blues", artist: "Spinning Beachball", album: "Kernel Panic",    duration: 167, art: "beachball" },
  { title: "Cmd-Q Lullaby",    artist: "Cmd+Q",              album: "Quit Gracefully", duration: 241, art: "piano"     },
];

function fmt(s: number): string {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

// ── Album art ─────────────────────────────────────────────────────────────────

function ArtMac() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" fill="var(--color-cream-dark)" />
      <rect x="16" y="10" width="48" height="42" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="2" />
      <rect x="22" y="16" width="36" height="24" fill="var(--color-ink)" />
      <rect x="30" y="23" width="4" height="4" fill="var(--color-cream)" />
      <rect x="46" y="23" width="4" height="4" fill="var(--color-cream)" />
      <rect x="30" y="32" width="20" height="3" fill="var(--color-cream)" />
      <rect x="28" y="35" width="4" height="3" fill="var(--color-cream)" />
      <rect x="48" y="35" width="4" height="3" fill="var(--color-cream)" />
      <rect x="28" y="46" width="24" height="4" fill="var(--color-cream-dark)" stroke="var(--color-ink)" strokeWidth="1" />
      <rect x="20" y="52" width="40" height="6" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="2" />
      <rect x="25" y="58" width="30" height="4" fill="var(--color-ink)" />
      <rect x="30" y="62" width="20" height="6" fill="var(--color-ink)" />
    </svg>
  );
}

function ArtChime() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" fill="var(--color-ink)" />
      <rect x="14" y="42" width="10" height="10" fill="var(--color-cream)" />
      <rect x="24" y="22" width="4" height="22" fill="var(--color-cream)" />
      <rect x="24" y="22" width="16" height="4" fill="var(--color-cream)" />
      <rect x="44" y="50" width="10" height="10" fill="var(--color-cream)" />
      <rect x="54" y="30" width="4" height="22" fill="var(--color-cream)" />
      <rect x="54" y="30" width="16" height="4" fill="var(--color-cream)" />
      <rect x="34" y="12" width="4" height="4" fill="var(--color-cream)" opacity="0.6" />
      <rect x="10" y="20" width="3" height="3" fill="var(--color-cream)" opacity="0.4" />
      <rect x="62" y="55" width="4" height="4" fill="var(--color-cream)" opacity="0.6" />
    </svg>
  );
}

function ArtFinder() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" fill="#a8d8ea" />
      <path d="M8 30 L8 64 L72 64 L72 30 L40 30 L34 22 L8 22 Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="2" />
      <line x1="8" y1="30" x2="72" y2="30" stroke="var(--color-ink)" strokeWidth="2" />
      <rect x="20" y="36" width="10" height="12" fill="var(--color-ink)" />
      <rect x="50" y="36" width="10" height="12" fill="var(--color-ink)" />
      <rect x="24" y="52" width="32" height="5" fill="var(--color-ink)" />
    </svg>
  );
}

function ArtPixel() {
  const PAL = ["var(--color-ink)", "var(--color-cream)", "var(--color-cream-dark)", "var(--color-ink-muted)"];
  const P = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 2, 3, 2, 3, 1, 0],
    [1, 0, 3, 2, 3, 2, 0, 1],
    [0, 1, 2, 3, 2, 3, 1, 0],
    [1, 0, 3, 2, 3, 2, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ];
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {P.map((row, r) =>
        row.map((c, col) => (
          <rect key={`${r}-${col}`} x={col * 10} y={r * 10} width="10" height="10" fill={PAL[c]} />
        ))
      )}
    </svg>
  );
}

function ArtBeachball() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" fill="var(--color-cream)" />
      <circle cx="40" cy="40" r="32" fill="white" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M40 8 A32 32 0 0 1 72 40 L40 40Z" fill="#e84040" />
      <path d="M72 40 A32 32 0 0 1 40 72 L40 40Z" fill="#e8a020" />
      <path d="M40 72 A32 32 0 0 1 8 40 L40 40Z" fill="#4080e0" />
      <path d="M8 40 A32 32 0 0 1 40 8 L40 40Z" fill="#40b840" />
      <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <rect x="28" y="14" width="10" height="7" fill="white" opacity="0.4" />
    </svg>
  );
}

function ArtPiano() {
  const wKeys = [2, 12, 22, 32, 42, 52, 62, 72];
  const bKeys = [8, 18, 36, 46, 56];
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" fill="var(--color-cream-dark)" />
      {wKeys.map((x, i) => (
        <rect key={i} x={x} y="22" width="9" height="42" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1" />
      ))}
      {bKeys.map((x, i) => (
        <rect key={i} x={x} y="22" width="7" height="26" fill="var(--color-ink)" />
      ))}
      <rect x="2" y="16" width="76" height="8" fill="var(--color-ink)" />
      <rect x="2" y="62" width="76" height="4" fill="var(--color-ink)" />
    </svg>
  );
}

const ARTS: Record<ArtKey, React.ComponentType> = {
  mac:       ArtMac,
  chime:     ArtChime,
  finder:    ArtFinder,
  pixel:     ArtPixel,
  beachball: ArtBeachball,
  piano:     ArtPiano,
};

// ── Main component ────────────────────────────────────────────────────────────

export default function MusicPlayer() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const track = TRACKS[trackIdx];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setElapsed((e) => e + 0.1), 100);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (elapsed >= track.duration) {
      setTrackIdx((i) => (i + 1) % TRACKS.length);
      setElapsed(0);
    }
  }, [elapsed, track.duration]);

  const handlePrev = () => {
    if (elapsed > 3) {
      setElapsed(0);
    } else {
      setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
      setElapsed(0);
    }
  };

  const handleNext = () => {
    setTrackIdx((i) => (i + 1) % TRACKS.length);
    setElapsed(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setElapsed(ratio * track.duration);
  };

  const AlbumArt = ARTS[track.art];
  const progress = Math.min(1, elapsed / track.duration);

  return (
    <div className="flex flex-col h-full select-none">
      {/* Player section */}
      <div className="flex-shrink-0 p-3 border-b-2 border-[var(--color-ink)]">
        <div className="flex gap-3">
          <div className="flex-shrink-0 border-2 border-[var(--color-ink)] shadow-[3px_3px_0px_var(--color-ink)]">
            <AlbumArt />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="font-bold truncate">{track.title}</div>
              <div className="text-[var(--color-ink-muted)] text-xs truncate">{track.artist}</div>
              <div className="text-[var(--color-ink-muted)] text-xs truncate opacity-70">{track.album}</div>
            </div>

            <div>
              <button
                className="w-full h-3 border-2 border-[var(--color-ink)] cursor-pointer bg-[var(--color-cream-dark)]"
                onClick={handleProgressClick}
                aria-label={`Seek — ${fmt(elapsed)} of ${fmt(track.duration)}`}
                aria-valuenow={Math.round(elapsed)}
                aria-valuemin={0}
                aria-valuemax={track.duration}
                role="slider"
                style={{ padding: 0, display: "block" }}
              >
                <div className="h-full bg-[var(--color-ink)]" style={{ width: `${progress * 100}%` }} />
              </button>
              <div className="flex justify-between text-xs mt-0.5 text-[var(--color-ink-muted)]">
                <span>{fmt(elapsed)}</span>
                <span>{fmt(track.duration)}</span>
              </div>

              <div className="flex gap-1.5 mt-2">
                <button onClick={handlePrev} className="mac-button flex-1 py-1 text-xs">
                  « Prev
                </button>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="mac-button flex-1 py-1 text-xs font-bold"
                >
                  {playing ? "Pause" : "Play"}
                </button>
                <button onClick={handleNext} className="mac-button flex-1 py-1 text-xs">
                  Next »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <div className="flex-1 min-h-0 overflow-auto">
        {TRACKS.map((t, i) => (
          <button
            key={i}
            className={`mac-list-row gap-2 w-full text-left ${i === trackIdx ? "bg-[var(--color-ink)] text-[var(--color-cream)]" : ""}`}
            onClick={() => {
              setTrackIdx(i);
              setElapsed(0);
              setPlaying(true);
            }}
            aria-label={`Play ${t.title} by ${t.artist}`}
            aria-pressed={i === trackIdx}
          >
            <span className="w-4 text-xs opacity-60 flex-shrink-0">{i + 1}</span>
            <span className="flex-1 truncate text-sm">{t.title}</span>
            <span className="text-xs opacity-60 truncate hidden sm:inline" style={{ maxWidth: 100 }}>
              {t.artist}
            </span>
            <span className="text-xs flex-shrink-0">{fmt(t.duration)}</span>
            <span className="w-3 text-xs flex-shrink-0">{i === trackIdx ? (playing ? "♪" : "·") : ""}</span>
          </button>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex-shrink-0 flex justify-between items-center px-3 py-1 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream-dark)] text-xs text-[var(--color-ink-muted)]">
        <span>{playing ? "▶ Now Playing" : "|| Paused"} · {trackIdx + 1}/{TRACKS.length}</span>
        <span>Jukebox 1.0</span>
      </div>
    </div>
  );
}
