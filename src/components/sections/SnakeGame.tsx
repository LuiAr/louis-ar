"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Canvas constants ──────────────────────────────────────────────────────────
const CELL = 16;
const COLS = 28;
const ROWS = 15;
const CW = COLS * CELL; // 448
const CH = ROWS * CELL; // 240

const TICK_INIT = 10; // frames per snake move at start
const SPEED_MIN = 4;  // fastest possible tick interval

const INK = "#1a1611";
const CREAM = "#f5f0e8";
const CREAM_DARK = "#ede8df";
const MUTED = "#7a7267";

type Dir = "up" | "down" | "left" | "right";
type GameState = "idle" | "playing" | "dead";

interface Point {
  x: number;
  y: number;
}

interface GameData {
  state: GameState;
  snake: Point[];
  dir: Dir;
  nextDir: Dir;
  food: Point;
  score: number;
  highScore: number;
  frame: number;
  tick: number;
  tickCount: number;
}

function randomFood(snake: Point[]): Point {
  // Fast path: random attempts work well when the grid is sparse
  for (let attempts = 0; attempts < 100; attempts++) {
    const p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p;
  }
  // Fallback: linear scan for a free cell (handles nearly-full grid)
  const occupied = new Set(snake.map((s) => s.y * COLS + s.x));
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!occupied.has(y * COLS + x)) return { x, y };
    }
  }
  // Grid completely full — return snake head so game ends naturally
  return snake[0];
}

function makeFreshGame(highScore: number): GameData {
  const snake = [
    { x: 8, y: 7 },
    { x: 7, y: 7 },
    { x: 6, y: 7 },
  ];
  return {
    state: "playing",
    snake,
    dir: "right",
    nextDir: "right",
    food: randomFood(snake),
    score: 0,
    highScore,
    frame: 0,
    tick: TICK_INIT,
    tickCount: 0,
  };
}

// ── Drawing helpers ───────────────────────────────────────────────────────────

function drawCheckerGrid(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = CREAM_DARK;
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if ((x + y) % 2 === 0) {
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }
  }
}

function drawSnake(
  ctx: CanvasRenderingContext2D,
  snake: Point[],
  dir: Dir,
  dead: boolean
) {
  for (let i = snake.length - 1; i >= 0; i--) {
    const s = snake[i];
    const px = s.x * CELL;
    const py = s.y * CELL;

    if (i === 0) {
      // Head
      ctx.fillStyle = INK;
      ctx.fillRect(px, py, CELL, CELL);

      // Eyes — positioned relative to direction
      ctx.fillStyle = CREAM;
      if (dead) {
        // X eyes when dead
        ctx.fillRect(px + 3, py + 4, 3, 2);
        ctx.fillRect(px + 10, py + 4, 3, 2);
        ctx.fillRect(px + 3, py + 6, 3, 2);
        ctx.fillRect(px + 10, py + 6, 3, 2);
      } else if (dir === "right") {
        ctx.fillRect(px + 10, py + 3, 3, 3);
        ctx.fillRect(px + 10, py + 9, 3, 3);
      } else if (dir === "left") {
        ctx.fillRect(px + 3, py + 3, 3, 3);
        ctx.fillRect(px + 3, py + 9, 3, 3);
      } else if (dir === "up") {
        ctx.fillRect(px + 3, py + 3, 3, 3);
        ctx.fillRect(px + 9, py + 3, 3, 3);
      } else {
        ctx.fillRect(px + 3, py + 9, 3, 3);
        ctx.fillRect(px + 9, py + 9, 3, 3);
      }
    } else {
      // Body segment — inset 1px for a segmented look
      ctx.fillStyle = INK;
      ctx.fillRect(px + 1, py + 1, CELL - 2, CELL - 2);
    }
  }
}

function drawFood(ctx: CanvasRenderingContext2D, food: Point, frame: number) {
  const px = food.x * CELL;
  const py = food.y * CELL;
  // Subtle pulse: flicker every 30 frames
  const bright = Math.floor(frame / 15) % 2 === 0;
  ctx.fillStyle = bright ? INK : MUTED;
  // Pixel-art apple shape
  ctx.fillRect(px + 4, py + 5, 8, 7);
  ctx.fillRect(px + 3, py + 6, 10, 5);
  // Stem
  ctx.fillStyle = INK;
  ctx.fillRect(px + 7, py + 3, 2, 3);
  // Leaf
  ctx.fillRect(px + 9, py + 3, 3, 2);
}

