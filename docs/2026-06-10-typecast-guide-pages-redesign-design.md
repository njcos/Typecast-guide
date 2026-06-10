# Typecast guide — GitHub Pages web redesign (v2) — design

**Date:** 2026-06-10
**Status:** approved (brainstorming) → ready for plan
**Supersedes:** `2026-06-08-interactive-guide-redesign-design.md`. That spec kept the guide as a single self-contained, inlined HTML file (screen-only, sidebar nav, scrollspy). This v2 changes the **delivery and tooling**: a standalone React/Vite/Tailwind/GSAP site hosted on GitHub Pages. Chapter prose and information carry over verbatim; the document chrome and stack are reimagined.

## Problem

The current guide (`docs/GUIDE/typecast-guide.html`) is a ~3,450-line single HTML file with ~1,280 lines of print-oriented CSS: `pt`/`in` units, `@page`, `page-break-after`, `@font-face` with relative paths, and a `:root` token palette. The original ask — "add Tailwind and convert all CSS to Tailwind" — is awkward in that container: most of the CSS is print machinery that has no Tailwind equivalent and would degrade into arbitrary values, and a single self-contained file fights both Tailwind's build model and a richer interactive treatment.

Decision: stop forcing the conversion into one print file. Rebuild the guide as a proper web project — a **standalone repo**, hosted on **GitHub Pages**, that gives the content real structure (components, a config, a build) and room for a web-native redesign with animation.

## Decisions (from brainstorming)

- **Delivery:** new **separate repo** `dept-typecast-guide` (not a folder in `deptTool`). Cleanest isolation; simplest Pages setup.
- **Stack:** **React 19 + Vite + Tailwind v3 + GSAP** (`@gsap/react`), mirroring `deptTool`'s existing tooling and Tailwind token conventions.
- **Page model:** **one long scrolling page** (no client-side router → no SPA 404 concern on Pages). A **sticky table-of-contents nav** replaces print page-breaks.
- **Design:** **web-native redesign**, not a print port. Drop all print machinery (`@page`, `pt`/`in` → `rem`/`px`, page-breaks, page numbers, footers/runners).
- **Theme:** **light + dark toggle.** Light = faithful DEPT identity (`#EFECE8` paper, white surfaces, dark ink, `#FF4A00` orange). Dark = high-contrast canvas with the orange accent. Tailwind `dark:` variants + a persisted toggle.
- **Animation:** **showcase / playful** GSAP — pinned scroll sections, parallax, animated panel-mockup walkthroughs, `SplitText` headline effects, a scroll-progress indicator. `prefers-reduced-motion` fully respected (animations reduce to instant/opacity-only).
- **Brand:** Inter Tight, `#FF4A00` orange, DEPT mark, achromatic base — preserved across both themes.

## Stack & repo

- **Disk:** `/Users/nick.cosentino/Documents/Tools/typecastGuide`
- **Remote:** `https://github.com/njcos/Typecast-guide.git` (owner `njcos`, repo `Typecast-guide`)
- **Pages URL:** `https://njcos.github.io/Typecast-guide/`

```
typecastGuide/                  (new standalone git repo → njcos/Typecast-guide)
  index.html                    single entry
  package.json                  react 19, vite, tailwind ^3.4, @gsap/react, gsap
  vite.config.ts                base: '/Typecast-guide/'  (Pages subpath)
  tailwind.config.ts            DEPT tokens (HSL custom props), darkMode: 'class'
  postcss.config.js
  tsconfig.json
  src/
    main.tsx                    thin entry: createRoot(<App/>) only
    App.tsx                     shell: ThemeProvider, Nav/TOC, <main>, sections
    styles.css                  @tailwind base/components/utilities + @font-face
    theme.tsx                   light/dark context + localStorage persistence
    lib/
      gsap.ts                   gsap + ScrollTrigger/SplitText registration, reduced-motion guard
    components/                 reusable primitives (see Component model)
    sections/                   one file per chapter (see Information architecture)
    assets/fonts/               Inter Tight ttf (copied from deptTool BRANDING/Font)
  .github/workflows/deploy.yml  build → publish dist/ to Pages
  public/                       static assets (favicon, og image, GIF demo slots)
```

