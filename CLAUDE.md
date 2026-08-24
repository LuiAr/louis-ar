# louis-ar - Portfolio Website

## Project Overview
Personal portfolio website with a 1984 Macintosh-inspired UI. Built with Next.js 15 (static export), Tailwind CSS v4, and Motion v12. Deployed to GitHub Pages and served at `https://louisarbey.eu`.

## Stack
- **Next.js 15** - App Router, TypeScript, `output: "export"` for static GitHub Pages
- **Tailwind CSS v4** - CSS-first config via `@theme {}` in `globals.css`, no `tailwind.config.js`
- **Motion v12** - import from `motion/react`, never `framer-motion`
- **clsx + tailwind-merge** - via `src/lib/cn.ts`

## Key Config
- No `basePath` in `next.config.ts`. The site is served from the custom domain root (`louisarbey.eu`), not the `/louis-ar` sub-path, so asset paths are plain absolute paths like `/profile.jpeg`. Do not reintroduce `basePath` unless the custom domain goes away.
- All design tokens live in `src/app/globals.css` inside `@theme {}`
- Font: Space Mono via `next/font/google` (variable: `--font-space-mono`)

## Architecture
- `src/components/ui/` - MacWindow, TitleBar, MenuBar (core primitives)
- `src/components/sections/` - one file per page section
- `src/components/animations/` - FadeInWhenVisible, StaggerChildren, TiltCard
- `src/hooks/` - useTypewriter, useBootSequence, usePrefersReducedMotion
- `src/data/` - projects.ts, experience.ts (edit these to update content)
- `src/types/` - TypeScript interfaces for Project and ExperienceEntry

## Rules
- All interactive components need `"use client"` at the top
- `layout.tsx` and `page.tsx` stay as Server Components
- `HeroSection` must be dynamically imported via `DynamicHero` (`ssr: false`) to avoid hydration mismatch with the JS clock and boot sequence
- No border-radius anywhere (classic Mac had square corners)
- Hard drop shadows only: `3px 3px 0px var(--color-ink)`, no blur
- Hover = full invert (`mac-invert-hover` class), no rounded states
- All animations must respect `usePrefersReducedMotion`
- **NEVER use em dashes anywhere.** Not in site copy, not in JSX strings, not in code comments, not in this file, not in commit messages or PR descriptions. Use a colon, a comma, parentheses, or restructure the sentence. For UI separators use `·`, for date ranges use `→`, for list bullets use `•`, for empty table cells use `-`.

## Design Tokens (key colors)
- `--color-cream: #f5f0e8` - page background
- `--color-ink: #1a1611` - borders, text, shadows
- `--color-ink-muted: #7a7267` - captions, labels
- `--color-cream-dark: #ede8df` - alternating rows, inactive states
- `--color-window-bg: #ffffff` - inside windows

## Deployment
Push to `main` → GitHub Actions builds → deploys to `gh-pages` branch → served at `https://louisarbey.eu`.
GitHub Pages must be set to serve from `gh-pages` branch, `/ (root)`.
The custom domain is set by the `cname: louisarbey.eu` input in `.github/workflows/deploy.yml`, which writes the CNAME file into `out/` on every deploy.

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
  - Dock is scrollable (overflow-x-auto) with flex-shrink-0 on buttons - handles many apps gracefully
  - Window positions and sizes persisted to localStorage (key: `louis-ar-windows`); restored on reload
- **Phase 5: Pluggable App System**
  - `src/data/apps.tsx` - central `AppConfig` registry (id, title, icon, content component, defaults)
  - Desktop, dock, and menus are fully driven by the registry - no hardcoded window lists
  - `MenuAction` uses template literal type `open-${string}` for extensibility
  - Adding a new app = one entry in `APPS` array + icon + content component, nothing else to touch

### 🚧 In Progress

### 📋 Roadmap

#### Phase 6: New Apps
- [x] **Snake Game** - Classic snake as a draggable window app (`src/components/sections/SnakeGame.tsx`; registered in `src/data/apps.tsx` as `Snake.app`)
  - 28×15 checker-grid canvas, direction-aware head eyes, pulsing pixel-art apple, speed scaling every 3 apples, high score tracking, idle/playing/dead states
