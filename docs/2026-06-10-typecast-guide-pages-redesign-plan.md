# Typecast Guide — GitHub Pages Web Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the print-oriented Typecast instruction guide as a standalone React + Vite + Tailwind + GSAP single-page website, deployed to GitHub Pages, with a light/dark toggle, showcase scroll animations, and a lava-lamp hero.

**Architecture:** A new standalone repo (`njcos/Typecast-guide`) holds a Vite/React 19/TS app. One long scrolling page (`App.tsx`) composes a sticky TOC nav, a lava-lamp hero, 16 content sections (ported verbatim from the existing `typecast-guide.html`), and a footer. Tailwind v3 (class-based dark mode) provides two token layers: **document chrome** tokens (paper/ink/orange, light+dark) for the guide shell, and the **panel** shadcn token set (fixed dark achromatic palette) scoped under `.cep-panel`/`.cep-dialog` so the embedded panel mockups render natively. GSAP (`@gsap/react`) drives ambient hero blobs, scroll-reveals, pinned mockup walkthroughs, and `SplitText` headlines, all guarded by `prefers-reduced-motion`. A GitHub Actions workflow builds and publishes `dist/` to Pages.

**Tech Stack:** React 19, Vite 6+, TypeScript, Tailwind CSS v3.4, GSAP 3.13+ with `@gsap/react`, Vitest + Testing Library, GitHub Actions / Pages.

**Source of truth for content:** `/Users/nick.cosentino/Documents/Tools/deptTool/docs/GUIDE/typecast-guide.html` (referred to below as **SOURCE**). All prose, mockups, tables, and step lists are ported from it verbatim. The plan gives exact SOURCE line ranges per section.

**Working directory for all tasks:** `/Users/nick.cosentino/Documents/Tools/typecastGuide` (referred to below as **REPO**). All paths below are relative to REPO unless they start with `/Users/.../deptTool` (the SOURCE repo, read-only).

---

## Section inventory (ported verbatim)

The SOURCE has **16** `<section class="sheet">` blocks (the spec said 14; SOURCE numbering is internally inconsistent — use this table as authoritative). Each becomes one `src/sections/*.tsx`.

| Order | `id` | Component | SOURCE lines | Kicker label |
|---|---|---|---|---|
| Hero | `top` | `Hero.tsx` | 1300–1507 (title/lede text only; visuals redesigned) | — |
| 1 | `overview` | `Overview.tsx` | 1543–1618 | CHAPTER 01 |
| 2 | `panel-anatomy` | `PanelAnatomy.tsx` | 1621–1726 | CHAPTER 02 |
| 3 | `home` | `Home.tsx` | 1729–1839 | CHAPTER 03 |
| 4 | `text` | `Text.tsx` | 1842–1978 | CHAPTER 04 |
| 5 | `tagging` | `Tagging.tsx` | 1981–2092 | CHAPTER 04 · CONTINUED |
| 6 | `sheets` | `Sheets.tsx` | 2095–2243 | CHAPTER 05 |
| 7 | `dupes` | `Dupes.tsx` | 2246–2400 | CHAPTER 06 |
| 8 | `dupes-all` | `DupesAll.tsx` | 2403–2497 | CHAPTER 06 · CONTINUED |
| 9 | `render` | `Render.tsx` | 2500–2631 | CHAPTER 07 |
| 10 | `cleanup` | `Cleanup.tsx` | 2634–2769 | CHAPTER 08 |
| 11 | `language-safety` | `LanguageSafety.tsx` | 2772–2902 | REFERENCE |
| 12 | `naming` | `Naming.tsx` | 2903–3026 | REFERENCE |
| 13 | `cross-comp` | `CrossComp.tsx` | 3027–3124 | REFERENCE |
| 14 | `license` | `License.tsx` | 3125–3213 | CHAPTER 09 |
| 15 | `troubleshooting` | `Troubleshooting.tsx` | 3224–3304 | HELP |
| 16 | `glossary` | `Glossary.tsx` | 3306–3391 | CHAPTER 10 |

---

## File structure

```
typecastGuide/
  index.html                    Vite entry; <html> theme bootstrap script (no-flash)
  package.json
  vite.config.ts                base: '/Typecast-guide/'
  tsconfig.json, tsconfig.node.json
  tailwind.config.ts            darkMode:'class'; doc + panel tokens
  postcss.config.js
  vitest.config.ts              jsdom env
  .gitignore
  .github/workflows/deploy.yml  build → Pages
  README.md
  public/
    demos/                      7 GIF slots copied from SOURCE repo (placeholders)
  src/
    main.tsx                    thin: createRoot(<App/>)
    App.tsx                     shell: ThemeProvider, Nav, <main> with all sections, Footer
    styles.css                  @tailwind layers; @font-face; doc+panel token vars; lifted component CSS
    vite-env.d.ts
    theme/
      ThemeProvider.tsx         context + localStorage + <html>.dark
      ThemeProvider.test.tsx
      ThemeToggle.tsx
    lib/
      gsap.ts                   register ScrollTrigger+SplitText; prefersReducedMotion()
      sections.ts               ordered [{id,label,title}] for the TOC
      useScrollSpy.ts           IntersectionObserver active-id hook
      useScrollSpy.test.ts
    components/
      Section.tsx               <section id> wrapper + scroll-margin + reveal hook
      SectionHeader.tsx         kicker + title (SplitText target)
      Callout.tsx               tip|warn
      StepList.tsx              ordered steps
      KeyValueTable.tsx         the .kv spec tables
      StatCard.tsx              the .statcard blocks
      PanelMockup.tsx           wraps .cep-panel / .cep-dialog markup (verbatim children)
      DemoSlot.tsx              figure for a GIF
      Pill.tsx
      Nav.tsx                   sticky TOC + scrollspy + progress bar + ThemeToggle + mobile drawer
      Footer.tsx
    hero/
      Hero.tsx                  lava-lamp backdrop + headline/lede
      LavaLamp.tsx              animated orange blobs
      LavaLamp.test.tsx
    sections/                   one file per row in the inventory table
      Overview.tsx … Glossary.tsx
  assets/fonts/                 Inter Tight ttf (copied from SOURCE repo BRANDING/Font)
```