**Tailwind config** mirrors `deptTool`: HSL CSS custom properties consumed via `hsl(var(--token))`, plus `darkMode: 'class'`. Tokens: `--paper`, `--ink`, `--ink-soft`, `--ink-mute`, `--hairline`, `--paper-bg`, `--dept-orange`, with dark-theme overrides under `.dark`.

**Vite `base`** is `'/Typecast-guide/'` so asset URLs resolve when served from `https://njcos.github.io/Typecast-guide/`. (If a custom domain or org-root is later used, `base` becomes `'/'`.)

## Information architecture

One continuous page. Sticky TOC nav (left sidebar on desktop; collapses to a top bar / drawer below ~880px). Smooth-scroll anchors; active-section highlight via `IntersectionObserver` (or GSAP ScrollTrigger). A thin scroll-progress bar tracks reading position.

Sections (each a `src/sections/*.tsx`), in document order, preserving the current 14 chapters (+ hero):

| # | Section | id | Source chapter |
|---|---------|----|----------------|
| — | Hero (title + lede + DEPT mark) | `top` | Cover |
| 01 | Overview & install | `overview` | Overview & install (what it does, system requirements, install, daily flow) |
| 02 | The panel, top to bottom | `panel` | The four zones |
| 03 | Home / Typecast | `home` | Home page |
| 04 | Text | `text` | Build row, Edit Comp actions, cross-comp match review |
| 05 | Tagging window | `tagging` | Tag layers, how it works, gotchas |
| 06 | Sheets | `sheets` | Export, validation, formats, Invalid Comp Names, checklist |
| 07 | Dupes | `dupes` | The three rows, Language Mapping window |
| 08 | Duplicating all languages | `dupe-all` | What "Duplicate" does |
| 09 | Render | `render` | The actions |
| 10 | Cleanup | `cleanup` | The actions, NoIP |
| 11 | Language safety | `language-safety` | Header states, matching, mapping, per-language rules |
| 12 | Naming conventions | `naming` | Anatomy, validator, markers/skip prefixes, platform formats |
| 13 | Cross-comp matching | `crosscomp` | Automatic links, confirm prompts |
| 14 | License states | `license` | Grace banner, lockout |

Content is ported **verbatim** from the current guide — this is a chrome/stack/visual redesign, not a content rewrite. Any factual edits are out of scope.

## Component model

Reusable primitives so 15 sections aren't copy-paste; each has one clear purpose and a typed prop interface:

- `Section` — `<section id>` wrapper; standard vertical rhythm, scroll-margin for anchor offset, registers itself for scrollspy.
- `SectionHeader` — chapter number (kicker) + title; the `SplitText` animation target.
- `Callout` — `tip` / `warn` variants (the current `.tip` / `.warn` blocks).
- `StepList` / `Step` — numbered procedure lists (install steps, daily flow).
- `KeyValueTable` — the `.kv` spec tables (system requirements, etc.).
- `PanelMockup` — the dark annotated panel-zone / dialog diagrams (currently `.cep-panel` / `.cep-dialog`); animation target for the showcase walkthroughs.
- `DemoSlot` — placeholder/figure for the GIF demo slots (7 in the current guide).
- `Pill` / `Tag` — inline labels.
- `Nav` / `Toc` — sticky table of contents + scrollspy + progress bar.
- `ThemeToggle` — light/dark switch.

Entry files stay thin (`main.tsx` only mounts `App`) per the CEP-repo lesson that inline components in Vite entries cause double-mount; not strictly required outside CEP but kept as good practice.

## Animation plan (GSAP, showcase)

Registered once in `lib/gsap.ts` (`gsap`, `ScrollTrigger`, `SplitText`), with a global `prefers-reduced-motion` guard that disables/instantizes effects. All component animations use `@gsap/react`'s `useGSAP()` for scoped, auto-cleaned timelines.

