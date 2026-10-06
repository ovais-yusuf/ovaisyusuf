# Muhammad Ovais Yusuf — portfolio

React + Vite portfolio. The redesign adapts the rendered reference at samsiddiqui.vercel.app while preserving Muhammad’s content and project assets.

## Run locally

Use Node.js 22.12+ (Node 24 also works).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. This is a Vite project, not Next.js.

```sh
npm run lint
npm run build
npm run preview
```

## Apply to your existing project

Back up your current working folder. Copy this project’s files into it, preserving your existing `.git`, `.vercel`, and private environment files. The archive intentionally excludes those folders, `node_modules`, and generated builds. Run `npm ci` before starting the updated project.

Keep `output-web.mp4`, `AN.mp4`, and `MC.mp4` at the project root. They are imported and bundled by Vite. `public/` contains the video poster frames and robotics report.

## Implementation

- `src/App.jsx`: homepage and shared section, navigation, card, tag and icon components.
- `src/portfolio.css`: scoped design tokens and desktop/tablet/mobile layouts.
- `src/data.js`: existing experience, skills, projects and contact destinations.
- `src/Router.jsx`: existing case-study routes,  scroll behavior, and not-found screen.
- `src/context/`: persisted light/dark theme.
- `vercel.json`: direct case-study URL rewrites for Vercel.

## Reference observations and intentional adaptations

The live reference was inspected at 1363 × 936. It has a 1280px outer container, 24px inner gutters, 64px navigation, a 1:2 split hero, 48px hero typography, 36px section headings, blue accents, rounded cards, and a two-column dark contact panel. Earlier prose describing it as an unboxed neutral editorial site did not match the rendered reference.

This implementation uses that measured structure. The four projects now form a balanced two-column grid. The aerial card uses a typography-only cover, without a video preview. The homepage aerial project has a typography-only cover, with no video preview. The detailed aerial case study retains its existing video. Other projects use labeled typographic covers. No screenshots, logos, or images were copied from the reference. No testimonials or awards were invented.

Existing project pages retain their detailed content and presentation. The TurtleBot project has been removed from the homepage and routes. Original source assets are retained in the archive. No resume PDF was supplied; the About action remains a genuine LinkedIn link.

## Contact form

The form uses `mailto:` and prepares a draft in the visitor’s email app. It does not submit to a server and does not claim a message was sent. A backend is not required.

## Verification performed

- `npm run lint`: passed.
- `npm run build`: passed.
- Server rendering: homepage, all three case studies, and the not-found route passed.
- Homepage heading, project content, and fragment targets checked.
- All three original video files inspected: H.264 video; robotics recordings also include AAC audio.
- Generated poster frames and the report PDF exist in the output.
- Original external destinations preserved. Frontiers was reachable. The external lookup tool could not verify the two Vercel demos, GitHub, LinkedIn or Google Scholar; these are unverified, not classified as broken.

## Verification still needed in a local browser

This environment’s cloud browser blocked localhost and local-file previews. Therefore revised-site screenshots, browser-console checks, visual comparison passes, responsive overflow checks, video playback, filter interactions, menu interactions, theme persistence and mail-app handoff were not browser-verified. No claim of pixel-perfect matching is made.

Inspect the local site at 1440 × 900, 1280 × 800, 768 × 1024 and 390 × 844 before publishing. Compare with the live reference at identical sizes. Use the menu, filters, theme toggle, project links and video controls. Check direct navigation and refresh on each case-study route.

The project has not been deployed to Vercel.

## Content update

Professional title: AI/ML Engineer. Experience now includes the current BSU aerial-scene role (Sept 2026–Current), BSU theorem-proving role (May–Sept 2026), Metro South AI Developer role (Jan–May 2026), and IMC Machine Learning Researcher role (Aug 2022–Aug 2024). The proof-certification card links directly to the supplied vignonoussa.com research page.

## Visual refinement pass

The name stays on one line with responsive sizing. Four skill categories preserve every previous skill while forming a balanced 2×2 grid, with blue/purple/cyan/indigo accents and top-aligned headings. All four project cards have equal-height covers and use a 2×2 desktop grid. About focus text, section heading tracking, skills/project header spacing, career body text, contact labels/inputs/button, and the contact heading gradient were adjusted against the measured reference. Mobile styles keep a single-column layout. The latest uploaded content changes are preserved.

Build, lint, and server-render checks were rerun. Local-browser visual validation remains unavailable in this environment; no new screenshot comparison is claimed.

## Echo Madrid addition

Added Ask Echo with its live app and GitHub links, AI / ML and Software filters, and a navy-and-gold project cover. Description and technologies reflect the live app’s How it works section.
