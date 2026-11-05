# ADR-0001: Organise `src/` with Feature-Sliced Design

- **Status:** accepted
- **Date:** 2026-07-09 (recorded retroactively 2026-11-05)
- **Supersedes:** —
- **Superseded by:** —

## Context

The 2023 version of the site kept everything in a flat `src/components/` folder, mixing images, PDFs, Lottie JSON and JSX. The July 2026 rewrite needed a structure that separates content from presentation and stays navigable as sections are added. The author uses Feature-Sliced Design in professional React and Next.js work.

## Decision

Organise `src/` into FSD layers (`app → views → widgets → features → entities → shared`). Each slice exposes a public `index.ts`, and imports only go downward. Path alias `@/` → `src/`.

## Consequences

**Positive**

- Clear place for every new thing: a new page section is a widget, a new card type is an entity.
- Content (`shared/config`) is isolated from UI, which enables [ADR-0002](0002-content-as-typed-config.md).
- The structure matches the author's day-to-day conventions, so there's no context switch.

**Negative**

- More folders and barrel files than a site of this size strictly needs.
- Layer rules aren't enforced by tooling yet (no `steiger` or ESLint boundaries).

**Neutral**

- `src/components/` was left behind as an unreferenced legacy folder.

## Alternatives considered

- **Flat `components/` + `data/`:** less ceremony, but no rule for where hooks, features and sections go as the site grows.
- **Next.js App Router conventions:** rejected together with SSR. See [ADR-0003](0003-vite-spa-over-ssr.md).

## Links

- Explanation: [Layering with Feature-Sliced Design](../architecture/fsd-layers.md)
- Affects: everything under `src/`
