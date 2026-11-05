# ADR-0003: Ship as a Vite SPA, not an SSR/SSG framework

- **Status:** accepted
- **Date:** 2026-07-09 (recorded retroactively 2026-11-05)
- **Supersedes:** —
- **Superseded by:** —

## Context

The site has two routes, no data fetching and no backend. The 2023 version was a Create React App SPA. The rewrite needed a fast dev loop, a modern React and TypeScript toolchain, and free static hosting.

## Decision

Build with Vite 7 + React 19 as a client-rendered SPA, use `react-router-dom` (`createBrowserRouter`) for routing, and deploy the `dist/` output as static files.

## Consequences

**Positive**

- Simple toolchain, instant HMR, and output that can be hosted anywhere.
- No server runtime to pay for or maintain.

**Negative**

- The HTML has no content until JavaScript runs. Crawlers and link-preview bots (LinkedIn, Slack, WhatsApp) see only `<title>` and the static meta description, with no Open Graph tags or body text.
- Deep links need a host-level rewrite to `index.html`, configured in `vercel.json` (see [Deploy](../guides/deploy.md#spa-routing-rewrite)).
- Per-page titles are set in `useEffect` after render.

**Neutral**

- Migrating to static prerendering later (Astro, Next.js `output: "export"`, or `vite-plugin-ssg`) would reuse almost all components, because content is already plain data ([ADR-0002](0002-content-as-typed-config.md)).

## Alternatives considered

- **Next.js (App Router, static export):** real HTML per route and built-in metadata API, at the cost of a heavier framework.
- **Astro:** best fit for a mostly static content site with islands of interactivity. Would have required rewriting the routing and layout layer.

## Links

- Related: [ADR-0001](0001-feature-sliced-design.md), [ADR-0004](0004-lazy-load-3d-hero.md)