---

## Conventions used by every section file

When a task says "port SOURCE lines A–B," it means:

1. Read SOURCE lines A–B from `/Users/nick.cosentino/Documents/Tools/deptTool/docs/GUIDE/typecast-guide.html`.
2. Reproduce the prose, tables, lists, and mockup markup **verbatim** (no wording changes).
3. Replace the semantic wrapper classes with the React components per this map:

| SOURCE markup | Replace with |
|---|---|
| `<section class="sheet" id="X">` | `<Section id="X">` |
| `<div class="section-num">K</div>` + following `<h2>T</h2>` | `<SectionHeader kicker="K" title="T" />` |
| `<p class="lede">…</p>` | `<p className="lede">…</p>` (class kept; styled in styles.css) |
| `<div class="tip">…</div>` | `<Callout variant="tip">…</Callout>` |
| `<div class="warn">…</div>` | `<Callout variant="warn">…</Callout>` |
| `<table class="kv">…</table>` | `<KeyValueTable>` with same rows |
| `<ol class="steps">…</ol>` | `<StepList>` with same `<li>` items |
| `<div class="statcard">…</div>` | `<StatCard>` |
| `<div class="cep-panel">…</div>` / `<div class="cep-dialog">…</div>` | `<PanelMockup variant="panel\|dialog">` with the **inner markup kept verbatim** (it already uses Tailwind utility classes that resolve against the panel token set) |
| `<figure class="demo">…</figure>` | `<DemoSlot src="demos/<file>" caption="…" />` |
| `<span class="mono">` / `<code>` | keep as `<code>` |

4. Any other classes inside mockups (`btn`, `btn-outline`, `seg`, `name`, `meta`, `icon`, `v`, `l`, `col`, `body`, `feature`) are **kept verbatim** — their CSS is lifted into `styles.css` in Task 4.
5. Convert HTML entities to text/JSX (`&amp;`→`&`, `&rarr;`→`→`), and `class=`→`className=`, `for=`→`htmlFor=`, self-close void tags.

---

## Task 1: Scaffold the repo

**Files:**
- Create: REPO `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `.gitignore`

- [ ] **Step 1: Initialize git + Vite React-TS scaffold**

```bash
cd /Users/nick.cosentino/Documents/Tools/typecastGuide
git init -b main
npm create vite@latest . -- --template react-ts
npm install
```
(The `docs/` folder already present is preserved; answer "ignore/continue" if prompted about non-empty dir.)

- [ ] **Step 2: Set the Pages base path** in `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Typecast-guide/',
  plugins: [react()],
})
```

- [ ] **Step 3: Replace `src/App.tsx` with a minimal shell**

```tsx
export default function App() {
  return <main className="min-h-screen grid place-items-center">Typecast Guide</main>
}
```

- [ ] **Step 4: Verify dev server boots**

Run: `npm run dev` (then Ctrl-C)
Expected: Vite prints a Local URL with no errors.

- [ ] **Step 5: Verify production build**

Run: `npm run build`
Expected: `dist/` produced, exit 0.

- [ ] **Step 6: Wire the remote and commit**

```bash
git remote add origin https://github.com/njcos/Typecast-guide.git
printf "node_modules\ndist\n.DS_Store\n*.local\n" > .gitignore
git add -A
git commit -m "chore: scaffold Vite + React 19 + TS for Typecast guide"
```

---

## Task 2: Install Tailwind, GSAP, and test tooling

**Files:**
- Create: `tailwind.config.ts`, `postcss.config.js`, `vitest.config.ts`, `src/styles.css`
- Modify: `src/main.tsx`, `package.json` (scripts)

- [ ] **Step 1: Install dependencies**

```bash
npm install -D tailwindcss@^3.4 postcss autoprefixer vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install gsap @gsap/react
npx tailwindcss init -p --ts
```

- [ ] **Step 2: Create `postcss.config.js`** (if `init -p` didn't make one)

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

- [ ] **Step 3: Add the `test` script to `package.json`**

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "test": "vitest run"
}
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: ['./src/test-setup.ts'] },
})
```

- [ ] **Step 5: Create `src/test-setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 6: Create `src/styles.css` with Tailwind layers** (tokens filled in Task 3)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 7: Import styles in `src/main.tsx`** (replace the default `index.css` import)

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
```
Delete `src/index.css` and `src/App.css`.

- [ ] **Step 8: Verify build + a trivial Tailwind class works**

