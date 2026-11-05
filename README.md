# Ahmed Elbialy — Portfolio

Personal portfolio for Ahmed Elbialy, a backend-focused full-stack engineer (AI agents, APIs, cloud). It's a static single-page app built with Vite, React 19, TypeScript and Tailwind CSS v4.

**Live:** [portfolio-two-puce-19.vercel.app](https://portfolio-two-puce-19.vercel.app)

## Quick start

Requires **Node.js 22+** (see [.nvmrc](.nvmrc)).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script            | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Vite dev server with HMR                         |
| `npm run build`   | Type-check (`tsc --noEmit`), then build to `dist/` |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | Type-check only (no ESLint configured)           |

## Where things are

- **All site content** (profile, skills, experience, education, projects, links) is in [src/shared/config/site-data.ts](src/shared/config/site-data.ts). Most updates only need that one file. See [Update site content](docs/guides/update-content.md).
- **Design tokens** (colours, type, spacing, motion) are in [src/shared/config/tokens.css](src/shared/config/tokens.css).
- **Static assets** (CV, photo, screenshots, Lottie files) are in [public/](public/). See [public/assets/README.md](public/assets/README.md).

```
src/
├── app/        # Router, providers, layout shell
├── views/      # Pages: home (/), codes (/codes)
├── widgets/    # Page sections: header, hero, skills, experience, education, projects, footer
├── features/   # User interactions: theme toggle, project search
├── entities/   # Domain cards: project, experience, skill, education
└── shared/     # UI kit, config (content + tokens), lib helpers
```

The layering follows Feature-Sliced Design. The reasons are in [ADR-0001](docs/decisions/0001-feature-sliced-design.md).

## Documentation

Start at [docs/README.md](docs/README.md), which indexes guides, reference, architecture and decisions.

## Stack

Vite 7 · React 19 · TypeScript 5 (strict) · react-router-dom 7 · Tailwind CSS 4 · Motion · lottie-react · react-three-fiber (lazy-loaded hero scene) · Radix Slot + CVA for UI primitives.
