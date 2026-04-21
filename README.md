# louis-ar — Personal Portfolio

Personal portfolio website with a 1984 Macintosh-inspired UI.

Live at: **https://luiar.github.io/louis-ar**

## Stack

- **Next.js 15** — App Router, TypeScript, static export
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js`
- **Motion v12** — animations with reduced motion support
- **Deployed** to GitHub Pages via GitHub Actions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> `basePath` is only applied in production builds — locally the site runs at `/` so no sub-path needed.

To preview the production static export locally:

```bash
npm run build          # generates /out
npx serve out          # serve at http://localhost:3000
```

## Project Structure

```
src/
├── app/              # Next.js app router (layout, page, globals.css)
├── components/
│   ├── ui/           # Core Mac UI primitives (MacWindow, TitleBar, MenuBar)
│   ├── sections/     # Page sections (Hero, About, Projects, Experience, Contact)
│   └── animations/   # Animation wrappers (FadeInWhenVisible, StaggerChildren, TiltCard)
├── data/             # Content — edit these to update the site
│   ├── projects.ts
│   └── experience.ts
├── hooks/            # useTypewriter, useBootSequence, usePrefersReducedMotion
├── lib/              # cn() utility (clsx + tailwind-merge)
└── types/            # TypeScript interfaces
```

## Updating Content

| What | Where |
|------|-------|
| Projects | `src/data/projects.ts` |
| Work experience | `src/data/experience.ts` |
| Bio & skills | `src/components/sections/AboutSection.tsx` |
| Contact links | `src/components/sections/ContactSection.tsx` |

## Design Rules

The UI mimics the classic 1984 Mac aesthetic:

- No border-radius — square corners everywhere
- Hard drop shadows only: `3px 3px 0px #1a1611`, no blur
- Hover state = full color invert
- Font: Space Mono

## Build & Deploy

```bash
npm run build   # produces /out static export
```

Push to `main` → GitHub Actions builds and deploys to the `gh-pages` branch automatically.