Set `App.tsx` root to `className="min-h-screen grid place-items-center text-3xl font-bold"`.
Run: `npm run build`
Expected: exit 0; `dist/assets/*.css` contains Tailwind utilities.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: add Tailwind, GSAP, and Vitest tooling"
```

---

## Task 3: Design tokens + fonts (Tailwind config)

This task ports the two SOURCE token layers. **Doc tokens** (light defaults + dark overrides) drive the guide shell. **Panel tokens** (from SOURCE lines 337–355, the fixed dark achromatic palette) are scoped to `.cep-panel`/`.cep-dialog` so mockups always look like the real dark panel regardless of page theme.

**Files:**
- Modify: `tailwind.config.ts`, `src/styles.css`, `index.html`
- Create: `assets/fonts/` (copied ttf)

- [ ] **Step 1: Copy the Inter Tight fonts into the repo**

```bash
mkdir -p assets/fonts
cp /Users/nick.cosentino/Documents/Tools/deptTool/BRANDING/Font/InterTight-*.ttf assets/fonts/
ls assets/fonts
```
Expected: Regular, Medium, SemiBold, Bold, Black `.ttf` present.

- [ ] **Step 2: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        // document chrome (light/dark via CSS vars on :root / .dark)
        paper: 'hsl(var(--paper))',
        'paper-bg': 'hsl(var(--paper-bg))',
        ink: 'hsl(var(--ink))',
        'ink-soft': 'hsl(var(--ink-soft))',
        'ink-mute': 'hsl(var(--ink-mute))',
        hairline: 'hsl(var(--hairline))',
        dept: 'hsl(var(--dept-orange))',
        // panel shadcn tokens (resolve under .cep-panel scope)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 3: Add tokens + fonts to `src/styles.css`** (between the `@tailwind` lines and the rest). HSL triplets are space-separated (no commas) so `hsl(var(--x))` works. Doc-token hex values come from SOURCE lines 19–27, converted to HSL; panel tokens are copied as-is from SOURCE lines 337–355.

```css
@layer base {
  /* Inter Tight */
  @font-face { font-family:'Inter Tight'; font-weight:400; src:url('/assets/fonts/InterTight-Regular.ttf') format('truetype'); font-display:swap; }
  @font-face { font-family:'Inter Tight'; font-weight:500; src:url('/assets/fonts/InterTight-Medium.ttf') format('truetype'); font-display:swap; }
  @font-face { font-family:'Inter Tight'; font-weight:600; src:url('/assets/fonts/InterTight-SemiBold.ttf') format('truetype'); font-display:swap; }
  @font-face { font-family:'Inter Tight'; font-weight:700; src:url('/assets/fonts/InterTight-Bold.ttf') format('truetype'); font-display:swap; }
  @font-face { font-family:'Inter Tight'; font-weight:900; src:url('/assets/fonts/InterTight-Black.ttf') format('truetype'); font-display:swap; }

  :root {
    /* document chrome — LIGHT (from SOURCE #FFFFFF/#1A1A1A/#555/#888/#D7D5D2/#EFECE8/#FF4A00) */
    --paper: 0 0% 100%;
    --paper-bg: 36 13% 92%;
    --ink: 0 0% 10%;
    --ink-soft: 0 0% 33%;
    --ink-mute: 0 0% 53%;
    --hairline: 40 6% 83%;
    --dept-orange: 17 100% 50%;
  }
  .dark {
    /* document chrome — DARK (high-contrast canvas, orange preserved) */
    --paper: 0 0% 11%;
    --paper-bg: 0 0% 7%;
    --ink: 0 0% 95%;
    --ink-soft: 0 0% 72%;
    --ink-mute: 0 0% 55%;
    --hairline: 0 0% 24%;
    --dept-orange: 17 100% 52%;
  }

  /* panel mockups — fixed dark achromatic palette (SOURCE 337–355), scoped */
  .cep-panel, .cep-dialog {
    --background: 0 0% 12%;
    --foreground: 0 0% 95%;
    --accent: 17 100% 50%;
    --accent-foreground: 0 0% 100%;
    --card: 0 0% 22%;
    --card-foreground: 0 0% 95%;
    --secondary: 0 0% 26%;
    --secondary-foreground: 0 0% 95%;
    --muted: 0 0% 22%;
    --muted-foreground: 0 0% 65%;
    --popover: 0 0% 14%;
    --popover-foreground: 0 0% 95%;
    --input: 0 0% 14%;
    --border: 0 0% 28%;
    --primary: 0 0% 92%;
    --primary-foreground: 0 0% 12%;
    --destructive: 0 62% 40%;
    --destructive-foreground: 0 0% 95%;
    --ring: 0 0% 60%;
  }

  html { scroll-behavior: smooth; }
  body {
    @apply bg-paper-bg text-ink font-sans antialiased;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}
```

- [ ] **Step 4: Add the no-flash theme bootstrap to `index.html`** `<head>` (before any stylesheet) and set the page title.

```html
<title>DEPT Typecast — Instruction Guide</title>
<script>
  (function () {
    try {
      var s = localStorage.getItem('tc-theme');
      var dark = s ? s === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      if (dark) document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
</script>
```

- [ ] **Step 5: Verify tokens render**

Set `App.tsx` to `<main className="min-h-screen bg-paper-bg text-ink"><h1 className="text-dept text-5xl font-black p-10">DEPT</h1></main>`.
Run: `npm run dev`, open the URL.
Expected: light paper background, near-black text, orange "DEPT". Toggling `<html class="dark">` in devtools flips to dark canvas.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: DEPT document + panel design tokens, Inter Tight fonts"
```

---

## Task 4: Lift component CSS for mockups & callouts

The mockups use non-Tailwind helper classes defined in the SOURCE `<style>` block. Lift them into `@layer components` so the verbatim mockup markup renders. Standard Tailwind utilities in the mockups (e.g. `flex`, `text-muted-foreground`, `border-b-2`) now resolve from Task 3's config and do **not** need lifting.

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Identify and lift the helper rules.** From SOURCE `/Users/.../deptTool/docs/GUIDE/typecast-guide.html`, copy the rule bodies for these selectors into a new `@layer components { … }` block in `styles.css`, **converting print units to web units** (`pt`→`rem` at 1pt≈1.333px→use `rem`/`px`; `in`→remove; drop `page-break-*`, `@page`, `@media print`). Lift these selectors (search them in SOURCE):
  - `.lede` (SOURCE ~175), `.section-num` (~166)
  - `.tip` (~210), `.warn` (~226)
  - `.feature` (~283), `.statcard` (~979)
  - `.steps` / `.steps li` counter styling (~833)
  - `.kv`, `.kv th`, `.kv td` (~850)
  - `.cep-panel`, `.cep-dialog` box/frame styles (~335, ~756, ~1199) — keep their `background:hsl(var(--background))`, radius, border, internal font-size
  - mockup helper classes referenced in markup but not standard Tailwind: `.btn`, `.btn-outline`, `.seg`, `.name`, `.meta`, `.icon`, `.v`, `.l`, `.col`, `.body`, `.mark`, `.wordmark` (search each `\.<name>\b\s*\{` in SOURCE; lift those that exist)
  - `code, .mono` (~90)

  Wrap them:

```css
@layer components {
  /* …lifted rules here, units converted… */
}
```

- [ ] **Step 2: Verify nothing references removed print machinery.** Grep your new block:

Run: `grep -nE '@page|page-break|[0-9]+(pt|in)\b' src/styles.css`
Expected: no matches (all converted).

- [ ] **Step 3: Smoke-test a lifted class.** Temporarily add `<div className="tip">Test tip</div>` inside `App.tsx`'s main; `npm run dev`.
Expected: the tip block shows its SOURCE styling (accent left border / tint). Remove the temp markup after.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: lift mockup + callout component CSS, units webified"
```

---

## Task 5: GSAP setup + reduced-motion guard

**Files:**
- Create: `src/lib/gsap.ts`

- [ ] **Step 1: Register plugins once, expose a reduced-motion helper**

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
```

- [ ] **Step 2: Verify it imports cleanly** (SplitText is free in GSAP 3.13+).

Run: `npx vite build`
Expected: exit 0, no "module not found" for `gsap/SplitText`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: central GSAP registration + reduced-motion helper"
```

---

## Task 6: Theme provider + toggle (TDD)

**Files:**
- Create: `src/theme/ThemeProvider.tsx`, `src/theme/ThemeProvider.test.tsx`, `src/theme/ThemeToggle.tsx`

- [ ] **Step 1: Write the failing test** (`src/theme/ThemeProvider.test.tsx`)

```tsx
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeProvider'

function Probe() {
  const { theme, toggle } = useTheme()
  return <button onClick={toggle}>{theme}</button>
}

beforeEach(() => { localStorage.clear(); document.documentElement.classList.remove('dark') })

test('defaults to light and toggles to dark, persisting + setting html.dark', async () => {
  render(<ThemeProvider><Probe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('light')
  await act(async () => { await userEvent.click(screen.getByRole('button')) })
  expect(screen.getByRole('button')).toHaveTextContent('dark')
  expect(document.documentElement.classList.contains('dark')).toBe(true)
  expect(localStorage.getItem('tc-theme')).toBe('dark')
})

test('reads persisted dark on mount', () => {
  localStorage.setItem('tc-theme', 'dark')
  render(<ThemeProvider><Probe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('dark')
  expect(document.documentElement.classList.contains('dark')).toBe(true)
})
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/theme/ThemeProvider.test.tsx`
Expected: FAIL — cannot find `./ThemeProvider`.

- [ ] **Step 3: Implement `ThemeProvider.tsx`**

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'
const Ctx = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'light', toggle: () => {} })

function initial(): Theme {
  try {
    const s = localStorage.getItem('tc-theme')
    if (s === 'dark' || s === 'light') return s
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch { return 'light' }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initial)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem('tc-theme', theme) } catch {}
  }, [theme])
  return <Ctx.Provider value={{ theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)
```

- [ ] **Step 4: Run tests, verify they pass**

Run: `npx vitest run src/theme/ThemeProvider.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Implement `ThemeToggle.tsx`**

```tsx
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="grid h-8 w-8 place-items-center rounded-md border border-hairline text-ink hover:text-dept transition-colors"
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: theme provider + toggle with persistence (TDD)"
```

---

## Task 7: Section model + scrollspy (TDD)

**Files:**
- Create: `src/lib/sections.ts`, `src/lib/useScrollSpy.ts`, `src/lib/useScrollSpy.test.ts`

- [ ] **Step 1: Create `src/lib/sections.ts`** — the ordered TOC source of truth (matches the inventory table)

```ts
export interface SectionMeta { id: string; label: string; title: string }

export const SECTIONS: SectionMeta[] = [
  { id: 'overview', label: '01', title: 'Overview & install' },
  { id: 'panel-anatomy', label: '02', title: 'The panel, top to bottom' },
  { id: 'home', label: '03', title: 'Home / Typecast' },
  { id: 'text', label: '04', title: 'Text' },
  { id: 'tagging', label: '04·', title: 'Tagging window' },
  { id: 'sheets', label: '05', title: 'Sheets' },
  { id: 'dupes', label: '06', title: 'Dupes' },
  { id: 'dupes-all', label: '06·', title: 'Duplicating all languages' },
  { id: 'render', label: '07', title: 'Render' },
  { id: 'cleanup', label: '08', title: 'Cleanup' },
  { id: 'language-safety', label: 'REF', title: 'Language safety' },
  { id: 'naming', label: 'REF', title: 'Naming conventions' },
  { id: 'cross-comp', label: 'REF', title: 'Cross-comp matching' },
  { id: 'license', label: '09', title: 'License states' },
  { id: 'troubleshooting', label: 'HELP', title: 'Troubleshooting' },
  { id: 'glossary', label: '10', title: 'Glossary & tips' },
]
```

- [ ] **Step 2: Write the failing test** (`src/lib/useScrollSpy.test.ts`) — drives the pure helper that picks the active id from IntersectionObserver entries.

```ts
import { pickActive } from './useScrollSpy'

test('returns the id of the topmost intersecting entry', () => {
  const entries = [
    { target: { id: 'a' }, isIntersecting: false, boundingClientRect: { top: -200 } },
    { target: { id: 'b' }, isIntersecting: true, boundingClientRect: { top: 40 } },
    { target: { id: 'c' }, isIntersecting: true, boundingClientRect: { top: 600 } },
  ] as unknown as IntersectionObserverEntry[]
  expect(pickActive(entries, 'a')).toBe('b')
})

test('keeps previous id when nothing intersects', () => {
  const entries = [
    { target: { id: 'a' }, isIntersecting: false, boundingClientRect: { top: -50 } },
  ] as unknown as IntersectionObserverEntry[]
  expect(pickActive(entries, 'a')).toBe('a')
})
```

- [ ] **Step 3: Run it, verify it fails**

Run: `npx vitest run src/lib/useScrollSpy.test.ts`
Expected: FAIL — cannot find `./useScrollSpy`.

- [ ] **Step 4: Implement `src/lib/useScrollSpy.ts`**

```ts
import { useEffect, useState } from 'react'

export function pickActive(entries: IntersectionObserverEntry[], prev: string): string {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
  return visible.length ? (visible[0].target as HTMLElement).id : prev
}

export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      entries => setActive(prev => pickActive(entries, prev)),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [ids.join(',')])
  return active
}
```

- [ ] **Step 5: Run tests, verify they pass**

Run: `npx vitest run src/lib/useScrollSpy.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: section model + scrollspy hook (TDD)"
```

---

## Task 8: Core presentational components

Each is small and presentational; verified by build + later render. Reuse the lifted CSS classes from Task 4.

**Files:**
- Create: `src/components/Section.tsx`, `SectionHeader.tsx`, `Callout.tsx`, `StepList.tsx`, `KeyValueTable.tsx`, `StatCard.tsx`, `PanelMockup.tsx`, `DemoSlot.tsx`, `Pill.tsx`

- [ ] **Step 1: `Section.tsx`** — anchor wrapper with scroll-margin and a scroll-reveal hook

```tsx
import { useRef, type ReactNode } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../lib/gsap'

export function Section({ id, children }: { id: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.from(ref.current!.querySelectorAll('[data-reveal]'), {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current!, start: 'top 75%' },
    })
  }, { scope: ref })
  return (
    <section ref={ref} id={id} className="scroll-mt-24 mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      {children}
    </section>
  )
}
```

- [ ] **Step 2: `SectionHeader.tsx`** — kicker + title (SplitText target marked via `data-reveal`)

```tsx
export function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="mb-8">
      <div className="section-num text-dept" data-reveal>{kicker}</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-black uppercase tracking-[0.02em] text-ink" data-reveal>{title}</h2>
    </header>
  )
}
```

- [ ] **Step 3: `Callout.tsx`**

```tsx
import type { ReactNode } from 'react'
export function Callout({ variant = 'tip', children }: { variant?: 'tip' | 'warn'; children: ReactNode }) {
  return <div className={variant} data-reveal>{children}</div>
}
```

- [ ] **Step 4: `StepList.tsx`**

```tsx
import type { ReactNode } from 'react'
export function StepList({ children }: { children: ReactNode }) {
  return <ol className="steps" data-reveal>{children}</ol>
}
```

- [ ] **Step 5: `KeyValueTable.tsx`**

```tsx
import type { ReactNode } from 'react'
export function KeyValueTable({ children }: { children: ReactNode }) {
  return <table className="kv" data-reveal><tbody>{children}</tbody></table>
}
```

- [ ] **Step 6: `StatCard.tsx`**

```tsx
import type { ReactNode } from 'react'
export function StatCard({ children }: { children: ReactNode }) {
  return <div className="statcard" data-reveal>{children}</div>
}
```

- [ ] **Step 7: `PanelMockup.tsx`** — wraps verbatim mockup markup; the `cep-panel`/`cep-dialog` class scopes the panel tokens

```tsx
import type { ReactNode } from 'react'
export function PanelMockup({ variant = 'panel', children }: { variant?: 'panel' | 'dialog'; children: ReactNode }) {
  return <div className={variant === 'dialog' ? 'cep-dialog' : 'cep-panel'} data-reveal>{children}</div>
}
```

- [ ] **Step 8: `DemoSlot.tsx`**

```tsx
export function DemoSlot({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="demo my-6" data-reveal>
      <img src={`${import.meta.env.BASE_URL}${src}`} alt={caption ?? ''} loading="lazy" className="w-full rounded-lg border border-hairline" />
      {caption && <figcaption className="mt-2 text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  )
}
```

- [ ] **Step 9: `Pill.tsx`**

```tsx
import type { ReactNode } from 'react'
export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-full border border-hairline px-2 py-0.5 text-xs text-ink-soft">{children}</span>
}
```

- [ ] **Step 10: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: core presentational components"
```

---

## Task 9: Lava-lamp hero (TDD for the static fallback)

**Files:**
- Create: `src/hero/LavaLamp.tsx`, `src/hero/LavaLamp.test.tsx`, `src/hero/Hero.tsx`
- Modify: `src/styles.css` (gooey filter + blob base)

- [ ] **Step 1: Add the gooey filter + blob base to `styles.css`** (inside `@layer components`)

```css
.lava { position:absolute; inset:0; overflow:hidden; filter:url(#goo) blur(8px); pointer-events:none; }
.blob { position:absolute; border-radius:9999px; background:hsl(var(--dept-orange)); mix-blend-mode:screen; will-change:transform; }
```
Also add the SVG filter once near the top of `App.tsx` return (Task 11), or inline in `Hero`:
```html
<svg width="0" height="0"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter></svg>
```

- [ ] **Step 2: Write the failing test** (`src/hero/LavaLamp.test.tsx`) — verifies blobs render and motion is skipped under reduced-motion

```tsx
import { render } from '@testing-library/react'
import { LavaLamp } from './LavaLamp'

test('renders the configured number of blobs', () => {
  const { container } = render(<LavaLamp count={5} />)
  expect(container.querySelectorAll('.blob').length).toBe(5)
})
```

- [ ] **Step 3: Run it, verify it fails**

Run: `npx vitest run src/hero/LavaLamp.test.tsx`
Expected: FAIL — cannot find `./LavaLamp`.

- [ ] **Step 4: Implement `LavaLamp.tsx`** — N blobs on randomized looping timelines; static under reduced motion. Randomness is index-derived (no `Math.random` needed; deterministic, test-stable).

```tsx
import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../lib/gsap'

export function LavaLamp({ count = 6 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const blobs = Array.from({ length: count }, (_, i) => {
    const size = 180 + (i % 4) * 70
    return { size, left: (i * 37) % 90, top: (i * 53) % 80, key: i }
  })
  useGSAP(() => {
    if (prefersReducedMotion()) return
    ref.current!.querySelectorAll<HTMLElement>('.blob').forEach((el, i) => {
      gsap.to(el, {
        x: `+=${60 + i * 18}`, y: `+=${-80 - i * 22}`, scale: 1 + (i % 3) * 0.15,
        duration: 8 + i * 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.6,
      })
    })
  }, { scope: ref })
  return (
    <div ref={ref} className="lava" aria-hidden="true">
      {blobs.map(b => (
        <span key={b.key} className="blob"
          style={{ width: b.size, height: b.size, left: `${b.left}%`, top: `${b.top}%`, opacity: 0.7 }} />
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Run test, verify it passes**

Run: `npx vitest run src/hero/LavaLamp.test.tsx`
Expected: PASS.

- [ ] **Step 6: Implement `Hero.tsx`** — blob backdrop + SplitText headline + lede. Use the cover title/lede text from SOURCE lines 1300–1507 (the wordmark "Typecast." and the handbook lede).

```tsx
import { useRef } from 'react'
import { useGSAP, gsap, SplitText, prefersReducedMotion } from '../lib/gsap'
import { LavaLamp } from './LavaLamp'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const split = new SplitText(ref.current!.querySelector('h1'), { type: 'chars,words' })
    gsap.from(split.chars, { yPercent: 120, opacity: 0, stagger: 0.02, duration: 0.7, ease: 'power3.out' })
    gsap.from(ref.current!.querySelector('[data-lede]'), { y: 20, opacity: 0, duration: 0.8, delay: 0.5 })
  }, { scope: ref })
  return (
    <header ref={ref} id="top" className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-paper-bg px-6 text-center">
      <svg width="0" height="0" className="absolute"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter></svg>
      <LavaLamp />
      <div className="relative z-10">
        <div className="section-num text-dept">DEPT · TYPECAST</div>
        <h1 className="mt-4 text-6xl md:text-8xl font-black uppercase tracking-[0.02em] text-ink">Typecast.</h1>
        <p data-lede className="lede mx-auto mt-6 max-w-xl text-ink-soft">A handbook for the panel.</p>
      </div>
    </header>
  )
}
```
(If the SOURCE lede wording differs, use SOURCE's exact text.)

- [ ] **Step 7: Verify visually**

Run: `npm run dev`; open the URL.
Expected: orange blobs drift, morph, and merge behind a centered "Typecast." headline that animates in. With OS reduced-motion on, blobs are static and headline shows immediately.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: lava-lamp hero with SplitText headline (TDD)"
```

