"use client";

import { useEffect, useState, useRef } from "react";

const STORAGE_KEY = "louis-ar-sticky-notes";
const MAX_NOTES = 6;

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: number;
}

function newNote(): Note {
  return {
    id: Math.random().toString(36).slice(2),
    title: "Untitled Note",
    body: "",
    createdAt: Date.now(),
  };
}

function load(): Note[] {
  if (typeof window === "undefined") return [newNote()];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Note[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [newNote()];
}

function save(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {}
}

export default function StickyNote() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = load();
    setNotes(loaded);
    setActiveId(loaded[0].id);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save(notes);
  }, [notes, hydrated]);

  const active = notes.find((n) => n.id === activeId) ?? notes[0];

  function updateActive(patch: Partial<Note>) {
    setNotes((prev) =>
      prev.map((n) => (n.id === active?.id ? { ...n, ...patch } : n))
    );
  }

  function addNote() {
    if (notes.length >= MAX_NOTES) return;
    const n = newNote();
    setNotes((prev) => [...prev, n]);
    setActiveId(n.id);
    setTimeout(() => bodyRef.current?.focus(), 0);
  }

  function deleteActive() {
    if (notes.length === 1) {
      const fresh = newNote();
      setNotes([fresh]);
      setActiveId(fresh.id);
      return;
    }
    const idx = notes.findIndex((n) => n.id === active?.id);
    const next = notes[idx > 0 ? idx - 1 : 1];
    setNotes((prev) => prev.filter((n) => n.id !== active?.id));
    setActiveId(next.id);
  }

  function startEditTitle() {
    setEditingTitle(true);
    setTimeout(() => {
      titleRef.current?.select();
    }, 0);
  }

  function commitTitle(val: string) {
    setEditingTitle(false);
    updateActive({ title: val.trim() || "Untitled Note" });
  }

  if (!hydrated || !active) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "var(--color-ink-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
        }}
      >
        Loading…
      </div>
    );
  }

  const wordCount = active.body.trim()
    ? active.body.trim().split(/\s+/).length
    : 0;
  const charCount = active.body.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--color-cream)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          borderBottom: "2px solid var(--color-ink)",
          background: "var(--color-cream-dark)",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        {/* New */}
        <button
          onClick={addNote}
          disabled={notes.length >= MAX_NOTES}
          title="New Note"
          style={{
            border: "1px solid var(--color-ink)",
            background: notes.length >= MAX_NOTES ? "var(--color-cream-dark)" : "var(--color-cream)",
            color: notes.length >= MAX_NOTES ? "var(--color-ink-muted)" : "var(--color-ink)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            padding: "2px 8px",
            cursor: notes.length >= MAX_NOTES ? "default" : "pointer",
            boxShadow: notes.length >= MAX_NOTES ? "none" : "2px 2px 0px var(--color-ink)",
          }}
        >
          + New
        </button>

        {/* Delete */}
        <button
          onClick={deleteActive}
          title="Delete Note"
          style={{
            border: "1px solid var(--color-ink)",
            background: "var(--color-cream)",
            color: "var(--color-ink)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            padding: "2px 8px",
            cursor: "pointer",
            boxShadow: "2px 2px 0px var(--color-ink)",
          }}
        >
          ✕ Delete
        </button>

        <div style={{ flex: 1 }} />

        {/* Note counter */}
        <span style={{ fontSize: "10px", color: "var(--color-ink-muted)" }}>
          {notes.indexOf(active) + 1}/{notes.length}
        </span>
      </div>

      {/* Note tabs */}
      {notes.length > 1 && (
        <div
          style={{
            display: "flex",
            borderBottom: "2px solid var(--color-ink)",
            background: "var(--color-cream-dark)",
            overflowX: "auto",
            flexShrink: 0,
          }}
        >
          {notes.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveId(n.id)}
              style={{
                border: "none",
                borderRight: "1px solid var(--color-ink)",
                background:
                  n.id === activeId
                    ? "var(--color-cream)"
                    : "var(--color-cream-dark)",
                color:
                  n.id === activeId
                    ? "var(--color-ink)"
                    : "var(--color-ink-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                padding: "4px 12px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                maxWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                borderBottom:
                  n.id === activeId
                    ? "2px solid var(--color-cream)"
                    : "none",
                marginBottom: n.id === activeId ? "-2px" : "0",
                position: "relative",
              }}
            >
              {n.title.length > 14 ? n.title.slice(0, 12) + "…" : n.title}
            </button>
          ))}
        </div>
      )}

      {/* Title row */}
      <div
        style={{
          borderBottom: "1px solid var(--color-ink)",
          padding: "6px 10px",
          background: "#faf6e0",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ fontSize: "10px", color: "var(--color-ink-muted)" }}>
          ▸
        </span>
        {editingTitle ? (
          <input
            ref={titleRef}
            defaultValue={active.title}
            onBlur={(e) => commitTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                commitTitle((e.target as HTMLInputElement).value);
              }
            }}
            style={{
              border: "1px solid var(--color-ink)",
              background: "var(--color-cream)",
              color: "var(--color-ink)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              padding: "1px 4px",
              flex: 1,
              outline: "none",
            }}
          />
        ) : (
          <span
            onDoubleClick={startEditTitle}
            title="Double-click to rename"
            style={{
              fontSize: "12px",
              color: "var(--color-ink)",
              fontWeight: "bold",
              cursor: "text",
              flex: 1,
              userSelect: "none",
            }}
          >
            {active.title}
          </span>
        )}
      </div>

      {/* Body textarea */}
      <textarea
        ref={bodyRef}
        value={active.body}
        onChange={(e) => updateActive({ body: e.target.value })}
        placeholder="Start typing your note here…"
        spellCheck
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          resize: "none",
          padding: "12px",
          background: "#faf6e0",
          color: "var(--color-ink)",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          lineHeight: "1.8",
          minHeight: 0,
        }}
      />

      {/* Status bar */}
      <div
        style={{
          borderTop: "2px solid var(--color-ink)",
          background: "var(--color-cream-dark)",
          padding: "3px 8px",
          display: "flex",
          gap: "16px",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "10px", color: "var(--color-ink-muted)" }}>
          {wordCount} word{wordCount !== 1 ? "s" : ""}
        </span>
        <span style={{ fontSize: "10px", color: "var(--color-ink-muted)" }}>
          {charCount} char{charCount !== 1 ? "s" : ""}
        </span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: "10px", color: "var(--color-ink-muted)" }}>
          {notes.length >= MAX_NOTES ? "Max notes reached" : `${MAX_NOTES - notes.length} note${MAX_NOTES - notes.length !== 1 ? "s" : ""} left`}
        </span>
      </div>
    </div>
  );
}