- [x] **Terminal** - Fake terminal with fun easter eggs (`src/components/sections/Terminal.tsx`; registered in `src/data/apps.tsx`)
- [~] **Photo Viewer** - built, then removed in Phase 17 (2026-08-24)

#### Phase 7: New Apps
- [~] **MacPaint** - built, then removed in Phase 17 (2026-08-24)

#### Phase 8: New Apps
- [~] **Music Player** - built, then removed in Phase 17 (2026-08-24)

#### Phase 9: New Apps
- [x] **Clock** - Live analog + digital clock in a small window, classic Mac font, ticking second hand drawn with SVG rects (`src/components/sections/Clock.tsx`; registered in `src/data/apps.tsx`)
  - 200×200 SVG analog face with hour/minute tick marks, three rotated-rect hands
  - Hard-shadow frame, cream/ink color scheme matching classic Mac aesthetic
  - Digital HH:MM:SS display with AM/PM, day-of-week, and full date below
  - Second hand ticks every 1 s via setInterval, all time via useState

#### Phase 10: New Apps
- [x] **Sticky Notes** - Multi-note text editor with tabs, title editing, word/char count, persisted to localStorage (`src/components/sections/StickyNote.tsx`; registered in `src/data/apps.tsx`)
  - Up to 6 notes with tab navigation, double-click-to-rename titles
  - Warm yellow (`#faf6e0`) background to feel like a real sticky note
  - New/Delete toolbar, word count + char count status bar
  - Hydration-safe: loads from localStorage on mount, auto-saves on every keystroke

#### Phase 11: Maintenance pass (2026-04-29)
- [x] **Code quality & accessibility audit** - 6 files fixed:
  - `MenuBar.tsx`: `ALL_MENU_IDS` added to keyboard nav `useEffect` deps
  - `MacPaint.tsx`: image `onload` guarded with `cancelled` flag to prevent post-unmount draw
  - `MusicPlayer.tsx`: progress bar `div` → `<button role="slider">` with `aria-valuenow/min/max`
  - `PhotoViewer.tsx`: single-photo back-click `div` → `<button aria-label>`
  - `StickyNote.tsx`: title rename span gets `role="button"`, `tabIndex`, `Enter`/`Space` handler
  - `ExperienceSection.tsx`: expandable rows get `role="button"`, `tabIndex`, `aria-expanded`, keyboard handler

#### Phase 11b: Maintenance pass (2026-05-01)
- [x] **Bug fixes & code hardening** - 3 files fixed:
  - `SnakeGame.tsx`: global arrow-key handler now skips `e.preventDefault()` when an `INPUT` or `TEXTAREA` is focused - was silently breaking cursor movement in StickyNote and Terminal while the snake window was open
  - `MacPaint.tsx`: replaced `getContext("2d")!` non-null assertion in `blit` callback with an explicit null check
  - `Desktop.tsx`: added explicit `typeof window === "undefined"` guard to `loadLayout`; added explanatory comment to `eslint-disable-next-line` suppression on the keyboard shortcut effect

#### Phase 11c: Maintenance pass (2026-05-03)
- [x] **Timer leak, null-assertion cleanup, modal a11y** - 3 files fixed:
  - `useBootSequence.ts`: `revealTimer` was scoped inside the `bootTimer` callback making `clearTimeout(revealTimer)` unreachable on unmount; moved declaration to outer scope so cleanup clears both timers
  - `MacPaint.tsx`: replaced remaining four `getContext("2d")!` non-null assertions and one `canvasRef.current!` with explicit null guards (`if (!ox) return` / `if (!c) return { x:0, y:0 }`)
  - `Desktop.tsx`: `AboutModal` now installs a `keydown` listener on mount that calls `onClose()` on Escape - dialog was previously keyboard-inaccessible

#### Phase 12: New Apps (2026-05-02)
- [x] **Calculator** - Retro 4-function calculator app with classic Mac button grid, expression display, keyboard support (`src/components/sections/Calculator.tsx`; registered in `src/data/apps.tsx`)
  - `useReducer`-based state machine: digit input, operator chaining, equals, C/±/% functions
  - Keyboard support: 0–9, + − * /, Enter/=, Esc/C, Backspace, %
  - Pending-op indicator on display (shows stored value + operator while entering second operand)
  - Active operator button label shown in brackets `[÷]` when that op is pending
  - Hard-shadow retro button grid; op buttons use ink/cream invert; fn buttons use cream-dark

