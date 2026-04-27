"use client";

import { useEffect, useRef, useState } from "react";

type ArtKey = "mac" | "chime" | "finder" | "pixel" | "beachball" | "piano";

interface Station {
  name: string;
  genre: string;
  description: string;
  url: string;
  art: ArtKey;
}

const STATIONS: Station[] = [
  {
    name: "Groove Salad",
    genre: "Ambient · Downtempo",
    description: "A nicely chilled plate of ambient beats and grooves.",
    url: "https://ice1.somafm.com/groovesalad-256-mp3",
    art: "pixel",
  },
  {
    name: "Secret Agent",
    genre: "Spy Jazz · Lounge",
    description: "The soundtrack for your stylish, dangerous life.",
    url: "https://ice1.somafm.com/secretagent-256-mp3",
    art: "finder",
  },
  {
    name: "Drone Zone",
    genre: "Ambient · Space",
    description: "Spaced out ambient, served best chilled.",
    url: "https://ice1.somafm.com/dronezone-256-mp3",
    art: "chime",
  },
  {
    name: "Lush",
    genre: "Trip-hop · Electronic",
    description: "Sensuous female vocals over trip-hop beats.",
    url: "https://ice1.somafm.com/lush-256-mp3",
    art: "beachball",
  },
  {
    name: "Synphaera",
    genre: "Space Electronic",
    description: "Electronic music for interstellar travel.",
    url: "https://ice1.somafm.com/synphaera-256-mp3",
    art: "piano",
  },
  {
    name: "Illinois St. Lounge",
    genre: "Cocktail · Easy Listening",
    description: "Bachelor pad classics and music to make dinner to.",
    url: "https://ice1.somafm.com/illstreet-256-mp3",
    art: "mac",
  },
];

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
  const [stationIdx, setStationIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.addEventListener("waiting", () => setBuffering(true));
    audio.addEventListener("playing", () => { setBuffering(false); setError(false); });
    audio.addEventListener("error", () => { setPlaying(false); setBuffering(false); setError(true); });
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startStation = (idx: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(false);
    setBuffering(true);
    setStationIdx(idx);
    setPlaying(true);
    audio.src = STATIONS[idx].url;
    audio.play().catch(() => { setPlaying(false); setBuffering(false); setError(true); });
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      setBuffering(false);
    } else {
      startStation(stationIdx);
    }
  };

  const station = STATIONS[stationIdx];
  const AlbumArt = ARTS[station.art];

  const statusLabel = buffering ? "Buffering..." : playing ? "▶ On Air" : "|| Off Air";

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
              <div className="flex items-center gap-2">
                <span className="font-bold truncate">{station.name}</span>
                {playing && !buffering && (
                  <span className="flex-shrink-0 text-xs border border-[var(--color-ink)] px-1 animate-pulse">
                    LIVE
                  </span>
                )}
              </div>
              <div className="text-[var(--color-ink-muted)] text-xs truncate">{station.genre}</div>
              <div className="text-[var(--color-ink-muted)] text-xs truncate opacity-70 mt-0.5">{station.description}</div>
              {error && (
                <div className="text-xs mt-1 opacity-70">Stream unavailable — try another station.</div>
              )}
            </div>

            <div>
              {/* Live stream indicator bar */}
              <div className="w-full h-3 border-2 border-[var(--color-ink)] bg-[var(--color-cream-dark)] overflow-hidden">
                {playing && !buffering && (
                  <div
                    className="h-full bg-[var(--color-ink)]"
                    style={{
                      width: "30%",
                      animation: "liveScroll 2s linear infinite",
                    }}
                  />
                )}
                {buffering && (
                  <div className="h-full bg-[var(--color-ink-muted)] opacity-50 w-full" />
                )}
              </div>
              <style>{`
                @keyframes liveScroll {
                  0%   { transform: translateX(-100%); width: 40%; }
                  100% { transform: translateX(350%);  width: 40%; }
                }
              `}</style>
              <div className="text-xs mt-0.5 text-[var(--color-ink-muted)]">
                {buffering ? "Connecting..." : playing ? "Live stream" : "Press Play to connect"}
              </div>

              <div className="flex gap-1.5 mt-2">
                <button
                  onClick={() => startStation((stationIdx - 1 + STATIONS.length) % STATIONS.length)}
                  className="mac-button flex-1 py-1 text-xs"
                >
                  « Prev
                </button>
                <button
                  onClick={handlePlayPause}
                  className="mac-button flex-1 py-1 text-xs font-bold"
                  disabled={buffering}
                >
                  {buffering ? "..." : playing ? "Pause" : "Play"}
                </button>
                <button
                  onClick={() => startStation((stationIdx + 1) % STATIONS.length)}
                  className="mac-button flex-1 py-1 text-xs"
                >
                  Next »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Station list */}
      <div className="flex-1 min-h-0 overflow-auto">
        {STATIONS.map((s, i) => (
          <div
            key={i}
            className={`mac-list-row gap-2 ${i === stationIdx ? "bg-[var(--color-ink)] text-[var(--color-cream)]" : ""}`}
            onClick={() => startStation(i)}
          >
            <span className="w-4 text-xs opacity-60 flex-shrink-0">{i + 1}</span>
            <span className="flex-1 truncate text-sm">{s.name}</span>
            <span className="text-xs opacity-60 truncate hidden sm:inline" style={{ maxWidth: 110 }}>
              {s.genre}
            </span>
            <span className="w-3 text-xs flex-shrink-0">
              {i === stationIdx ? (playing && !buffering ? "♪" : buffering ? "·" : "") : ""}
            </span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex-shrink-0 flex justify-between items-center px-3 py-1 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream-dark)] text-xs text-[var(--color-ink-muted)]">
        <span>{statusLabel} · Station {stationIdx + 1}/{STATIONS.length}</span>
        <span>SomaFM</span>
      </div>
    </div>
  );
}
