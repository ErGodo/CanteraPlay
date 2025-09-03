# Copilot instructions for CanteraPlay front-end

Keep guidance short and focused — this file is used by AI coding agents to make correct, low-risk changes.

## Project overview
- Next.js 14+ App Router project (TypeScript + React + TailwindCSS).
- Entry point: `src/app/page.tsx` (main landing page). Components live under `src/components/`.
- Swiper is used for carousels (`src/components/*Carousel.tsx`). Images use `next/image` with optional LQIP blur placeholders.

## What to change vs not to change
- Safe to edit: UI components in `src/components/` (Navbar, HeaderSection, ResultsCarousel, SponsorCarousel, Footer, etc.), styles in `src/app/globals.css` and Tailwind classes.
- Avoid changing: `package.json` scripts, Next.js config unless asked, and server-side lib code in `src/lib/*` without explicit instructions.

## Conventions & patterns
- Client vs Server components: Files needing hooks or browser APIs must include `"use client"` at top (e.g., `Navbar.tsx`). Default is server components.
- Date formatting via `src/lib/formatDate` — use `formatDMY` wrapper when rendering dates.
- Image LQIP: image objects may include `asset.metadata.lqip`; use `placeholder="blur"` and `blurDataURL` when present.
- Carousels use Swiper with breakpoints. Desktop behavior expects slidesPerView=2 and centeredSlides=false (see `ResultsCarousel.tsx`). Keep breakpoints consistent across carousels.

## Typical tasks & quick commands
- Run dev server: `npm run dev` (runs Next.js dev server).
- Build: `npm run build`.
- Lint/typecheck: `npm run lint` / `npm run typecheck` if present — otherwise rely on editor TS checks.

## Common pitfalls
- Forgetting `"use client"` when adding hooks (causes build-time errors). Add at file top before imports.
- Unbalanced JSX tags or template literals inside JSX (e.g., backticks in SVG fill `url(#id)`). Use expressions carefully: `fill={
  `url(#id)`
}`.
- CSS overflow on mobile menus: prefer centered, fixed positioning for popovers to avoid header padding issues.

## Files to inspect when debugging
- `src/app/page.tsx` — page composition and data fetching calls.
- `src/components/Navbar.tsx`, `HeaderSection.tsx` — header/menu behaviors.
- `src/components/ResultsCarousel.tsx`, `SponsorCarousel.tsx` — Swiper configuration and responsive rules.
- `src/lib/*` — helper functions for data formatting and fetch wrappers.

## Example edits
- To add a client-side animation to the mobile menu: add `"use client"`, use `useState` to toggle visibility, and animate with Tailwind classes `transition-opacity duration-300` + translate/scale classes.
- To make a carousel show 3 slides on wide screens: update breakpoints to `1024: { slidesPerView: 3 }` and set `centeredSlides: false`.

## When unsure
- If a change affects data fetching or server logic, open an issue instead of making breaking edits.
- Ask for clarification when touching `src/lib` helpers or build scripts.

---
If you want, I can expand this with explicit examples (code snippets) for the most common edits (menu, carousel, LQIP images).