#### Phase 12 Remaining:
- [x] **System Preferences** - Fake settings app: desktop background pattern selector (4 options: Crosshatch, Dense, Dots, Solid), click-sound toggle (Web Audio API square-wave beep), Restore Defaults button; settings persisted to localStorage and broadcast via CustomEvent so Desktop responds live (`src/components/sections/SystemPreferences.tsx`; `src/hooks/usePrefs.ts`; registered in `src/data/apps.tsx`)
  - `usePrefs` hook: reads/writes `louis-ar-prefs` key, fires `prefs-change` custom event for live updates
  - `Desktop.tsx`: imports `usePrefs`; dynamically applies one of four desktop CSS classes; plays Web Audio beep on `window click` when sounds are enabled
  - `MusicPlayer.tsx`: fixed pre-existing `MouseEvent<HTMLDivElement>` → `MouseEvent<HTMLButtonElement>` type error on progress-bar handler
- [x] **Finder** - File-browser style window showing the repo structure as a classic Mac list view with disclosure triangles (`src/components/sections/Finder.tsx`; registered in `src/data/apps.tsx`)
  - Static `REPO_TREE` data with accurate file sizes for all real project files
  - Folder/document/application/image/config file kinds with pixel-art SVG silhouette icons
  - Click to select, double-click or disclosure triangle (▶/▼) to expand/collapse folders
  - Column headers: Name, Kind, Size; alternating row backgrounds
  - Status bar shows selected item info or total visible item count
  - All icons use `currentColor` only - auto-inverts correctly on selected (dark) rows

#### Phase 13b: Maintenance pass (2026-05-05)
- [x] **Bug fixes & accessibility hardening** - 3 files fixed:
  - `DinoGame.tsx`: global Space/ArrowUp handler now skips `e.preventDefault()` when an `INPUT` or `TEXTAREA` is focused - same Phase 11b fix applied to SnakeGame, DinoGame had the identical oversight and was silently breaking cursor movement/typing in StickyNote and Terminal while the DinoGame window was open
  - `MusicPlayer.tsx`: tracklist items converted from `<div onClick>` to `<button>` elements with `aria-label` and `aria-pressed` - were not keyboard-navigable or announced to screen readers
  - `Desktop.tsx`: added optional-chaining null guard (`states[a.id]?.isOpen`) in both `closeWindow` and `toggleMinimize` - prevents a crash if APPS ever contains an entry whose ID is absent from the live state (possible after adding a new app while the user has stale localStorage data)

#### Phase 13c: Maintenance pass (2026-05-07)
- [x] **Optional-chaining hardening & Finder keyboard accessibility** - 2 files fixed:
  - `Desktop.tsx`: extended optional-chaining guards to all remaining direct `states[id]` accesses - `toggleMinimize` (`states[id]?.isMinimized ?? false`), `openOrFocus` (early-return null guard), `showWindow` (early-return null guard), Backquote keyboard shortcut filter (`states[a.id]?.isOpen`), and `checkedActions` filter (`states[a.id]?.isOpen`) - makes the code robust against any future APPS/state sync edge cases
  - `Finder.tsx`: file list rows promoted to `role="option"` with `aria-selected`, `tabIndex={0}`, and `onKeyDown` handler (Enter/Space to select, ArrowRight to expand folder, ArrowLeft to collapse) inside a `role="listbox"` container - rows were previously click-only and invisible to keyboard users and screen readers

#### Phase 13: Mobile Version (Option A - Mobile-native layout)

Goal: render a completely different, touch-friendly UI when the user opens the site on a phone, while sharing all the same content data and design tokens.

**Detection strategy**
- [x] `src/hooks/useIsMobile.ts` - hook that returns `true` when `window.innerWidth < 768`; `false` on SSR
- [x] `src/app/page.tsx` - dynamically imports `<MobileApp />` via `ssr: false`; swaps based on hook

**`src/components/mobile/MobileApp.tsx`** - root shell (`"use client"`) ✅
- [x] Full-height scrollable page, `bg-[var(--color-cream)]`
- [x] Sticky top bar with site title and inline nav links (About / Projects / Experience / Contact)
- [x] Shows About, Projects, Experience, Contact sections reusing desktop components

