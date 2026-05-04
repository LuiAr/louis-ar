"use client";

import { useCallback } from "react";
import { type DesktopPattern, type Prefs, usePrefs, writePrefs } from "@/hooks/usePrefs";

// ── Pattern swatch previews ────────────────────────────────────────────────────

function patternStyle(id: DesktopPattern): React.CSSProperties {
  const base = { width: 40, height: 28, border: "1px solid var(--color-ink)" };
  switch (id) {
    case "crosshatch":
      return {
        ...base,
        backgroundColor: "#aaaaaa",
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 1px,rgba(255,255,255,0.18) 1px,rgba(255,255,255,0.18) 2px)," +
          "repeating-linear-gradient(90deg,transparent,transparent 1px,rgba(255,255,255,0.18) 1px,rgba(255,255,255,0.18) 2px)",
        backgroundSize: "4px 4px",
      };
    case "dense":
      return {
        ...base,
        backgroundColor: "#888888",
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 1px,rgba(255,255,255,0.22) 1px,rgba(255,255,255,0.22) 2px)," +
          "repeating-linear-gradient(90deg,transparent,transparent 1px,rgba(255,255,255,0.22) 1px,rgba(255,255,255,0.22) 2px)",
        backgroundSize: "2px 2px",
      };
    case "dots":
      return {
        ...base,
        backgroundColor: "#999999",
        backgroundImage:
          "radial-gradient(circle,rgba(255,255,255,0.35) 1px,transparent 1px)",
        backgroundSize: "4px 4px",
      };
    case "solid":
      return { ...base, backgroundColor: "#808080" };
  }
}

const PATTERNS: { id: DesktopPattern; label: string }[] = [
  { id: "crosshatch", label: "Crosshatch" },
  { id: "dense",      label: "Dense" },
  { id: "dots",       label: "Dots" },
  { id: "solid",      label: "Solid" },
];

// ── Sound utility ──────────────────────────────────────────────────────────────

function playTestBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
    ctx.close();
  } catch {
    // Web Audio API may be unavailable
  }
}

// ── Section wrapper ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          borderBottom: "2px solid var(--color-ink)",
          paddingBottom: 4,
          marginBottom: 12,
          fontSize: 11,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--color-ink-muted)",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

// ── Toggle row ─────────────────────────────────────────────────────────────────

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        padding: "8px 0",
        borderBottom: "1px solid var(--color-cream-dark)",
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontFamily: "var(--font-mono)" }}>{label}</div>
        {description && (
          <div style={{ fontSize: 11, color: "var(--color-ink-muted)", marginTop: 2 }}>
            {description}
          </div>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          flexShrink: 0,
          width: 40,
          height: 20,
          border: "2px solid var(--color-ink)",
          background: checked ? "var(--color-ink)" : "var(--color-cream-dark)",
          cursor: "pointer",
          position: "relative",
          fontFamily: "var(--font-mono)",
          boxShadow: "2px 2px 0 var(--color-ink)",
        }}
        aria-label={`${label}: ${checked ? "on" : "off"}`}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: checked ? "calc(100% - 14px)" : 2,
            width: 12,
            height: 12,
            background: checked ? "var(--color-cream)" : "var(--color-ink)",
            transition: "left 0.1s",
          }}
        />
      </button>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function SystemPreferences() {
  const prefs = usePrefs();

  const update = useCallback(
    (patch: Partial<Prefs>) => writePrefs({ ...prefs, ...patch }),
    [prefs]
  );

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-cream)",
        fontFamily: "var(--font-mono)",
        overflow: "auto",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          borderBottom: "2px solid var(--color-ink)",
          background: "var(--color-cream-dark)",
          padding: "6px 12px",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="4" y="4" width="3" height="3" fill="currentColor" />
          <rect x="9" y="4" width="3" height="3" fill="currentColor" />
          <rect x="4" y="9" width="3" height="3" fill="currentColor" />
          <rect x="9" y="9" width="3" height="3" fill="currentColor" />
        </svg>
        <span style={{ color: "var(--color-ink-muted)" }}>System Preferences</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>

        {/* Desktop & Screen Saver */}
        <Section title="Desktop">
          <p style={{ fontSize: 11, color: "var(--color-ink-muted)", marginBottom: 12 }}>
            Choose a desktop background pattern.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {PATTERNS.map(({ id, label }) => {
              const active = prefs.desktopPattern === id;
              return (
                <button
                  key={id}
                  onClick={() => update({ desktopPattern: id })}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 8px",
                    border: "2px solid var(--color-ink)",
                    background: active ? "var(--color-ink)" : "var(--color-cream-dark)",
                    color: active ? "var(--color-cream)" : "var(--color-ink)",
                    cursor: "pointer",
                    boxShadow: active
                      ? "inset 0 0 0 2px var(--color-ink)"
                      : "2px 2px 0 var(--color-ink)",
                    fontFamily: "var(--font-mono)",
                  }}
                  aria-pressed={active}
                  aria-label={`Desktop pattern: ${label}`}
                >
                  <div style={patternStyle(id)} />
                  <span style={{ fontSize: 10 }}>{label}</span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Sound */}
        <Section title="Sound">
          <ToggleRow
            label="Click Sounds"
            description="Play a classic Mac click on every button press."
            checked={prefs.sounds}
            onChange={(v) => {
              update({ sounds: v });
              if (v) playTestBeep();
            }}
          />
          <div style={{ marginTop: 10 }}>
            <button
              className="mac-button"
              onClick={playTestBeep}
              style={{ fontSize: 11 }}
            >
              ▶ Test Sound
            </button>
          </div>
        </Section>

        {/* Reset */}
        <Section title="General">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <div>
              <div style={{ fontSize: 13 }}>Restore Defaults</div>
              <div style={{ fontSize: 11, color: "var(--color-ink-muted)", marginTop: 2 }}>
                Reset all preferences to factory settings.
              </div>
            </div>
            <button
              className="mac-button"
              style={{ fontSize: 11 }}
              onClick={() =>
                writePrefs({ desktopPattern: "crosshatch", sounds: false })
              }
            >
              Reset
            </button>
          </div>
        </Section>
      </div>

      {/* Status bar */}
      <div
        style={{
          borderTop: "2px solid var(--color-ink)",
          background: "var(--color-cream-dark)",
          padding: "4px 12px",
          fontSize: 10,
          color: "var(--color-ink-muted)",
          display: "flex",
          gap: 12,
        }}
      >
        <span>Pattern: {prefs.desktopPattern}</span>
        <span>·</span>
        <span>Sounds: {prefs.sounds ? "on" : "off"}</span>
      </div>
    </div>
  );
}
