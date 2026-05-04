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

#### Phase 10: New Apps
- [x] **Sticky Notes** — Multi-note text editor with tabs, title editing, word/char count, persisted to localStorage (`src/components/sections/StickyNote.tsx`; registered in `src/data/apps.tsx`)
  - Up to 6 notes with tab navigation, double-click-to-rename titles
  - Warm yellow (`#faf6e0`) background to feel like a real sticky note
  - New/Delete toolbar, word count + char count status bar
  - Hydration-safe: loads from localStorage on mount, auto-saves on every keystroke

#### Phase 11: Maintenance pass (2026-04-29)
- [x] **Code quality & accessibility audit** — 6 files fixed:
  - `MenuBar.tsx`: `ALL_MENU_IDS` added to keyboard nav `useEffect` deps
  - `MacPaint.tsx`: image `onload` guarded with `cancelled` flag to prevent post-unmount draw
  - `MusicPlayer.tsx`: progress bar `div` → `<button role="slider">` with `aria-valuenow/min/max`
  - `PhotoViewer.tsx`: single-photo back-click `div` → `<button aria-label>`
  - `StickyNote.tsx`: title rename span gets `role="button"`, `tabIndex`, `Enter`/`Space` handler
  - `ExperienceSection.tsx`: expandable rows get `role="button"`, `tabIndex`, `aria-expanded`, keyboard handler

#### Phase 11b: Maintenance pass (2026-05-01)
- [x] **Bug fixes & code hardening** — 3 files fixed:
  - `SnakeGame.tsx`: global arrow-key handler now skips `e.preventDefault()` when an `INPUT` or `TEXTAREA` is focused — was silently breaking cursor movement in StickyNote and Terminal while the snake window was open
  - `MacPaint.tsx`: replaced `getContext("2d")!` non-null assertion in `blit` callback with an explicit null check
  - `Desktop.tsx`: added explicit `typeof window === "undefined"` guard to `loadLayout`; added explanatory comment to `eslint-disable-next-line` suppression on the keyboard shortcut effect

#### Phase 11c: Maintenance pass (2026-05-03)
- [x] **Timer leak, null-assertion cleanup, modal a11y** — 3 files fixed:
  - `useBootSequence.ts`: `revealTimer` was scoped inside the `bootTimer` callback making `clearTimeout(revealTimer)` unreachable on unmount; moved declaration to outer scope so cleanup clears both timers
  - `MacPaint.tsx`: replaced remaining four `getContext("2d")!` non-null assertions and one `canvasRef.current!` with explicit null guards (`if (!ox) return` / `if (!c) return { x:0, y:0 }`)
  - `Desktop.tsx`: `AboutModal` now installs a `keydown` listener on mount that calls `onClose()` on Escape — dialog was previously keyboard-inaccessible

#### Phase 12: New Apps (2026-05-02)
- [x] **Calculator** — Retro 4-function calculator app with classic Mac button grid, expression display, keyboard support (`src/components/sections/Calculator.tsx`; registered in `src/data/apps.tsx`)
  - `useReducer`-based state machine: digit input, operator chaining, equals, C/±/% functions
  - Keyboard support: 0–9, + − * /, Enter/=, Esc/C, Backspace, %
  - Pending-op indicator on display (shows stored value + operator while entering second operand)
  - Active operator button label shown in brackets `[÷]` when that op is pending
  - Hard-shadow retro button grid; op buttons use ink/cream invert; fn buttons use cream-dark

#### Phase 12 Remaining:
- [x] **System Preferences** — Fake settings app: desktop background pattern selector (4 options: Crosshatch, Dense, Dots, Solid), click-sound toggle (Web Audio API square-wave beep), Restore Defaults button; settings persisted to localStorage and broadcast via CustomEvent so Desktop responds live (`src/components/sections/SystemPreferences.tsx`; `src/hooks/usePrefs.ts`; registered in `src/data/apps.tsx`)
  - `usePrefs` hook: reads/writes `louis-ar-prefs` key, fires `prefs-change` custom event for live updates
  - `Desktop.tsx`: imports `usePrefs`; dynamically applies one of four desktop CSS classes; plays Web Audio beep on `window click` when sounds are enabled
  - `MusicPlayer.tsx`: fixed pre-existing `MouseEvent<HTMLDivElement>` → `MouseEvent<HTMLButtonElement>` type error on progress-bar handler
- [ ] **Finder** — File-browser style window showing the repo structure as a classic Mac list view with disclosure triangles (`src/components/sections/Finder.tsx`)

#### Phase 13: Mobile Version (Option A — Mobile-native layout)

