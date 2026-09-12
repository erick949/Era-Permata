# Era Permata Sari — Portfolio

React + Vite portfolio for Era Permata Sari (multimedia creator: photography,
video production, editing, content, social media). Built with two mandated
technologies integrated natively into React:

- **Liquid Glass** — the real `Container` class vendored from
  [dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js)
  (not on npm, so it's vendored at `src/lib/liquid-glass/`), wrapped in a
  React component (`src/components/LiquidGlass/LiquidGlassPanel.jsx`) using
  portals + proper mount/unmount lifecycle. Used on the navbar and the
  Services cards, per the brief.
- **React Three Fiber** — a small organic 3D form in the hero
  (`src/components/Hero3D/`), lazy-loaded, paused when the tab is hidden,
  and reduced-motion aware.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build (verified clean: 0 errors, 0 lint warnings)
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

**I could not visually verify this in an actual browser from my sandbox**
(no GUI/browser available there) — only `npm run build` and `npm run lint`,
both of which are clean. Please run `npm run dev` and look it over before
treating this as final, especially the two items flagged below.

## Things worth checking first

1. **The Liquid Glass background snapshot.** This library doesn't do live
   real-time refraction — it takes one screenshot of the page (`html2canvas`)
   and every glass surface samples that static image. It re-captures on
   resize (debounced, see `useLiquidGlassRecapture`), but if it looks stale
   after a big content change, that's this technique's inherent limitation,
   not a bug to chase.
2. **html2canvas capturing the Three.js canvas.** The hero's WebGL canvas
   has `preserveDrawingBuffer: true` specifically so html2canvas can read its
   pixels when it snapshots the page for the navbar's glass. This is a
   known-fragile combination across browsers — if the navbar's glass looks
   like it's refracting a blank hero area, this is the first thing to check.

## Where to tune the visual feel

Per the brief, the first pass is meant to be moderate, then adjusted together:

| What | Where |
|---|---|
| Glass blur / refraction / tint | `src/lib/liquid-glass/container.js` (shader + `tintOpacity`) and per-usage `tintOpacity`/`borderRadius` props on `<LiquidGlassPanel>` (Navbar.jsx, Services.jsx, SocialMedia.jsx, Contact.jsx) |
| 3D object rotation/float/mouse-reaction speed | `src/components/Hero3D/OrganicBlob.jsx` (the multipliers in `useFrame`) |
| 3D object size/position | `scale` prop in `Hero3D.jsx`, container sizing in `hero3d.css` |
| Lighting intensity | `Hero3D.jsx` (`ambientLight`, `directionalLight`, `pointLight`) |
| Color palette / type / spacing | `src/styles/theme.css` (all design tokens) |
| Scroll-reveal amount/speed | `--dur-slow` in theme.css, `useReveal` hook options |

## Adding Era's real content

Nothing about Era's actual work, employers, dates, or social links was
invented — everything lives in `src/data/*.js` with clear placeholder
markers wherever real information wasn't provided:

- `src/data/profile.js` — bio, tagline, email (`null` currently — the
  contact form and email link won't activate until this is set)
- `src/data/portfolio.js` — gallery items (currently placeholder tiles;
  add real photos/videos to `src/assets/portfolio/` and import them here)
- `src/data/projects.js` — featured project case studies
- `src/data/experience.js` — experience timeline
- `src/data/services.js` — services offered
- `src/data/social.js` — social platform URLs (`href: null` = disabled
  "coming soon" state)

## Architecture

```
src/
├── components/
│   ├── Navbar/, Hero/, Hero3D/, About/, Skills/, Portfolio/,
│   │   Projects/, Experience/, Services/, SocialMedia/, Contact/
│   ├── LiquidGlass/       — LiquidGlassPanel.jsx (React wrapper)
│   └── common/            — Footer, shared icons
├── lib/liquid-glass/      — vendored liquid-glass-js (see file header for patch notes)
├── data/                  — all site content (no invented facts)
├── hooks/                 — reveal-on-scroll, reduced-motion, page-visibility,
│                             pointer tracking, media queries, active-section,
│                             glass-recapture
└── styles/                — theme.css (tokens), base.css (reset + utilities)
```
