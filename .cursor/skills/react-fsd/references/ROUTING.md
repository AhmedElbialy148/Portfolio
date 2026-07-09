# react-router v6 on top of FSD

react-router owns URL → component mapping. FSD owns the rest of `src/`. This file is how they coexist in a Vite SPA.

## App shell: `src/app/`

The FSD `app` layer is `src/app/` — the application shell:

- Global providers (theme, query client, auth context) live in `src/app/providers.tsx`.
- The router lives in `src/app/router.tsx`.
- The entry point (`src/main.tsx`) mounts `<App />` from `src/app/app.tsx`.
- Everything else (FSD `views/`, `widgets/`, `features/`, `entities/`, `shared/`) lives in `src/` as siblings.

## Page composition: thin router wiring, fat FSD `views/` slice

The router entry is a **URL-bound wiring point** — its only job is to map the URL to a FSD view slice. Business logic, layout composition, and data orchestration live in the FSD `views/<view-name>/` slice.

```tsx
// ✅ src/app/router.tsx — route wiring only
import { createBrowserRouter } from "react-router-dom"
import { HomeView } from "@/views/home"
import { CodesView } from "@/views/codes"

export const router = createBrowserRouter([
  { path: "/", element: <HomeView /> },
  { path: "/codes", element: <CodesView /> },
])
```

```tsx
// ✅ src/views/home/ui/home-view.tsx — composition lives here
/**
 * @file views/home/ui/home-view.tsx
 * Home view composition: hero, skills, experience, projects, contact.
 */
import { HeroSection } from "@/widgets/hero-section"
import { SiteHeader } from "@/widgets/site-header"

/**
 * Renders the home view layout.
 */
export function HomeView() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        {/* … */}
      </main>
    </>
  )
}
```

```ts
// src/views/home/index.ts
export { HomeView } from "./ui/home-view"
```

## Client-only SPA

Unlike Next.js, there are no Server Components. Every component is a client component unless you add SSR later (e.g. via a framework migration).

Rules:

- **Data fetching** happens in feature `model/` hooks (TanStack Query) or entity `api/` functions — see `react-data` skill.
- **Don't fetch directly from UI components.** The feature hook owns the fetch; the component renders state.
- **Lazy routes** are allowed for code-splitting:

```tsx
import { lazy, Suspense } from "react"

const CodesView = lazy(function loadCodesView() {
  return import("@/views/codes").then((m) => ({ default: m.CodesView }))
})

// In router:
{
  path: "/codes",
  element: (
    <Suspense fallback={<PageSkeleton />}>
      <CodesView />
    </Suspense>
  ),
}
```

Prefer named exports from view slices; the lazy import maps to the named export internally.

## Document title & meta

Set document title in the view slice, not in the router:

```tsx
import { useEffect } from "react"

export function CodesView() {
  useEffect(function setCodesPageTitle() {
    document.title = "Projects — Ahmed Adel"
  }, [])

  return (/* … */)
}
```

For richer SEO, add `react-helmet-async` at the view layer.

## Navigation

Use `<Link>` from react-router for internal navigation. Plain `<a href>` causes full page reloads.

```tsx
import { Link } from "react-router-dom"

<Link to="/codes">All projects</Link>
```

External links (GitHub, email) stay as `<a href="…" target="_blank" rel="noopener noreferrer">`.

## Scroll-to-section on home page

For single-page scroll layouts (home with anchored sections), use hash links or a scroll utility in a feature:

```tsx
<a href="#projects">Projects</a>
// or
<button onClick={() => scrollToSection("projects")}>Projects</button>
```

Keep scroll logic in `features/scroll-to-section/` or `shared/lib/scroll.ts`.

## Error boundaries

Wrap routes in an error boundary at the app layer:

```tsx
// src/app/error-boundary.tsx
export function RouteErrorBoundary() {
  return useRouteError() // react-router's useRouteError
}
```

Business-specific error UI lives in `views/<view>/ui/error-fallback.tsx`.

## Don'ts

- Don't put business logic in `app/router.tsx`. The app layer is plumbing.
- Don't create per-route `components/` folders — components live in FSD slices.
- Don't import from `@/app/...` anywhere else. The app layer is a sink, not a source.
- Don't use plain `<a href="/codes">` for internal links — use `<Link to="/codes">`.