Goal: render a completely different, touch-friendly UI when the user opens the site on a phone, while sharing all the same content data and design tokens.

**Detection strategy**
- [ ] Add `src/hooks/useIsMobile.ts` — a `"use client"` hook that returns `true` when `window.innerWidth < 768`. Uses `useState` + `useEffect` with a `resize` listener. Returns `false` on SSR (so the desktop shell is the SSR default; mobile swaps in on hydration).
- [ ] In `src/app/page.tsx`, dynamically import a `<MobileApp />` wrapper (same `ssr: false` pattern as `DynamicHero`) and swap between `<DesktopApp />` and `<MobileApp />` based on the hook.

**`src/components/mobile/MobileApp.tsx`** — root shell (`"use client"`)
- [ ] Full-height scrollable page, `bg-[var(--color-cream)]`, `font-[var(--font-space-mono)]`
- [ ] Sticky top bar: site title left, a hamburger/menu icon right (opens a slide-down nav)
- [ ] Slide-down nav lists all app names from the `APPS` registry; tapping one scrolls to that section
- [ ] No dock, no menubar, no dragging

**`src/components/mobile/MobileSection.tsx`** — reusable card wrapper
- [ ] Cream background, `border-2 border-[var(--color-ink)]`, hard shadow `3px 3px 0 var(--color-ink)`
- [ ] Title bar strip at top (same stripe pattern as `MacWindow`), app name left-aligned
- [ ] Content slot below — each section renders its own simplified content

**Per-section mobile views** (each a thin adapter over existing data, no new data files needed)
- [ ] `src/components/mobile/sections/MobileAbout.tsx` — profile image + bio text, skills as inline tags
- [ ] `src/components/mobile/sections/MobileProjects.tsx` — vertical list of project cards from `projects.ts`; each card: title, tech stack pills, description, links
- [ ] `src/components/mobile/sections/MobileExperience.tsx` — accordion list from `experience.ts`; tap to expand role details
- [ ] `src/components/mobile/sections/MobileContact.tsx` — stacked link buttons (GitHub, email, LinkedIn) with full-invert hover
- [ ] `src/components/mobile/sections/MobileTerminal.tsx` — read-only scrollable output of a pre-baked "boot log" showing fun facts; no interactive input (keeps the terminal easter-egg vibe without a keyboard)
- [ ] `src/components/mobile/sections/MobileSnake.tsx` — fully playable Snake with on-screen D-pad (four arrow buttons arranged in a cross); reuses the same game logic, swaps keyboard events for button taps

**Animations**
- [ ] Reuse `FadeInWhenVisible` for section entrance animations
- [ ] All animations respect `usePrefersReducedMotion` (already exists)

**Rules that still apply on mobile**
- No border-radius
- Hard drop shadows only
- Hover = full invert (becomes tap highlight on mobile via `active:` variant)
- Space Mono font, cream/ink palette

**Files to create**
```
src/hooks/useIsMobile.ts
src/components/mobile/MobileApp.tsx
src/components/mobile/MobileSection.tsx
src/components/mobile/sections/MobileAbout.tsx
src/components/mobile/sections/MobileProjects.tsx
src/components/mobile/sections/MobileExperience.tsx
src/components/mobile/sections/MobileContact.tsx
src/components/mobile/sections/MobileTerminal.tsx
src/components/mobile/sections/MobileSnake.tsx
```

**Files to modify**
```
src/app/page.tsx  — add useIsMobile swap + dynamic import of MobileApp
```

---

## Session End Routine
At the end of every task, Claude must always:
1. **List current TODO status** — show each roadmap item and whether it is ✅ done, 🚧 in progress, or 📋 planned
2. **List Top 3 new ideas** — suggest three concrete, on-brand features that could be added next, with a one-sentence rationale each

---

## Next Actions
Add new apps via the pluggable registry in `src/data/apps.tsx`

## Top 3 Ideas (2026-05-04)
1. **Mobile layout** (`src/components/mobile/`) — The most impactful reach improvement: Phase 13 is fully spec'd in CLAUDE.md and would unlock the entire portfolio for phone visitors who currently see a desktop-only experience.
2. **Finder** (`src/components/sections/Finder.tsx`) — A file-browser window rendering the repo file tree as a classic Mac list view with indented disclosure triangles; purely static data so zero runtime cost, but gives the portfolio a strong "OS authenticity" boost.
3. **System-wide Theming in System Preferences** — Extend `usePrefs` with a `colorTheme` option (Classic, Dark Mode, High Contrast) that swaps the CSS custom-property values at runtime; all components automatically recolor with zero per-component changes.