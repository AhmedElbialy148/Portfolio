# Routes and sections reference

Defined in [src/app/router.tsx](../../src/app/router.tsx). Every route renders inside `AppShell` (sticky `SiteHeader`, then `<main>` with the route outlet).

## Routes

| Path     | View        | `document.title`                       | Contents                                   |
| -------- | ----------- | -------------------------------------- | ------------------------------------------ |
| `/`      | `HomeView`  | `Ahmed Elbialy — Full-Stack Engineer · Backend-Focused` | All sections below, in order |
| `/codes` | `CodesView` | `Projects — Ahmed Elbialy`             | Back link, search input, full project grid |
| other    | none        | none                                   | React Router's default error screen (no custom 404) |

Static fallback title (before JS runs): `Ahmed Elbialy`, set in `index.html`.

## Home page sections

| Order | Widget              | Anchor id     | Background        |
| ----- | ------------------- | ------------- | ----------------- |
| 1     | `HeroSection`       | none          | bg + accent glow  |
| 2     | `SkillsSection`     | `#skills`     | bg                |
| 3     | `ExperienceSection` | `#experience` | surface-2         |
| 4     | `EducationSection`  | `#education`  | bg                |
| 5     | `ProjectsSection`   | `#projects`   | bg                |
| 6     | `SiteFooter`        | `#contact`    | surface-1         |

The only in-page link is the hero's "View work" button (`#projects`). The header has no links to these anchors.

## Header navigation

| Item       | Target                          | Desktop | Mobile menu |
| ---------- | ------------------------------- | ------- | ----------- |
| Logo       | `/`                             | ✓       | ✓           |
| Projects   | `/codes`                        | ✓       | ✓ ("All Projects") |
| Email      | `mailto:` from `SITE_LINKS`     | ✓       | ✓           |
| GitHub     | `SITE_LINKS.github`             | ✓       | ✓           |
| LinkedIn   | `SITE_LINKS.linkedin`           | ✓       | ✓           |
| Theme      | toggles `data-theme`            | ✓       | ✓           |
