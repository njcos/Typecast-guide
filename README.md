# DEPT Typecast — Instruction Guide

A single-page React site documenting the Typecast After Effects CEP panel. Content ported verbatim from the original print guide; deployed to GitHub Pages.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build + dev server)
- **Tailwind CSS v3** — class-based dark mode (`darkMode: 'class'`)
- **GSAP** (`gsap` + `@gsap/react`) — scroll-triggered section animations and lava-lamp hero

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run Vitest once |

## Deploy

Pushed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

**Required repo setting:** GitHub → Settings → Pages → Source = **"GitHub Actions"**.

The Vite `base` option is set to `/Typecast-guide/` in `vite.config.ts` and must match the repository name. If you host at a different path or custom domain, update `base` there.

## Content source

All prose and UI mockup content was ported verbatim from `typecast-guide.html` in the `deptTool` repo. Demo slots are placeholders (`src/components/DemoSlot.tsx`) until real GIFs are added under `public/demos/`.

## Project layout

```
src/
  sections/       16 section components (one per guide chapter)
  components/     Shared UI — Section, SectionHeader, Callout, StepList,
                  KeyValueTable, StatCard, PanelMockup, RawHtml, DemoSlot,
                  Nav, Footer, SvgSprite, Pill
  hero/           Hero + LavaLamp (canvas blob animation)
  theme/          ThemeProvider + ThemeToggle (light/dark)
  lib/            gsap.ts, sections.ts, useScrollSpy.ts, usePinnedWalkthrough.ts
  styles.css      Tailwind directives + DEPT design tokens + lifted component CSS
  assets/
    sprite.svg    Inline SVG icon sprite
```

## Accessibility

- Respects `prefers-reduced-motion` — all GSAP scroll and hero animations are disabled when the user's OS motion preference is set to reduced.
- Skip-to-content link at the top of the document.
- Semantic landmarks (`<nav>`, `<main>`, `<footer>`, section headings).
