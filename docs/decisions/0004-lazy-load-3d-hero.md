# ADR-0004: Lazy-load the three.js hero scene

- **Status:** accepted
- **Date:** 2026-07-09 (recorded retroactively 2026-11-05)
- **Supersedes:** —
- **Superseded by:** —

## Context

The hero shows a rotating gold wireframe icosahedron (react-three-fiber) behind the coding Lottie animation. three.js, @react-three/fiber and drei together add about 900 kB of minified JavaScript, which is more than the rest of the app combined.

## Decision

Load the scene with `React.lazy()` + dynamic `import("@/shared/ui/scene-3d")` inside `<Suspense fallback={null}>`. Skip it entirely when the visitor has `prefers-reduced-motion: reduce`.

## Consequences

**Positive**

- The 3D code is a separate chunk, so the first paint isn't blocked on it.
- Visitors who ask for reduced motion never download it.

**Negative**

- Everyone else still downloads about 245 kB gzipped for a decorative element that is partly hidden behind the Lottie, at 70 % opacity with `pointer-events-none`. The `OrbitControls` included in the scene can't receive input for the same reason.

**Neutral**

- If the decoration is kept, an SVG or CSS equivalent would remove the dependency. That would be a new ADR superseding this one.

## Alternatives considered

- **Bundle it eagerly:** simpler, but it doubles the main chunk.
- **Static SVG or CSS wireframe:** near-zero cost. Not chosen at the time.

## Links

- Affects: [hero-section.tsx](../../src/widgets/hero-section/ui/hero-section.tsx), [hero-scene.tsx](../../src/shared/ui/scene-3d/hero-scene.tsx)
