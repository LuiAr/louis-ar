"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const INK = "#1a1611";
const PAPER = "#f5f0e8";
const CW = 400;
const CH = 268;

type Tool = "pencil" | "eraser" | "fill" | "rect" | "line";

interface Pt { x: number; y: number }

function floodFill(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  fr: number,
  fg: number,
  fb: number
) {
  const id = ctx.getImageData(0, 0, CW, CH);
  const d = id.data;
  const si = (sy * CW + sx) * 4;
  const tr = d[si], tg = d[si + 1], tb = d[si + 2];
  if (tr === fr && tg === fg && tb === fb) return;
  const q = [si];
  while (q.length) {
    const i = q.pop()!;
    if (d[i] !== tr || d[i + 1] !== tg || d[i + 2] !== tb) continue;
    d[i] = fr; d[i + 1] = fg; d[i + 2] = fb;
    const px = (i >> 2) % CW, py = ~~((i >> 2) / CW);
    if (px > 0) q.push(i - 4);
    if (px < CW - 1) q.push(i + 4);
    if (py > 0) q.push(i - CW * 4);
    if (py < CH - 1) q.push(i + CW * 4);
  }
  ctx.putImageData(id, 0, 0);
}

function bresenham(
  ctx: CanvasRenderingContext2D,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  sz: number
) {
  const h = sz >> 1;
  let x0 = ax, y0 = ay;
  const dx = Math.abs(bx - x0), sx = x0 < bx ? 1 : -1;
  const dy = -Math.abs(by - y0), sy = y0 < by ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    ctx.fillRect(x0 - h, y0 - h, sz, sz);
    if (x0 === bx && y0 === by) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
}

// ── Tool icons ────────────────────────────────────────────────────────────────

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="11" y1="2" x2="3" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <polygon points="3,10 2,12 4,11" fill="currentColor" />
      <line x1="11" y1="2" x2="13" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

function EraserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="3" y="5" width="8" height="5" fill="currentColor" />
      <rect x="5" y="5" width="6" height="5" fill="currentColor" opacity="0.4" />
      <line x1="1" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FillIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M6 2 L10 6 L8 8 L4 4Z" fill="currentColor" />
      <path d="M4 4 L2 9 L5 10 L7 8Z" fill="currentColor" />
      <circle cx="11" cy="11" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function RectIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="3" width="10" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="2" y1="12" x2="12" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

const TOOL_DEFS: { id: Tool; Icon: React.ComponentType; title: string }[] = [
  { id: "pencil", Icon: PencilIcon, title: "Pencil" },
  { id: "eraser", Icon: EraserIcon, title: "Eraser" },
  { id: "fill",   Icon: FillIcon,   title: "Fill Bucket" },
  { id: "rect",   Icon: RectIcon,   title: "Rectangle" },
  { id: "line",   Icon: LineIcon,   title: "Line" },
];

