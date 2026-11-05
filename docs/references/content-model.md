# Content model reference

Reference for every exported type and constant in [src/shared/config/site-data.ts](../../src/shared/config/site-data.ts) and [src/shared/config/asset-slots.ts](../../src/shared/config/asset-slots.ts). Each constant is a `readonly` array declared `as const`.

## `PROFILE: Profile`

| Field        | Type     | Rendered in                                                                     |
| ------------ | -------- | ------------------------------------------------------------------------------- |
| `name`       | `string` | Hero `<h1>`, header logo (first word only), footer ©, page titles, photo `alt`  |
| `role`       | `string` | Hero eyebrow line, home page `document.title`                                   |
| `location`   | `string` | Hero eyebrow line, contact section                                              |
| `email`      | `string` | Contact section `mailto:` link                                                  |
| `phone`      | `string` | Contact section `tel:` link (publicly visible)                                  |
| `bio`        | `string` | Hero paragraph                                                                  |
| `resumeSlot` | `string` | **Not rendered.** The hero uses `ASSET_SLOTS.resume` instead. Keep the two equal. |

## `SKILL_CATEGORIES: readonly SkillCategory[]`

Rendered by `SkillsSection` → `SkillCard`, one full-width card per category, in array order.

| Field       | Type                | Notes                                                               |
| ----------- | ------------------- | ------------------------------------------------------------------- |
| `id`        | `string`            | React key                                                           |
| `title`     | `string`            | Card heading (`<h3>`)                                               |
| `icon`      | `string`            | One of `server`, `brain`, `cloud`, `layers`, `database`, `workflow`, `wrench`, `languages`. Unknown values fall back to `server` |
| `items`     | `readonly string[]` | Bullet list                                                         |
| `lottieSrc` | `string?`           | Public URL of a Lottie JSON file. Omit to hide the animation column  |

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
| `highlights` | `readonly string[]` | Bullet list                        |

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
| `profile`               | `/assets/profile.jpg`                    |
| `lotties.coding`        | `/assets/lotties/codinglottie.json` (hero) |
| `lotties.stacks`        | `/assets/lotties/stackslottie.json`      |
| `lotties.cloud`         | `/assets/lotties/cloudlottie.json`       |
| `lotties.ai`            | `/assets/lotties/ai-lottie.json`         |
| `lotties.frontend`      | `/assets/lotties/frontend-lottie.json`   |
| `projectScreenshot(id)` | `/assets/projects/${id}.png`             |

`getProjectGradient(slot)` returns the Tailwind gradient classes for an `imageSlot` and falls back to `gradient-1`.

Note: the skill categories reference Lottie paths directly in `site-data.ts`, not through `ASSET_SLOTS`. The Backend category uses `frontend-lottie.json` and the Frontend category uses `stackslottie.json`. This was intentional (commit `d3e6fc1`), but the filenames no longer describe their content.