- **Hero — lavalamp blobs:** a backdrop of organic **orange blobs** that drift, morph, and merge like a lava lamp behind the hero content. Implemented as a few soft-edged radial-gradient/SVG blob shapes (DEPT orange at varying opacity) on randomized, looping GSAP timelines (slow `x`/`y`/`scale`/`rotation` eases, staggered/offset so they never sync), with a heavy CSS blur + `mix-blend`/gooey filter so overlapping blobs fuse and separate. Continuous ambient loop (not scroll-bound). Reduced-motion: blobs render static. Dark theme: same orange, deeper backdrop.
- **Hero — content:** `SplitText` headline reveal (per-char/word rise), DEPT mark draw-in, lede fade-up on load, layered over the blob backdrop.
- **Section headers:** fade-and-rise as they scroll into view.
- **Step/list/table blocks:** staggered reveal of children.
- **Panel-mockup walkthroughs:** pinned `ScrollTrigger` sections where annotations/zones highlight in sequence as the user scrolls (the "wow" moments — Panel anatomy, Text, Sheets, Dupes are candidates).
- **Parallax:** subtle depth on hero / section dividers.
- **Scroll progress:** a thin top/side bar bound to scroll; TOC active-link highlight.

Intensity is per-section; the plan will mark which sections get pinned/parallax treatment vs. simple reveals so build effort is scoped.

## Accessibility & performance

- `prefers-reduced-motion: reduce` → animations become instant or opacity-only; no pinning/parallax.
- Semantic landmarks (`nav`, `main`, `section` with headings); skip-to-content link; keyboard-navigable TOC; visible focus.
- Theme toggle persists to `localStorage`, respects `prefers-color-scheme` on first load, sets `.dark` on `<html>` (no flash — inline pre-paint script).
- Fonts self-hosted (Inter Tight) with `font-display: swap`; GSAP plugins imported only where used; images/GIFs lazy-loaded.

## Build & deploy

- `npm run dev` — Vite dev server with HMR.
- `npm run build` — `tsc --noEmit` + `vite build` → `dist/`.
- `.github/workflows/deploy.yml` — on push to `main`: checkout, install, build, upload `dist/` artifact, deploy to GitHub Pages (`actions/deploy-pages`). Pages source = GitHub Actions.

## Success criteria

- Site builds (`npm run build`) clean and serves locally (`npm run preview`); verified rendering via Playwright.
- All 14 chapters present in order, content matching the current guide; hero renders; TOC links jump to every section; scrollspy highlights the active section; scroll-progress tracks.
- Light/dark toggle switches themes, persists across reload, and has no first-paint flash.
- GSAP animations run on scroll; with `prefers-reduced-motion` set, motion is suppressed and all content remains visible/usable.
- Responsive and usable down to ~375px (TOC collapses to a drawer/top bar).
- Deployed to GitHub Pages from the standalone repo via the Actions workflow; all assets resolve under the configured `base`.
- No print remnants (`@page`, `pt`/`in`, page-breaks, page numbers, footers).

## Out of scope

- Content/accuracy edits to the guide prose (ported verbatim).
- Authoring the actual demo GIFs (slots are placeholders; real media added later).
- Any change to the `deptTool` panel itself or its build.
- A CMS / markdown content pipeline — sections are authored as React components.

## Resolved (was open)

1. **Repo:** scaffold at `/Users/nick.cosentino/Documents/Tools/typecastGuide`, remote `njcos/Typecast-guide`.
2. **Pages base path:** `'/Typecast-guide/'`.
3. **Demo GIFs:** **keep** the 7 existing slots as-is for now (carried over as placeholders/current media).

## Open questions (resolve in planning)

1. **Where does this spec live long-term** — copied into the new repo's `docs/`, or left in `deptTool`? (Currently authored in `deptTool/docs/superpowers/specs/`.)