export default function MacPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);

  const [tool, setToolState] = useState<Tool>("pencil");
  const [size, setSizeState] = useState<number>(1);
  const [dark, setDarkState] = useState<boolean>(true);
  const [curPos, setCurPos] = useState({ x: 0, y: 0 });

  // Mutable refs so pointer handlers always see current values without re-registering
  const toolRef = useRef<Tool>("pencil");
  const sizeRef = useRef<number>(1);
  const darkRef = useRef<boolean>(true);

  const isDown = useRef(false);
  const startPt = useRef<Pt>({ x: 0, y: 0 });
  const lastPt  = useRef<Pt>({ x: 0, y: 0 });
  const snapRef = useRef<ImageData | null>(null);

  const setTool = (t: Tool)   => { toolRef.current = t; setToolState(t); };
  const setSize = (s: number) => { sizeRef.current = s; setSizeState(s); };
  const setDark = (d: boolean) => { darkRef.current = d; setDarkState(d); };

  const blit = useCallback(() => {
    const c = canvasRef.current, o = offRef.current;
    if (c && o) c.getContext("2d")!.drawImage(o, 0, 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const o = document.createElement("canvas");
    o.width = CW; o.height = CH;
    offRef.current = o;
    const ox = o.getContext("2d")!;
    const saved = localStorage.getItem("macpaint-v1");
    if (saved) {
      const img = new Image();
      img.onload = () => { ox.drawImage(img, 0, 0); blit(); };
      img.src = saved;
    } else {
      ox.fillStyle = PAPER;
      ox.fillRect(0, 0, CW, CH);
      blit();
    }
  }, [blit]);

  const getXY = (e: React.PointerEvent): Pt => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(CW - 1, Math.round((e.clientX - r.left) * CW / r.width))),
      y: Math.max(0, Math.min(CH - 1, Math.round((e.clientY - r.top)  * CH / r.height))),
    };
  };

  const persist = () => {
    const o = offRef.current;
    if (o) localStorage.setItem("macpaint-v1", o.toDataURL());
  };

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const p = getXY(e);
    isDown.current = true;
    startPt.current = p;
    lastPt.current  = p;

    const o = offRef.current;
    if (!o) return;
    const ox = o.getContext("2d")!;
    const fg = darkRef.current ? INK : PAPER;
    const sz = sizeRef.current;

    switch (toolRef.current) {
      case "fill": {
        const [r, g, b] = darkRef.current ? [26, 22, 17] : [245, 240, 232];
        floodFill(ox, p.x, p.y, r, g, b);
        blit(); persist();
        isDown.current = false;
        break;
      }
      case "pencil":
        ox.fillStyle = fg;
        bresenham(ox, p.x, p.y, p.x, p.y, sz);
        blit();
        break;
      case "eraser":
        ox.fillStyle = PAPER;
        ox.fillRect(p.x - sz, p.y - sz, sz * 2 + 1, sz * 2 + 1);
        blit();
        break;
      case "rect":
      case "line":
        snapRef.current = ox.getImageData(0, 0, CW, CH);
        break;
    }
  };

  const onMove = (e: React.PointerEvent) => {
    const p = getXY(e);
    setCurPos(p);
    if (!isDown.current) return;
    e.preventDefault();

    const o = offRef.current;
    if (!o) return;
    const ox = o.getContext("2d")!;
    const fg = darkRef.current ? INK : PAPER;
    const sz = sizeRef.current;

    switch (toolRef.current) {
      case "pencil":
        ox.fillStyle = fg;
        bresenham(ox, lastPt.current.x, lastPt.current.y, p.x, p.y, sz);
        lastPt.current = p;
        blit();
        break;
      case "eraser": {
        const es = Math.max(4, sz * 3);
        const h = es >> 1;
        ox.fillStyle = PAPER;
        ox.fillRect(p.x - h, p.y - h, es, es);
        lastPt.current = p;
        blit();
        break;
      }
      case "rect":
        if (snapRef.current) {
          ox.putImageData(snapRef.current, 0, 0);
          ox.strokeStyle = fg;
          ox.lineWidth = sz;
          ox.strokeRect(
            startPt.current.x, startPt.current.y,
            p.x - startPt.current.x, p.y - startPt.current.y
          );
          blit();
        }
        break;
      case "line":
        if (snapRef.current) {
          ox.putImageData(snapRef.current, 0, 0);
          ox.strokeStyle = fg;
          ox.lineWidth = sz;
          ox.beginPath();
          ox.moveTo(startPt.current.x, startPt.current.y);
          ox.lineTo(p.x, p.y);
          ox.stroke();
          blit();
        }
        break;
    }
  };

  const onUp = () => {
    if (!isDown.current) return;
    isDown.current = false;
    snapRef.current = null;
    persist();
  };

  const handleClear = () => {
    const o = offRef.current;
    if (!o) return;
    const ox = o.getContext("2d")!;
    ox.fillStyle = PAPER;
    ox.fillRect(0, 0, CW, CH);
    blit();
    localStorage.removeItem("macpaint-v1");
  };

  const toolBtn = (active: boolean) =>
    `w-7 h-7 border border-[var(--color-ink)] flex items-center justify-center ${
      active
        ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
        : "bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
    }`;

  const sizeBtn = (active: boolean) =>
    `w-8 h-7 border border-[var(--color-ink)] flex items-center justify-center text-[9px] font-mono ${
      active
        ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
        : "bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
    }`;

  return (
    <div className="flex flex-col h-full select-none" style={{ fontFamily: "var(--font-body)" }}>
      {/* Toolbar */}
      <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 border-b-2 border-[var(--color-ink)] bg-[var(--color-cream-dark)]">
        {TOOL_DEFS.map(({ id, Icon, title }) => (
          <button key={id} title={title} onClick={() => setTool(id)} className={toolBtn(tool === id)}>
            <Icon />
          </button>
        ))}

        <span className="w-px h-5 bg-[var(--color-ink)] mx-0.5" />

        <button
          title={dark ? "Black ink (click for white)" : "White ink (click for black)"}
          onClick={() => setDark(!dark)}
          className="w-7 h-7 border-2 border-[var(--color-ink)] flex-shrink-0"
          style={{ background: dark ? INK : PAPER }}
        />

        <span className="w-px h-5 bg-[var(--color-ink)] mx-0.5" />

        {([1, 2, 4] as const).map((s) => (
          <button key={s} title={`${s}px brush`} onClick={() => setSize(s)} className={sizeBtn(size === s)}>
            {s}px
          </button>
        ))}

        <span className="w-px h-5 bg-[var(--color-ink)] mx-0.5" />

        <button
          onClick={handleClear}
          className="px-2 h-7 text-[10px] font-mono border border-[var(--color-ink)] bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
        >
          NEW
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 min-h-0 bg-[var(--color-cream-dark)] flex items-center justify-center overflow-hidden p-2">
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          className="border-2 border-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)] max-w-full max-h-full"
          style={{ imageRendering: "pixelated", touchAction: "none", cursor: "crosshair" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        />
      </div>

      {/* Status bar */}
      <div className="flex-shrink-0 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream-dark)] px-3 py-0.5 flex justify-between text-[10px] font-mono text-[var(--color-ink-muted)]">
        <span>
          {TOOL_DEFS.find(t => t.id === tool)?.title} · {size}px · {dark ? "Black" : "White"}
        </span>
        <span>{curPos.x}, {curPos.y}</span>
      </div>
    </div>
  );
}