function drawBorder(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, CW - 2, CH - 2);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gRef = useRef<GameData>({
    state: "idle",
    snake: [{ x: 8, y: 7 }, { x: 7, y: 7 }, { x: 6, y: 7 }],
    dir: "right",
    nextDir: "right",
    food: { x: 18, y: 7 },
    score: 0,
    highScore: 0,
    frame: 0,
    tick: TICK_INIT,
    tickCount: 0,
  });
  const rafRef = useRef<number>(0);

  const handleStart = useCallback(() => {
    const g = gRef.current;
    if (g.state === "idle" || g.state === "dead") {
      const hs = g.highScore;
      Object.assign(g, makeFreshGame(hs));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    function loop() {
      const g = gRef.current;
      g.frame++;

      // Clear
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, CW, CH);
      drawCheckerGrid(ctx);

      // ── Idle screen ──
      if (g.state === "idle") {
        drawSnake(ctx, g.snake, g.dir, false);
        drawFood(ctx, g.food, g.frame);
        drawBorder(ctx);
        ctx.fillStyle = INK;
        ctx.font = "bold 14px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("S N A K E", CW / 2, CH / 2 - 18);
        ctx.font = "11px 'Space Mono', monospace";
        ctx.fillText("PRESS ARROW KEY TO START", CW / 2, CH / 2 + 2);
        ctx.font = "10px 'Space Mono', monospace";
        ctx.fillStyle = MUTED;
        ctx.fillText("or click / tap", CW / 2, CH / 2 + 20);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // ── Update (playing only) ──
      if (g.state === "playing") {
        g.tickCount++;
        if (g.tickCount >= g.tick) {
          g.tickCount = 0;
          g.dir = g.nextDir;

          const head = g.snake[0];
          let nx = head.x;
          let ny = head.y;
          if (g.dir === "right") nx++;
          else if (g.dir === "left") nx--;
          else if (g.dir === "up") ny--;
          else ny++;

          // Wall collision
          if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
            g.state = "dead";
            if (g.score > g.highScore) g.highScore = g.score;
          } else {
            // Self collision — tail is about to move so exclude it
            const bodyToCheck = g.snake.slice(0, -1);
            const hitSelf = bodyToCheck.some((s) => s.x === nx && s.y === ny);
            if (hitSelf) {
              g.state = "dead";
              if (g.score > g.highScore) g.highScore = g.score;
            } else {
              g.snake.unshift({ x: nx, y: ny });
              if (nx === g.food.x && ny === g.food.y) {
                g.score++;
                // Speed up every 3 apples
                g.tick = Math.max(SPEED_MIN, TICK_INIT - Math.floor(g.score / 3));
                g.food = randomFood(g.snake);
              } else {
                g.snake.pop();
              }
            }
          }
        }
      }

      // ── Draw ──
      drawFood(ctx, g.food, g.frame);
      drawSnake(ctx, g.snake, g.dir, g.state === "dead");
      drawBorder(ctx);

      // Score HUD
      ctx.fillStyle = INK;
      ctx.font = "11px 'Space Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(
        `HI ${String(g.highScore).padStart(3, "0")}  ${String(g.score).padStart(3, "0")}`,
        CW - 6,
        14
      );

      // Dead overlay
      if (g.state === "dead") {
        ctx.fillStyle = "rgba(245, 240, 232, 0.88)";
        ctx.fillRect(CW / 2 - 150, CH / 2 - 36, 300, 68);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.strokeRect(CW / 2 - 150, CH / 2 - 36, 300, 68);
        ctx.fillStyle = INK;
        ctx.font = "bold 14px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("G A M E  O V E R", CW / 2, CH / 2 - 10);
        ctx.font = "10px 'Space Mono', monospace";
        ctx.fillStyle = MUTED;
        ctx.fillText("ARROW KEY / click to restart", CW / 2, CH / 2 + 12);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    const handleKey = (e: KeyboardEvent) => {
      const g = gRef.current;
      const isArrow = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code);

      if (!isArrow) return;
      e.preventDefault();

      if (g.state === "idle") {
        g.state = "playing";
        // Set initial direction from key
        if (e.code === "ArrowUp") g.dir = g.nextDir = "up";
        else if (e.code === "ArrowDown") g.dir = g.nextDir = "down";
        else if (e.code === "ArrowLeft") g.dir = g.nextDir = "left";
        else if (e.code === "ArrowRight") g.dir = g.nextDir = "right";
        return;
      }

      if (g.state === "dead") {
        const hs = g.highScore;
        Object.assign(g, makeFreshGame(hs));
        return;
      }

      // Direction change — prevent 180° reversal
      if (e.code === "ArrowUp" && g.dir !== "down") g.nextDir = "up";
      else if (e.code === "ArrowDown" && g.dir !== "up") g.nextDir = "down";
      else if (e.code === "ArrowLeft" && g.dir !== "right") g.nextDir = "left";
      else if (e.code === "ArrowRight" && g.dir !== "left") g.nextDir = "right";
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-3 p-4 select-none cursor-pointer"
      onClick={handleStart}
      onTouchStart={(e) => {
        e.preventDefault();
        handleStart();
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
        ← ↑ → ↓ TO MOVE · CLICK OR TAP TO START / RESTART
      </p>
    </div>
  );
}