---

## Task 10: Navigation (sticky TOC + scrollspy + progress + mobile drawer)

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/Footer.tsx`

- [ ] **Step 1: Implement `Nav.tsx`**

```tsx
import { useState } from 'react'
import { SECTIONS } from '../lib/sections'
import { useScrollSpy } from '../lib/useScrollSpy'
import { ThemeToggle } from '../theme/ThemeToggle'

export function Nav() {
  const active = useScrollSpy(['top', ...SECTIONS.map(s => s.id)])
  const [open, setOpen] = useState(false)
  return (
    <>
      {/* desktop sidebar */}
      <nav className="fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col border-r border-hairline bg-paper-bg/80 backdrop-blur px-5 py-6 lg:flex">
        <a href="#top" className="text-sm font-black uppercase tracking-[0.1em] text-ink">Typecast</a>
        <ul className="mt-6 flex-1 space-y-1 overflow-y-auto text-sm">
          {SECTIONS.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`}
                 className={`flex gap-2 rounded px-2 py-1 transition-colors ${active === s.id ? 'text-dept' : 'text-ink-soft hover:text-ink'}`}>
                <span className="w-8 shrink-0 text-ink-mute">{s.label}</span>{s.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="pt-4"><ThemeToggle /></div>
      </nav>

      {/* mobile top bar + drawer */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-hairline bg-paper-bg/90 px-4 py-3 backdrop-blur lg:hidden">
        <a href="#top" className="text-sm font-black uppercase tracking-[0.1em] text-ink">Typecast</a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button type="button" aria-label="Open navigation" onClick={() => setOpen(o => !o)} className="h-8 w-8 rounded-md border border-hairline text-ink">≡</button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-20 bg-paper-bg/95 pt-16 lg:hidden" onClick={() => setOpen(false)}>
          <ul className="space-y-1 px-6 text-base">
            {SECTIONS.map(s => (
              <li key={s.id}><a href={`#${s.id}`} className="block py-2 text-ink-soft">{s.title}</a></li>
            ))}
          </ul>
        </div>
      )}

      {/* scroll progress bar */}
      <ScrollProgress />
    </>
  )
}

