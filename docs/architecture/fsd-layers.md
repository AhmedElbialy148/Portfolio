# Layering with Feature-Sliced Design

Explanation: how the `src/` tree is organised and why. The decision itself is recorded in [ADR-0001](../decisions/0001-feature-sliced-design.md).

## The layers

Feature-Sliced Design (FSD) arranges code into layers. A module may import only from layers **below** it:

```
app       → router, providers, AppShell            (imports everything below)
views     → home, codes                            (one slice per route)
widgets   → site-header, hero-section, skills-section, experience-section,
            education-section, projects-section, site-footer
features  → theme-toggle, project-search           (things the user *does*)
entities  → project, experience, skill, education  (things the site *shows*)
shared    → ui/ (button, card, badge, input, section-heading,
                 lottie-animation, scene-3d)
            config/ (site-data, asset-slots, tokens.css)
            lib/ (cn, use-reduced-motion)
```

Each slice exposes a public API through `index.ts`. Other layers import `@/entities/project`, never `@/entities/project/ui/project-card`. Within a slice, `ui/` holds components and `model/` holds hooks, state and context.

## How content flows

Content is data, and components are views of that data:

1. `shared/config/site-data.ts` declares typed constants (`PROFILE`, `EXPERIENCES`, `PROJECTS` …).
2. `entities/*` render **one** item (`ProjectCard` takes a `Project`).
3. `widgets/*` read a whole constant and map it into a section of entity cards.
4. `views/*` stack widgets into a page and set `document.title`.
5. `app/router.tsx` maps URLs to views.

The content types live in `shared/` rather than in each entity because widgets, features (search) and entities all need them, and `shared` is the only layer every other layer may import. Moving `Project` into `entities/project/model` would be more canonical FSD, but it would make `features/project-search` import from `entities`, which FSD allows (features sit above entities) but which adds a dependency for no practical gain at this size.

## Is FSD overkill here?

For about 75 source files and two routes, arguably yes, and the reasoning in the ADR is mostly "consistency with how the author works day to day". What it buys in practice:

- A content edit never touches a component, and a style change never touches content.
- Each card can be read and tested on its own, since it receives props and never reaches into config.
- The rules are easy to enforce later with `steiger` if the site grows (blog, case-study pages).

What it costs: more folders and `index.ts` barrels than a flat `components/` directory would need.

## Conventions used throughout

- A file-level TSDoc header (`@file …`) on every module.
- Named function expressions inside hooks (`useEffect(function syncThemeToDocument() { … })`), so stack traces and React DevTools show meaningful names.
- `cn()` (clsx + tailwind-merge) for every conditional class string.
- UI primitives follow the shadcn pattern: CVA variants, with `asChild` via Radix `Slot`.

## Leftovers outside the layers

`src/components/` (old images, Lottie files and an old CV PDF) predates the FSD refactor in commit `5b63b10`. Nothing imports it. See the [review](../review/2026-11-05-portfolio-review.md#repository-hygiene).
