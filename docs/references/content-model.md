# Content model reference

Reference for every exported type and constant in [src/shared/config/site-data.ts](../../src/shared/config/site-data.ts) and [src/shared/config/asset-slots.ts](../../src/shared/config/asset-slots.ts). Each constant is a `readonly` array declared `as const`.

## `PROFILE: Profile`

| Field             | Type                  | Rendered in                                                                     |
| ----------------- | --------------------- | ------------------------------------------------------------------------------- |
| `name`            | `string`              | Hero `<h1>` (last word in accent), header logo (first word), footer ©, page titles, photo `alt`, initials fallback |
| `role`            | `string`              | Hero line under the name, home page `document.title`                            |
| `location`        | `string`              | Hero status row, contact card                                                   |
| `email`           | `string`              | Hero "Get in touch", header "Let's talk", contact section `mailto:` links        |
| `phone`           | `string`              | Contact card `tel:` link (publicly visible)                                     |
| `bio`             | `string`              | **Not rendered.** Full CV summary, kept for reference                           |
| `tagline`         | `string`              | Hero paragraph. Keep it to two sentences                                        |
| `availability`    | `string`              | Hero status row, next to the green dot                                          |
| `currently`       | `{ company, focus }`   | "Currently at …" card on the hero photo. Keep `focus` to a few words             |
| `spokenLanguages` | `readonly string[]`   | Contact card "Languages" row                                                    |
| `resumeSlot`      | `string`              | **Not rendered.** The hero uses `ASSET_SLOTS.resume` instead. Keep the two equal. |

## `STATS: readonly Stat[]`

Hero stats strip, four cells (`{ value, label }`). Every number must be checkable against the CV or the data in this file. Update "Public projects" when `PROJECTS` changes.

## `NAV_ITEMS: readonly NavItem[]`

Header section links (`{ id, label }`). `id` is the target element id on the home view, without `#`.

## `SERVICES: readonly Service[]`

Rendered by `ServicesSection` ("What I do") as four cards in a row on desktop.

| Field         | Type                | Notes                                   |
| ------------- | ------------------- | --------------------------------------- |
| `id`          | `string`            | React key                               |
| `title`       | `string`            | Card heading                            |
| `icon`        | `SkillIcon`         | See `SKILL_CATEGORIES.icon`             |
| `description` | `string`            | One or two sentences                    |
| `tags`        | `readonly string[]` | Up to three, rendered as `#tag` in mono |

## `SKILL_CATEGORIES: readonly SkillCategory[]`

Rendered by `SkillsSection` → `SkillCard` as a three-column grid of chip cards ("Skills & technologies"), in array order.

| Field   | Type                | Notes                                                         |
| ------- | ------------------- | ------------------------------------------------------------- |
| `id`    | `string`            | React key                                                     |
| `title` | `string`            | Card heading (`<h3>`)                                         |
| `icon`  | `SkillIcon`         | `server`, `brain`, `cloud`, `layers`, `database` or `workflow`. Checked at compile time; glyphs live in [skill-icon.tsx](../../src/shared/ui/skill-icon/skill-icon.tsx) |
| `items` | `readonly string[]` | Short technology names, one chip each. Keep them to 1–3 words. Labels in `TECH_ICONS` get a logo |

## `EXPERIENCES: readonly Experience[]`

Rendered by `ExperienceSection` → `ExperienceCard`, in array order.

| Field        | Type                | Rendered as                        |
| ------------ | ------------------- | ---------------------------------- |
| `id`         | `string`            | React key                          |
| `company`    | `string`            | Card title                         |
| `position`   | `string`            | Accent-coloured subtitle           |
| `dates`      | `string`            | Mono text, top right (free text)   |
| `location`   | `string`            | `location · workType` line         |
| `workType`   | `string`            | e.g. `On-Site`, `Remote · Part-Time` |
| `highlights` | `readonly string[]` | Always-visible bullets. Keep to about six   |
| `moreHighlights` | `readonly string[]?` | Extra detail behind a "Show N more" toggle |
| `stack`      | `readonly string[]?` | Mono chips under the bullets           |

## `EDUCATION: readonly Education[]`

Rendered by `EducationSection` → `EducationCard` in a two-column grid.

| Field         | Type                 | Notes                     |
| ------------- | -------------------- | ------------------------- |
| `id`          | `string`             | React key                 |
| `institution` | `string`             | Card title                |
| `degree`      | `string`             | Accent subtitle           |
| `dates`       | `string`             | Free text                 |
| `location`    | `string`             |                           |
| `details`     | `readonly string[]?` | Optional bullet list      |

## `PROJECTS: readonly Project[]`

Rendered by `ProjectCard`. The home page shows `getFeaturedProjects()` (where `featured === true`). `/codes` shows all of them, filtered by `useProjectSearch`.

| Field         | Type                | Notes                                                                    |
| ------------- | ------------------- | ------------------------------------------------------------------------ |
| `id`          | `string`            | React key **and** the screenshot filename: `/assets/projects/<id>.png`    |
| `name`        | `string`            | Card title. Searchable                                                   |
| `description` | `string`            | Card body. Searchable                                                    |
| `liveUrl`     | `string`            | "Live" button. Always rendered, so it can't be left empty               |
| `githubUrl`   | `string`            | "Code" button. Always rendered                                           |
| `imageSlot`   | `string`            | Key into `GRADIENT_PLACEHOLDERS` (`gradient-1` … `gradient-8`)           |
| `tags`        | `readonly string[]` | Outline badges. Searchable                                               |
| `featured`    | `boolean`           | Show on the home page                                                    |

Search matches a case-insensitive substring against `name + description + tags`.

## `SITE_LINKS: readonly SiteLink[]`

| Field      | Type      | Notes                                                                             |
| ---------- | --------- | --------------------------------------------------------------------------------- |
| `id`       | `string`  | React key                                                                         |
| `label`    | `string`  | Visible text                                                                      |
| `href`     | `string`  | URL                                                                               |
| `external` | `boolean` | `true` entries render in the header nav, mobile menu and contact section, opening in a new tab. `false` entries aren't rendered by any component |

## `ASSET_SLOTS` (asset-slots.ts)

| Key                     | Value                                    |
| ----------------------- | ---------------------------------------- |
| `resume`                | `/Ahmed_Adel_CV.pdf`                     |
| `portrait`              | `/assets/profile-cutout.webp`            |
| `lotties.coding`        | `/assets/lotties/codinglottie.json` (hero) |
| `lotties.stacks`        | `/assets/lotties/stackslottie.json`      |
| `lotties.cloud`         | `/assets/lotties/cloudlottie.json`       |
| `lotties.ai`            | `/assets/lotties/ai-lottie.json`         |
| `lotties.frontend`      | `/assets/lotties/frontend-lottie.json`   |
| `projectScreenshot(id)` | `/assets/projects/${id}.png`             |

`getProjectGradient(slot)` returns the Tailwind gradient classes for an `imageSlot` and falls back to `gradient-1`.

Note: the skill categories reference Lottie paths directly in `site-data.ts`, not through `ASSET_SLOTS`. The Backend category uses `frontend-lottie.json` and the Frontend category uses `stackslottie.json`. This was intentional (commit `d3e6fc1`), but the filenames no longer describe their content.