function ScrollProgress() {
  return <div id="tc-progress" className="fixed left-0 top-0 z-40 h-0.5 w-full origin-left scale-x-0 bg-dept" />
}
```

- [ ] **Step 2: Animate the progress bar** — add to `Nav` via a `useGSAP` effect (append inside `Nav` before `return`):

```tsx
import { useGSAP, gsap, ScrollTrigger } from '../lib/gsap'
// …inside Nav():
useGSAP(() => {
  gsap.to('#tc-progress', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true },
  })
}, [])
```

- [ ] **Step 3: Implement `Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="border-t border-hairline px-6 py-10 text-center text-sm text-ink-mute">
      DEPT · Typecast — internal tool. Licensed machines only.
    </footer>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: sticky TOC nav, scrollspy, progress bar, mobile drawer, footer"
```

---

## Task 11: App shell

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Compose the shell** (sections imported in Task 12+; start with Hero only, then add as you build)

```tsx
import { ThemeProvider } from './theme/ThemeProvider'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Hero } from './hero/Hero'
// section imports added in Tasks 12–15

export default function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Hero />
      <main className="lg:pl-60">
        {/* <Overview /> … <Glossary /> added per Task 12–15 */}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`
Expected: hero + nav + footer render; sidebar offsets content on desktop.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: app shell (theme + nav + hero + footer)"
```

