"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Canvas constants ──────────────────────────────────────────────────────────
const CW = 540;        // canvas width
const CH = 200;        // canvas height
const GROUND_Y = 160;  // y of ground line
const DINO_X = 60;
const DINO_W = 28;
const DINO_H = 32;
const GRAVITY = 0.55;
const JUMP_VY = -11.5;
const SPEED_INIT = 4.5;
const MARGIN = 5;      // collision forgiveness

const INK = "#1a1611";
const CREAM = "#f5f0e8";
const MUTED = "#7a7267";

type GameState = "idle" | "playing" | "dead";

interface Cactus {
  x: number;
  w: number;
  h: number;
}

interface GameData {
  state: GameState;
  dinoY: number;
  dinoVY: number;
  cacti: Cactus[];
  score: number;
  highScore: number;
  speed: number;
  frame: number;
}

function makeFreshGame(): GameData {
  return {
    state: "playing",
    dinoY: GROUND_Y - DINO_H,
    dinoVY: 0,
    cacti: [],
    score: 0,
    highScore: 0,
    speed: SPEED_INIT,
    frame: 0,
  };
}

// ── Drawing helpers ───────────────────────────────────────────────────────────

function drawDino(
  ctx: CanvasRenderingContext2D,
  y: number,
  frame: number,
  dead: boolean
) {
  const x = DINO_X;
  ctx.fillStyle = INK;
  // Head
  ctx.fillRect(x + 8, y, 20, 12);
  // Eye white
  ctx.fillStyle = CREAM;
  ctx.fillRect(x + 21, y + 3, 4, 4);
  // Eye pupil
  ctx.fillStyle = INK;
  ctx.fillRect(x + 22, y + 4, 2, 2);
  // Body
  ctx.fillRect(x, y + 12, DINO_W, 18);
  // Tail
  ctx.fillRect(x - 6, y + 16, 8, 6);

  if (dead) {
    // X eyes
    ctx.fillStyle = CREAM;
    ctx.fillRect(x + 21, y + 3, 4, 4);
    ctx.fillStyle = INK;
    ctx.fillRect(x + 21, y + 3, 2, 2);
    ctx.fillRect(x + 23, y + 5, 2, 2);
    ctx.fillRect(x + 23, y + 3, 2, 2);
    ctx.fillRect(x + 21, y + 5, 2, 2);
    // Static legs
    ctx.fillRect(x + 4, y + 28, 8, 4);
    ctx.fillRect(x + 16, y + 28, 8, 4);
  } else {
    // Animated legs (only when on ground)
    const onGround = y >= GROUND_Y - DINO_H - 2;
    const leg = onGround ? Math.floor(frame / 6) % 2 : 0;
    if (leg === 0) {
      ctx.fillRect(x + 4, y + 28, 8, 6);
      ctx.fillRect(x + 16, y + 28, 8, 2);
    } else {
      ctx.fillRect(x + 4, y + 28, 8, 2);
      ctx.fillRect(x + 16, y + 28, 8, 6);
    }
  }
}

function drawCactus(ctx: CanvasRenderingContext2D, c: Cactus) {
  ctx.fillStyle = INK;
  const t = 8; // trunk width
  const mx = Math.round(c.x + (c.w - t) / 2);

  // Main trunk
  ctx.fillRect(mx, GROUND_Y - c.h, t, c.h);

  // Left arm
  const lArmY = Math.round(GROUND_Y - c.h * 0.6);
  ctx.fillRect(c.x, lArmY, mx - c.x + t, t);          // horizontal connector
  ctx.fillRect(c.x, lArmY - Math.round(c.h * 0.22), t, Math.round(c.h * 0.22)); // vertical cap

  // Right arm (offset for asymmetry)
  const rArmY = Math.round(GROUND_Y - c.h * 0.45);
  const rEnd = c.x + c.w;
  ctx.fillRect(mx, rArmY, rEnd - mx, t);               // horizontal connector
  ctx.fillRect(rEnd - t, rArmY - Math.round(c.h * 0.18), t, Math.round(c.h * 0.18)); // vertical cap
}

