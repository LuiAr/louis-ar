# louis-ar — Portfolio Website

## Project Overview
Personal portfolio website with a 1984 Macintosh-inspired UI. Built with Next.js 15 (static export), Tailwind CSS v4, and Motion v12. Deployed to GitHub Pages at `https://luiar.github.io/louis-ar`.

## Stack
- **Next.js 15** — App Router, TypeScript, `output: "export"` for static GitHub Pages
- **Tailwind CSS v4** — CSS-first config via `@theme {}` in `globals.css`, no `tailwind.config.js`
- **Motion v12** — import from `motion/react`, never `framer-motion`
- **clsx + tailwind-merge** — via `src/lib/cn.ts`

## Key Config
- `basePath: "/louis-ar"` in `next.config.ts` — required for GitHub Pages sub-path
- All design tokens live in `src/app/globals.css` inside `@theme {}`
- Font: Space Mono via `next/font/google` (variable: `--font-space-mono`)

## Architecture
- `src/components/ui/` — MacWindow, TitleBar, MenuBar (core primitives)
- `src/components/sections/` — one file per page section
- `src/components/animations/` — FadeInWhenVisible, StaggerChildren, TiltCard
- `src/hooks/` — useTypewriter, useBootSequence, usePrefersReducedMotion
- `src/data/` — projects.ts, experience.ts (edit these to update content)
- `src/types/` — TypeScript interfaces for Project and ExperienceEntry

## Rules
- All interactive components need `"use client"` at the top
- `layout.tsx` and `page.tsx` stay as Server Components
- `HeroSection` must be dynamically imported via `DynamicHero` (`ssr: false`) to avoid hydration mismatch with the JS clock and boot sequence
- No border-radius anywhere — classic Mac had square corners
- Hard drop shadows only: `3px 3px 0px var(--color-ink)`, no blur
- Hover = full invert (`mac-invert-hover` class), no rounded states
- All animations must respect `usePrefersReducedMotion`

## Design Tokens (key colors)
- `--color-cream: #f5f0e8` — page background
- `--color-ink: #1a1611` — borders, text, shadows
- `--color-ink-muted: #7a7267` — captions, labels
- `--color-cream-dark: #ede8df` — alternating rows, inactive states
- `--color-window-bg: #ffffff` — inside windows

## Deployment
Push to `main` → GitHub Actions builds → deploys to `gh-pages` branch → served at `https://luiar.github.io/louis-ar`.
GitHub Pages must be set to serve from `gh-pages` branch, `/ (root)`.

## Content Updates
- **Projects**: edit `src/data/projects.ts`
- **Experience**: edit `src/data/experience.ts`
- **Bio/skills**: edit `src/components/sections/AboutSection.tsx`
- **Contact links**: edit `src/components/sections/ContactSection.tsx`

---

## Current State & Roadmap

### ✅ Completed
- Fixed GitHub Pages image loading issue by setting `basePath: "/louis-ar"` and updating image paths
- Fixed profile image extension mismatch (`profile.jpg` → `profile.jpeg`)
- **Phase 1: MenuBar Functionality**
  - Pear logo icon with Apple menu dropdown (About, Quit)
  - All menus functional: File, Edit, View, Window, Help with macOS-style dropdowns
  - Hover-open behavior (once a menu is open, hovering others opens them)
  - Click-outside to dismiss
  - Keyboard shortcuts: Cmd+W (close), Cmd+M (minimize), Cmd+Q (quit)
  - About modal with classic Mac dialog style