---

## Task 12: Port sections 1–4 (Overview, Panel, Home, Text)

**Files:**
- Create: `src/sections/Overview.tsx`, `PanelAnatomy.tsx`, `Home.tsx`, `Text.tsx`
- Modify: `src/App.tsx` (import + place each)

Follow **Conventions used by every section file** (above) for each.

- [ ] **Step 1: `Overview.tsx`** — port SOURCE 1543–1618. Includes a `KeyValueTable` (system requirements), a `StepList` (install), a `Callout variant="tip"`, and the "daily flow at a glance" strip. Wrap in `<Section id="overview">` with `<SectionHeader kicker="CHAPTER 01" title="Overview & install" />`.

- [ ] **Step 2: `PanelAnatomy.tsx`** — port SOURCE 1621–1726 (the four zones; includes a `PanelMockup`). `<SectionHeader kicker="CHAPTER 02" title="The panel, top to bottom" />`.

- [ ] **Step 3: `Home.tsx`** — port SOURCE 1729–1839. `kicker="CHAPTER 03" title="Home / Typecast"`.

- [ ] **Step 4: `Text.tsx`** — port SOURCE 1842–1978 (build row, Edit Comp actions, cross-comp match review; `PanelMockup`). `kicker="CHAPTER 04" title="Text"`.

