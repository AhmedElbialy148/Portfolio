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
| 1     | `HeroSection`       | none          | bg + dot grid + accent glow |
| 2     | `ServicesSection`   | `#services`   | band              |
| 3     | `SkillsSection`     | `#skills`     | bg                |
| 4     | `ExperienceSection` | `#experience` | band              |
| 5     | `EducationSection`  | `#education`  | bg                |
| 6     | `ProjectsSection`   | `#projects`   | band              |
| 7     | `SiteFooter`        | `#contact`    | bg + accent glow  |

Sections alternate between `--color-bg` and `--color-band` (with top and bottom borders) so section breaks are visible. `section[id]` has `scroll-margin-top` so the sticky header doesn't cover anchor targets.

Header links use `<Link to={{ pathname: "/", hash }}>`. `HomeView` scrolls to `location.hash` on each navigation, so the links also work from `/codes`.

## Header navigation

| Item       | Target                          | Desktop | Mobile menu |
| ---------- | ------------------------------- | ------- | ----------- |
| Logo       | `/`                             | ✓       | ✓           |
| Sections     | `NAV_ITEMS` → `/#<id>`        | ✓ (≥ lg) | ✓          |
| All projects | `/codes`                      | ✓ (≥ lg) | ✓          |
| Theme        | toggles `data-theme`          | ✓        | ✓          |
| Let's talk   | `mailto:` `PROFILE.email`     | ✓ (≥ sm) | ✓ (< sm)   |

GitHub, LinkedIn and email icons are in the hero and the contact section, not the header.