**`src/components/mobile/MobileSection.tsx`** - reusable card wrapper ✅
- [x] Mac-window chrome: title bar stripe at top, ink border, hard shadow

**Per-section mobile views** - remaining (desktop components reused for now)
- [ ] `src/components/mobile/sections/MobileTerminal.tsx` - read-only boot log with fun facts; no interactive input
- [ ] `src/components/mobile/sections/MobileSnake.tsx` - playable Snake with on-screen D-pad

**Rules that still apply on mobile**
- No border-radius
- Hard drop shadows only
- Space Mono font, cream/ink palette

#### Phase 14: Content refresh (2026-08-24)
- [x] **Role change from thesis to Redfield** - Hello.txt and ReadMe.txt now lead with the current Data Scientist role at Redfield in Stockholm (AI consulting for large-scale companies and government institutions); the thesis moved to past tense. `AI Consultant` added to the `ROLES` typewriter list.
- [x] **RISE x Husqvarna thesis experience entry** (`src/data/experience.ts`, id `rise-husqvarna`, Jan 2026 to Jun 2026) sits between Redfield and Adone, with four bullets on the VLM/SLM pipeline and a clickable "Read the thesis" button
  - `ExperienceType` gained `"thesis"`; `ExperienceEntry` gained an optional `links: ExperienceLink[]` array, rendered as hard-shadow buttons inside the expanded row (`ExperienceSection.tsx`)
- [x] **Redfield entry** switched to `full-time`, description and bullets widened to cover both large-scale companies and government institutions
- [x] **Projects**: thesis card reads `✓ Completed 2026` via a new `"completed"` value on `ProjectStatus`; the self-referential "Link" button is gone from the Portfolio Website card (GitHub only)
- [x] **Contact** copy softened from "Open to new opportunities" to a conversation invite
- [x] **Metadata**: tab title `Louis Arbey`, description reflects the current role
- [x] **No em dashes** rule added to Rules above; every existing em dash swept out of `src/` and this file

#### Phase 15: Terminal rewrite (2026-08-24)
- [x] **Real-terminal behaviour** in `src/components/sections/Terminal.tsx` (was a flat lookup table of canned strings, now a small shell)
  - **Virtual filesystem**: `HOME` tree with `Documents/`, `Projects/`, `Photos/`, plus `ReadMe.txt`, `hello_world.cpp`, `secret_plans.txt` and two dotfiles (`.zshrc`, `.hidden_joke`) only visible under `ls -a`
  - **Tab completion**: commands on the first token, paths after it. One candidate completes and appends `/` or a space; several extend to the longest common prefix, then list on the next Tab. Works mid-line.
  - **History**: Up/Down walk real command history and restore the in-progress draft at the bottom; `history` and `history -c`
  - **Line editing**: Ctrl+A/E (start/end), Ctrl+U/K (kill to start/end), Ctrl+W (delete word), Ctrl+C (abandon line, echoes `^C`), Ctrl+L (clear), Ctrl+D (delete char, or logout on an empty line)
  - **Block cursor** drawn from state at the real caret position, over a hidden but real `<input>` (kept as an `<input>` so the SnakeGame/DinoGame global key handlers still leave typing alone). Blink restarts on every edit so the cursor is solid while typing.
  - **Commands**: `ls -a -l`, `cd`, `pwd`, `cat`, `tree -a`, `echo` (expands `$USER`, `$HOME`, `$PWD`, `$SHELL`), `which`, `man`, `whoami`, `date`, `uname -a`, `uptime`, `neofetch`, `history`, `clear`, `open`, `exit`, plus the `sudo`/`matrix`/`42` easter eggs and the existing `set-default`/`get-default` layout tools
  - **Quoted arguments**: a small tokenizer handles `cat "some file"`
  - **Window manager bridge** (`Desktop.tsx`): `__louisArOpenApp`, `__louisArCloseApp`, `__louisArListApps` let `open snake` actually open Snake.app and `exit` actually close the terminal window
  - Output is selectable now, so `focusTerminal` skips refocusing while a selection is live