function drawPebbles(ctx: CanvasRenderingContext2D, offset: number) {
  ctx.fillStyle = INK;
  for (let i = 0; i < 22; i++) {
    const px = ((i * 28 - offset) % CW + CW) % CW;
    const size = 1 + (i % 3);
    ctx.fillRect(px, GROUND_Y + 5 + (i % 2) * 5, size + 1, 1);
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gRef = useRef<GameData>({
    state: "idle",
    dinoY: GROUND_Y - DINO_H,
    dinoVY: 0,
    cacti: [],
    score: 0,
    highScore: 0,
    speed: SPEED_INIT,
    frame: 0,
  });
  const rafRef = useRef<number>(0);

  // Single action handler: start / jump / restart
  const handleAction = useCallback(() => {
    const g = gRef.current;
    if (g.state === "idle") {
      g.state = "playing";
    } else if (g.state === "dead") {
      const hs = g.highScore;
      Object.assign(g, makeFreshGame());
      g.highScore = hs;
    } else {
      // Jump — only when on (or very near) the ground
      if (g.dinoY >= GROUND_Y - DINO_H - 2) {
        g.dinoVY = JUMP_VY;
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    // Explicit typed const so TypeScript preserves non-null narrowing inside closures
    const ctx: CanvasRenderingContext2D = rawCtx;

    function spawnCactus() {
      const g = gRef.current;
      const h = 26 + Math.random() * 28;
      const w = 18 + Math.random() * 14;
      g.cacti.push({ x: CW + 20, w, h });
    }

    function loop() {
      const g = gRef.current;

      // ── Clear ──
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, CW, CH);

      // ── Ground ──
      ctx.fillStyle = INK;
      ctx.fillRect(0, GROUND_Y, CW, 2);

      // ── Idle screen ──
      if (g.state === "idle") {
        drawDino(ctx, g.dinoY, 0, false);
        ctx.fillStyle = INK;
        ctx.font = "13px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("PRESS SPACE TO START", CW / 2, CH / 2 - 12);
        ctx.font = "10px 'Space Mono', monospace";
        ctx.fillStyle = MUTED;
        ctx.fillText("or click / tap", CW / 2, CH / 2 + 6);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // ── Update (playing only) ──
      if (g.state === "playing") {
        g.frame++;
        g.score = Math.floor(g.frame / 6);
        g.speed = SPEED_INIT + g.frame * 0.003;

        // Physics
        g.dinoVY += GRAVITY;
        g.dinoY += g.dinoVY;
        if (g.dinoY >= GROUND_Y - DINO_H) {
          g.dinoY = GROUND_Y - DINO_H;
          g.dinoVY = 0;
        }

        // Spawn
        const lastC = g.cacti[g.cacti.length - 1];
        const minGap = Math.max(160, 350 - g.frame * 0.06);
        if (!lastC || lastC.x < CW - minGap - Math.random() * 80) {
          spawnCactus();
        }

        // Move & cull
        for (const c of g.cacti) c.x -= g.speed;
        g.cacti = g.cacti.filter((c) => c.x > -50);

        // Collision (AABB with margin)
        const dL = DINO_X + MARGIN;
        const dR = DINO_X + DINO_W - MARGIN;
        const dT = g.dinoY + MARGIN;
        const dB = g.dinoY + DINO_H;
        for (const c of g.cacti) {
          if (
            dR > c.x + MARGIN &&
            dL < c.x + c.w - MARGIN &&
            dT < GROUND_Y &&
            dB > GROUND_Y - c.h + MARGIN
          ) {
            g.state = "dead";
            if (g.score > g.highScore) g.highScore = g.score;
            break;
          }
        }
      }

      // ── Draw ground details ──
      drawPebbles(ctx, g.frame * g.speed * 0.3);

      // ── Draw cacti ──
      for (const c of g.cacti) drawCactus(ctx, c);

      // ── Draw dino ──
      drawDino(ctx, g.dinoY, g.frame, g.state === "dead");

      // ── Score HUD ──
      ctx.fillStyle = INK;
      ctx.font = "11px 'Space Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(
        `HI ${String(g.highScore).padStart(5, "0")}  ${String(g.score).padStart(5, "0")}`,
        CW - 8,
        18
      );

      // ── Dead overlay ──
      if (g.state === "dead") {
        ctx.fillStyle = INK;
        ctx.font = "bold 14px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("G A M E  O V E R", CW / 2, CH / 2 - 18);
        ctx.font = "10px 'Space Mono', monospace";
        ctx.fillStyle = MUTED;
        ctx.fillText("SPACE / click to restart", CW / 2, CH / 2 + 2);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleAction();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleAction]);

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-3 p-4 select-none cursor-pointer"
      onClick={handleAction}
      onTouchStart={(e) => {
        e.preventDefault();
        handleAction();
      }}
    >
      <canvas
        ref={canvasRef}
        width={CW}
        height={CH}
        className="border-2 border-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)] max-w-full"
        style={{ imageRendering: "pixelated" }}
      />
      <p className="text-[10px] text-[var(--color-ink-muted)] font-mono tracking-wider">
        ↑ / SPACE TO JUMP · CLICK OR TAP TO PLAY
      </p>
    </div>
  );
}