- [ ] **Step 5: Place them in `App.tsx`** in order inside `<main>`.

- [ ] **Step 6: Verify render**

Run: `npm run dev`
Expected: four sections render with correct content, mockups styled (dark panel), callouts/tables/steps styled; TOC links jump to each; scrollspy highlights active.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: port sections Overview, Panel, Home, Text"
```

---

## Task 13: Port sections 5–8 (Tagging, Sheets, Dupes, DupesAll)

**Files:**
- Create: `src/sections/Tagging.tsx`, `Sheets.tsx`, `Dupes.tsx`, `DupesAll.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `Tagging.tsx`** — port SOURCE 1981–2092. `kicker="CHAPTER 04 · CONTINUED" title="Tagging window"`.
- [ ] **Step 2: `Sheets.tsx`** — port SOURCE 2095–2243. `kicker="CHAPTER 05" title="Sheets"`.
- [ ] **Step 3: `Dupes.tsx`** — port SOURCE 2246–2400. `kicker="CHAPTER 06" title="Dupes"`.
- [ ] **Step 4: `DupesAll.tsx`** — port SOURCE 2403–2497. `kicker="CHAPTER 06 · CONTINUED" title="Duplicating all languages"`.
- [ ] **Step 5: Place in `App.tsx`.**
- [ ] **Step 6: Verify** (`npm run dev`) — all four render, mockups/dialogs styled.
- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: port sections Tagging, Sheets, Dupes, DupesAll"
```

---

## Task 14: Port sections 9–12 (Render, Cleanup, LanguageSafety, Naming)

**Files:**
- Create: `src/sections/Render.tsx`, `Cleanup.tsx`, `LanguageSafety.tsx`, `Naming.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `Render.tsx`** — port SOURCE 2500–2631. `kicker="CHAPTER 07" title="Render"`.
- [ ] **Step 2: `Cleanup.tsx`** — port SOURCE 2634–2769 (actions + NoIP). `kicker="CHAPTER 08" title="Cleanup"`.
- [ ] **Step 3: `LanguageSafety.tsx`** — port SOURCE 2772–2902. `kicker="REFERENCE" title="Language safety"`.
- [ ] **Step 4: `Naming.tsx`** — port SOURCE 2903–3026. `kicker="REFERENCE" title="Naming conventions"`.
- [ ] **Step 5: Place in `App.tsx`.**
- [ ] **Step 6: Verify** (`npm run dev`).
- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: port sections Render, Cleanup, LanguageSafety, Naming"
```

---

## Task 15: Port sections 13–16 (CrossComp, License, Troubleshooting, Glossary)

**Files:**
- Create: `src/sections/CrossComp.tsx`, `License.tsx`, `Troubleshooting.tsx`, `Glossary.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `CrossComp.tsx`** — port SOURCE 3027–3124. `kicker="REFERENCE" title="Cross-comp matching"`.
- [ ] **Step 2: `License.tsx`** — port SOURCE 3125–3213 (grace banner, lockout; `PanelMockup`). `kicker="CHAPTER 09" title="License states"`.
- [ ] **Step 3: `Troubleshooting.tsx`** — port SOURCE 3224–3304. `kicker="HELP" title="Troubleshooting"`.
- [ ] **Step 4: `Glossary.tsx`** — port SOURCE 3306–3391. `kicker="CHAPTER 10" title="Glossary & tips"`.
- [ ] **Step 5: Place in `App.tsx`** (now all 16 sections present, in inventory order).
- [ ] **Step 6: Verify full page** (`npm run dev`) — every TOC entry jumps; no missing content vs SOURCE.
- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: port sections CrossComp, License, Troubleshooting, Glossary"
```

---

## Task 16: Copy demo GIFs

The 7 GIF slots are kept as-is (per spec). Locate and copy them.

**Files:**
- Create: `public/demos/*`

- [ ] **Step 1: Find the demo assets referenced by SOURCE**

Run: `grep -nE 'figure class="demo"|\.(gif|mp4|webp)' /Users/nick.cosentino/Documents/Tools/deptTool/docs/GUIDE/typecast-guide.html`
Expected: list of `figure.demo` blocks and any media `src`s.

- [ ] **Step 2: Copy the media into `public/demos/`** (adjust source path to wherever SOURCE's media lives — likely `deptTool/docs/GUIDE/` or `deptTool/docs/`)

```bash
mkdir -p public/demos
# copy each referenced file, e.g.:
# cp /Users/nick.cosentino/Documents/Tools/deptTool/docs/GUIDE/<name>.gif public/demos/
ls public/demos
```
If SOURCE's `figure.demo` blocks are empty placeholders (no `src`), leave `public/demos/` empty and have `DemoSlot` render a captioned placeholder box; note this in the commit.

- [ ] **Step 3: Verify `DemoSlot` images resolve** under the Vite `base` (`import.meta.env.BASE_URL`).

Run: `npm run dev` and check a section with a demo.
Expected: image (or placeholder) renders, no 404 in console.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: carry over demo GIF slots"
```

---

## Task 17: Showcase animations (pinned mockup walkthroughs + parallax)

Baseline reveals already exist (Task 8 `Section`). This task adds the "wow" moments to the heaviest sections. All effects are skipped under `prefersReducedMotion()`.

**Files:**
- Create: `src/lib/usePinnedWalkthrough.ts`
- Modify: `PanelAnatomy.tsx`, `Text.tsx`, `Sheets.tsx`, `Dupes.tsx` (attach the effect)

- [ ] **Step 1: Implement `usePinnedWalkthrough.ts`** — pins a section and sequentially highlights its `[data-step]` children as the user scrolls

```ts
import { useGSAP, gsap, prefersReducedMotion } from './gsap'
import type { RefObject } from 'react'

export function usePinnedWalkthrough(ref: RefObject<HTMLElement>) {
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const steps = ref.current!.querySelectorAll<HTMLElement>('[data-step]')
    if (!steps.length) return
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current!, start: 'top top', end: `+=${steps.length * 400}`, pin: true, scrub: true },
    })
    steps.forEach(s => {
      tl.fromTo(s, { opacity: 0.35, scale: 0.99 }, { opacity: 1, scale: 1, duration: 1 })
        .to(s, { opacity: 0.35, scale: 0.99, duration: 1 })
    })
  }, { scope: ref })
}
```

- [ ] **Step 2: In `PanelAnatomy.tsx`** add a `ref` on its `<Section>`'s inner wrapper, mark each of the four zone callouts with `data-step`, and call `usePinnedWalkthrough(ref)`. (Add `data-step` to the existing zone elements; do not change copy.)

- [ ] **Step 3: Repeat for `Text.tsx`, `Sheets.tsx`, `Dupes.tsx`** on their primary `PanelMockup`/`cep-dialog` annotation groups.

- [ ] **Step 4: Add a subtle parallax to hero blobs/section dividers** (optional polish): in `LavaLamp`, add a `scrollTrigger`-scrubbed `y` drift on the container. Skip under reduced motion.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Expected: scrolling through Panel/Text/Sheets/Dupes pins the section and walks the highlights; reduced-motion shows everything static and scrollable.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: pinned mockup walkthroughs + parallax (reduced-motion safe)"
```

---

## Task 18: Accessibility & reduced-motion pass

**Files:**
- Modify: `index.html`, `src/App.tsx`, `src/styles.css`

- [ ] **Step 1: Add a skip link** at the top of `App.tsx`

```tsx
<a href="#overview" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-paper focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
```

- [ ] **Step 2: Add a global reduced-motion CSS guard** to `styles.css` (belt-and-suspenders for non-GSAP transitions)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 3: Add `lang="en"` and meta viewport** to `index.html` (viewport ships with Vite template; confirm). Confirm every section heading is an `<h2>` and the hero is the single `<h1>`.

- [ ] **Step 4: Keyboard check** — tab through nav; focus visible; toggle reachable; drawer closes on link.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "a11y: skip link, reduced-motion guard, landmarks"
```

---

## Task 19: GitHub Pages deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow**

```yaml
name: Deploy to Pages
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: "${{ steps.deployment.outputs.page_url }}" }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify the build the workflow runs succeeds locally**

Run: `npm ci && npm run build && npm run preview`
Expected: preview serves the site under `/Typecast-guide/` with all assets resolving (check console for 404s).

- [ ] **Step 3: Commit + push, then enable Pages**

```bash
git add -A
git commit -m "ci: GitHub Pages deploy workflow"
git push -u origin main
```
Then in GitHub repo settings → Pages → Source: **GitHub Actions**. Confirm the workflow runs green and the site loads at `https://njcos.github.io/Typecast-guide/`.

---

## Task 20: README + final verification

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md`** (dev/build/deploy, base-path note, source-of-content note pointing at the SOURCE guide).

- [ ] **Step 2: Full test + build**

Run: `npm test && npm run build`
Expected: all vitest specs pass; build exits 0.

- [ ] **Step 3: Content parity spot-check** — open the live page and the SOURCE guide side by side; confirm all 16 sections present and prose matches.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: README"
git push
```

---

## Self-review notes (against the spec)

- **Spec coverage:** separate repo + remote (T1), Vite/React/TS (T1), Tailwind v3 + DEPT tokens + dark mode (T2–T3), GSAP/@gsap/react (T2,T5), single long page + sticky TOC + scrollspy + progress (T7,T10,T11), light/dark toggle + no-flash (T3,T6), lava-lamp hero (T9), SplitText headline (T9), showcase pinned walkthroughs + parallax (T17), 16 sections ported verbatim (T12–T15), keep 7 GIFs (T16), reduced-motion + a11y (T8,T9,T17,T18), Pages Actions deploy + base path (T19), README (T20). All spec requirements mapped.
- **Count correction:** spec said 14 chapters; SOURCE actually has 16 sections. Inventory table + Tasks 12–15 use 16. (Worth updating the spec's table to match.)
- **Type consistency:** `SectionMeta`/`SECTIONS` (T7) consumed by `Nav` (T10); `pickActive` signature shared by test + impl (T7); `prefersReducedMotion`/`useGSAP`/`gsap`/`SplitText` exported once (T5) and imported everywhere; `Callout variant`, `PanelMockup variant`, `DemoSlot {src,caption}` props consistent between definition (T8) and usage (T12–15).
- **Open item:** Task 16 Step 2 — exact on-disk location of the 7 GIF media in SOURCE is resolved at execution time via the grep in Step 1 (SOURCE may carry empty placeholder `figure.demo` blocks, handled by the fallback).