- [x] **React correctness**: `nextId.current++` no longer runs inside a `setLines` updater (it dropped a boot line under React's double-invoked updaters); the boot banner is driven by a `bootLine` state counter with deterministic ids

#### Phase 16: Close All button (2026-08-24)
- [x] **Close All** control in `Desktop.tsx`, centered horizontally just above the dock (was bottom-right until Phase 19)
  - Only rendered while at least one window is open; label carries a live count, e.g. `✕ Close All (4)`
  - `openWindowCount` counts every open window plus the Games folder; minimized windows still count (they are open, just parked in the dock)
  - `handleQuit` renamed to `closeAllWindows` and now also closes the Games folder window, so Cmd+Q and the Apple menu Quit clear the desktop completely rather than leaving the folder behind
  - Styled with the existing `mac-button` + `mac-invert-hover` idiom: 1px ink border, hard shadow, no radius, full invert on hover

#### Phase 17: Removed Jukebox, MacPaint and Photos (2026-08-24)
- [x] **Three apps deleted**: `MusicPlayer.tsx` (Jukebox), `MacPaint.tsx` and `PhotoViewer.tsx` are gone, along with their `MusicIcon`, `MacPaintIcon` and `PhotoIcon` components and their `music`, `macpaint` and `photos` entries in `src/data/apps.tsx`
  - The registry drives the desktop, dock, menus and the terminal's `open` command, so no call sites needed touching
  - `Finder.tsx`: the three files dropped from the `REPO_TREE` listing so the fake filesystem still matches the real one
  - `Desktop.tsx`: `getInitialActiveId` now validates saved ids against `APPS` before using them, so a stored default layout naming a removed app no longer leaves the desktop with an active window that does not exist
  - The terminal's virtual `Photos/` folder is filesystem content rather than the app, so it stays

#### Phase 18: CI runtime bump for the Node 20 deprecation (2026-08-24)
- [x] **`.github/workflows/deploy.yml` moved off Node 20**: the runners now force JavaScript actions built for Node 20 onto Node 24, and Node 20 is removed from the runners entirely in September 2026
  - `actions/checkout@v4` → `actions/checkout@v7` and `actions/setup-node@v4` → `actions/setup-node@v7`; every major from v5 onward declares `using: node24`, so the forced-runtime warning is gone
  - Build `node-version` bumped from `"20"` (end of life since April 2026) to `"24"`, the current Active LTS
  - Verified locally on Node 24.19.0: clean `npm install` plus `npm run build` produces the same five static routes with no new lint or type errors
  - `opencode.yml` needed no change (already on `actions/checkout@v6`), and `peaceiris/actions-gh-pages@v4` was retagged to `node24` in v4.1.0, so the deploy step is clear too
  - None of the breaking changes in those majors apply here: checkout v7 only blocks fork-PR checkouts under `pull_request_target`/`workflow_run` (this workflow runs on `push`), setup-node v6 narrows automatic caching to npm (`cache: "npm"` is set explicitly) and v7 drops the dummy `NODE_AUTH_TOKEN` export (unused)

#### Phase 19: Close All centered above the dock (2026-08-24)
- [x] **Close All moved from the bottom-right corner to the horizontal center** of the desktop, still sitting just above the dock (it became the third button of the control strip in Phase 20)
  - The button is now wrapped in a full-width `absolute bottom-2 left-0 right-0 flex justify-center` row rather than being positioned with `right-2`
  - The wrapper carries `pointer-events-none` and the button `pointer-events-auto`, so that full-width strip does not swallow clicks and window drags across the bottom of the desktop
  - Centering with a flex wrapper instead of `left-1/2 -translate-x-1/2` keeps the button's own `transform` free for the `mac-button` hover lift and active press
  - Verified in a headless Chromium run at 1280x800: button center lands exactly on the viewport center, and `elementFromPoint` in the button's row well to its left still returns the desktop, not the wrapper

#### Phase 20: Desktop control strip (2026-08-24)
- [x] **The lone Close All button became a three-button control strip** above the dock: `▤ Tidy Windows` · `↺ Reset Layout` · `✕ Close All (n)`
  - `StripButton` local component in `Desktop.tsx` carries the shared `mac-button` + `mac-invert-hover` styling, the icon slot and the disabled treatment
  - Disabled buttons are greyed with `text-[var(--color-ink-muted)]` and the `disabled` attribute, matching how `MenuBar` greys out unavailable items, plus `pointer-events-none` so the `mac-button` hover lift cannot fire on a button that does nothing
  - The strip renders unconditionally now (it used to appear only with a window open), because `Reset Layout` is exactly what you want on an empty desktop. `Tidy Windows` disables at `visibleWindowCount === 0` and `Close All` at `openWindowCount === 0`
  - `role="toolbar"` with an `aria-label` on the wrapper
- [x] **`Tidy Windows`**: cascades every visible window down and right from the top-left of the desktop, classic "Clean Up" style
  - Sorted by `zIndex` ascending so the window drawn on top lands deepest in the cascade, which is what makes a cascade read correctly
  - Sizes are left as the user set them and only clamped when a window cannot fit the desktop at all; the cascade restarts at the top-left once the next slot would push a window off the edge, so any number of windows stays on screen
  - `TIDY_BOTTOM_GAP` keeps a tidied window clear of the control strip itself
  - The Games folder is a real window but is not in `APPS`, so it is tracked under a `GAMES_FOLDER_ID` key and slotted into the cascade at its own `gamesZ` depth
  - Tidied positions are written through to `layoutRef` and `localStorage`, so a tidy survives a reload
- [x] **`Reset Layout`**: forgets both `louis-ar-windows-v6` and `louis-ar-default-setup-v1`, returns every window to its registry defaults, and puts the desktop back to just the `initiallyOpen` windows
  - Named `Reset Layout` rather than `Restore Defaults` so it does not collide with the existing `Restore Defaults` button in System Preferences, which resets a different thing (the desktop pattern and click sounds)
  - Clears `layoutRef`, resets `topZ`, and clears `defaultSetup` state, so a saved terminal `set-default` layout stops applying immediately rather than on the next reload
- [x] **`DraggableWindow` gained an optional `layoutNonce` prop** (`src/components/ui/DraggableWindow.tsx`)
  - A mounted window owns its position (Motion values) and its size (local state), so the parent could not move it by changing props alone. Bumping the nonce is the signal to re-read `defaultPosition`/`defaultWidth`/`defaultHeight` and to drop the zoomed state
  - Guarded with a `hasMounted` ref so mount does not re-apply what is already the initial value, and deliberately keyed on the nonce alone: a change in the `default*` props on its own must never yank a window out from under the user
  - `Desktop.tsx` holds the pushed layout in `overrideLayout`, which takes precedence over `defaultSetup?.layout` and then `storedLayout`
- [x] **Verified end to end in headless Chromium at 1280x800**: dragged a window off-position, tidied (windows landed at desktop-relative 16,16 / 42,42 / 68,68 / 94,94, a clean 26px step, front-most deepest), reset (layout matched the load-time geometry exactly and both localStorage keys were gone), closed all (Tidy and Close All greyed, Reset still live), reset again from the empty desktop (all four default windows back). Both new glyphs render in Space Mono rather than falling back to tofu, and `elementFromPoint` beside the strip still returns the desktop

---

## Session End Routine
At the end of every task, Claude must always:
1. **List current TODO status** - show each roadmap item and whether it is ✅ done, 🚧 in progress, or 📋 planned
2. **List Top 3 new ideas** - suggest three concrete, on-brand features that could be added next, with a one-sentence rationale each

---

## Next Actions
Add new apps via the pluggable registry in `src/data/apps.tsx`

## Top 3 Ideas (2026-08-24)
1. **Tidy Windows and Reset Layout in the Window menu** - The control strip has them, and the classic Mac put "Clean Up Window" in a menu; wiring both into `MENUS` plus the `MenuAction` union would make them keyboard reachable and discoverable without hunting for the strip.
2. **MobileTerminal + MobileSnake** (`src/components/mobile/sections/`) - The two remaining Phase 13 mobile pieces, and the only place where mobile still borrows desktop components wholesale instead of getting a touch-native view.
3. **Terminal pipes and aliases** - The shell already has a virtual filesystem and a quote-aware tokenizer, so `grep`, `wc`, `head` and a single `|` are a short hop, and sourcing `.zshrc` for `alias` would finally give that dotfile a purpose.