- **Phase 2: Window Management**
  - Zoom button toggles window to full-desktop size (filled when zoomed)
  - Minimize-to-dock: minimized windows hidden from canvas, dock shows hollow dot vs filled dot
  - Dock click is three-state: closed→open, minimized→restore+focus, open→minimize
  - Menu open-* actions use showWindow (never closes/minimizes, restores if needed)
  - Cmd+` cycles through open non-minimized windows
  - Minimizing active window auto-focuses next available window

- **Phase 3: Polish**
  - Checkmarks in View/Window menus next to open windows
  - Fixed-width checkmark column keeps labels aligned
  - Close Window and Minimize dynamically disabled when no visible active window
  - Arrow key navigation through menus, Enter to activate, Escape to close, left/right to switch menus
- **Phase 4: Content & UX**
  - Window content is scrollable independently (flex-1 min-h-0 overflow-auto on content div)
  - Dock is scrollable (overflow-x-auto) with flex-shrink-0 on buttons — handles many apps gracefully
  - Window positions and sizes persisted to localStorage (key: `louis-ar-windows`); restored on reload
- **Phase 5: Pluggable App System**
  - `src/data/apps.tsx` — central `AppConfig` registry (id, title, icon, content component, defaults)
  - Desktop, dock, and menus are fully driven by the registry — no hardcoded window lists
  - `MenuAction` uses template literal type `open-${string}` for extensibility
  - Adding a new app = one entry in `APPS` array + icon + content component, nothing else to touch

### 🚧 In Progress

### 📋 Roadmap

#### Phase 6: New Apps
- [x] **Snake Game** — Classic snake as a draggable window app (`src/components/sections/SnakeGame.tsx`; registered in `src/data/apps.tsx` as `Snake.app`)
  - 28×15 checker-grid canvas, direction-aware head eyes, pulsing pixel-art apple, speed scaling every 3 apples, high score tracking, idle/playing/dead states
- [x] **Terminal** — Fake terminal with fun easter eggs (`src/components/sections/Terminal.tsx`; registered in `src/data/apps.tsx`)
- [x] **Photo Viewer** — Gallery of project screenshots or photos (`src/components/sections/PhotoViewer.tsx`; registered in `src/data/apps.tsx` as `Photos`)
  - Grid view with 6 pixel-art images (profile photo + 5 SVG artworks for projects/work)
  - Single-image lightbox mode with Prev/Next navigation
  - Classic Mac toolbar, status bar showing file metadata

#### Phase 7: New Apps
- [x] **MacPaint** — Pixel-art drawing canvas with pencil, eraser, fill-bucket, rect, and line tools; B&W only; canvas saves to localStorage (`src/components/sections/MacPaint.tsx`; registered in `src/data/apps.tsx`)
  - 400×268 canvas, offscreen canvas for persistent pixels, Bresenham line for smooth strokes
  - Flood-fill (bucket), rectangle and line with live preview via snapshot
  - Toolbar: tool selector, ink/paper color toggle, 1/2/4px brush sizes, NEW button
  - Status bar showing active tool, brush size, color, and cursor coordinates

#### Phase 8: New Apps
- [x] **Music Player** — Retro jukebox window: curated tracklist (no real audio needed), pixel-art album art, play/pause/skip controls, progress bar, looping playlist (`src/components/sections/MusicPlayer.tsx`; registered in `src/data/apps.tsx` as `Jukebox`)
  - 6 curated tracks with retro Mac-themed metadata
  - 6 unique pixel-art SVG album artworks per track
  - Play/Pause, Prev (restarts track if >3s elapsed), Next controls
  - Click-to-seek progress bar with elapsed/total time display
  - Tracklist with active-track highlight and live ♪ indicator
  - Auto-advances to next track on completion, loops back to start

#### Phase 9: New Apps
- [x] **Clock** — Live analog + digital clock in a small window, classic Mac font, ticking second hand drawn with SVG rects (`src/components/sections/Clock.tsx`; registered in `src/data/apps.tsx`)
  - 200×200 SVG analog face with hour/minute tick marks, three rotated-rect hands
  - Hard-shadow frame, cream/ink color scheme matching classic Mac aesthetic
  - Digital HH:MM:SS display with AM/PM, day-of-week, and full date below
  - Second hand ticks every 1 s via setInterval, all time via useState

#### Phase 10: Upcoming Ideas
- [ ] **System Preferences** — Fake settings app: switch desktop checker pattern, toggle UI sounds (classic Mac beep via Web Audio API), pick an accent dither pattern for windows (`src/components/sections/SystemPreferences.tsx`)
- [ ] **Sticky Notes** — One or more draggable sticky note windows where the user can type freeform text, persisted to localStorage (`src/components/sections/StickyNote.tsx`)

---

## Session End Routine
At the end of every task, Claude must always:
1. **List current TODO status** — show each roadmap item and whether it is ✅ done, 🚧 in progress, or 📋 planned
2. **List Top 3 new ideas** — suggest three concrete, on-brand features that could be added next, with a one-sentence rationale each

---

## Next Actions
Add new apps via the pluggable registry in `src/data/apps.tsx`