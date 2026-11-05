# Changelog

All notable changes to this portfolio are recorded here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- `PROFILE.tagline`, `availability`, `currently` and `spokenLanguages`, plus `STATS`, `NAV_ITEMS` and `SERVICES` in `site-data.ts`.
- Header links scroll to home sections from any page, and anchor targets clear the sticky header.
- Project documentation under `docs/`: guides, reference, C4 architecture, ADRs and a portfolio review.
- This changelog.

### Changed

- **Home page layout redesign**, inspired by a dark single-accent portfolio template:
  - Hero: smaller type, profile photo with accent rings and a "Currently" card, "Get in touch" + Resume CTAs, availability dot, social icons and a stats strip. The Lottie and three.js scene are no longer rendered.
  - Header: in-page section links, "All projects" and a "Let's talk" CTA. External links moved to the hero and contact section.
  - New "What I do" section (`ServicesSection`, `SERVICES`) with four compact cards.
  - Skills redesigned as a grid of chip cards. Chips show monochrome brand logos (Simple Icons, CC0) that take the brand colour on hover. Technologies without a logo, such as AWS services and concepts, stay text-only with short technology names. The Developer Tools and Languages categories were removed, and languages now appear in the contact card.
  - Hero portrait: a transparent cutout (`profile-cutout.webp`, 800 × 1200, 75 kB) standing in front of the gold rings and glow, plus a richer backdrop (`hero-backdrop.tsx`): a glowing gold arc, pulsing particles and a fine line grid with a spotlight behind the portrait, with the bottom edge faded into the page. Works in both themes. `ASSET_SLOTS.profile` replaced by `ASSET_SLOTS.portrait`.
  - Contact section with a details card (email, phone, location, languages).
  - Sections alternate between `bg` and the new `--color-band` token, and headings use a mono eyebrow label.
- Content width moved into a shared `Container`: `max-w-7xl` (up from `max-w-6xl`) with tighter side padding.
- MIS experience condensed from 17 bullets to 6, with the rest behind a "Show more" toggle and a tech-stack chip row (`Experience.moreHighlights`, `Experience.stack`).
- The hero card now reads "Currently at MIS · Backend systems · AI agents", and the tagline leads with backend work.
- `SkillCategory.icon` is now a `SkillIcon` union, and `lottieSrc` was removed.
- README rewritten as an entry point that links into `docs/`, and the live-URL label now matches its link.
- CV (`public/Ahmed_Adel_CV.pdf`) updated.

### Fixed

- Visitors with "reduce motion" turned on saw empty sections: `useReducedMotion` returned `false` on first render, so scroll-in cards mounted hidden and never revealed. The hook now reads the preference synchronously, and the app is wrapped in `<MotionConfig reducedMotion="user">`, so every Motion component honours the setting.
- Font sizes were inflated site-wide: `--text-lg/xl/2xl/3xl` in `tokens.css` overrode Tailwind's own variables, so `text-3xl` rendered at 64 px instead of 30 px.

### Performance

- Main JS bundle down from about 245 kB to 158 kB gzipped, and the 245 kB three.js chunk is no longer loaded, because the hero and skills no longer use Lottie or three.js.

## [1.0.0] - 2026-07-09

Full rewrite of the 2023 site.

### Added

- Vite 7 + React 19 + TypeScript (strict) + Tailwind CSS v4 stack, organised with Feature-Sliced Design.
- Typed content config (`site-data.ts`) for profile, skills, experience, education, projects and links.
- Sections: hero, "What I do" skills, experience, education, featured projects, contact footer.
- `/codes` page with the full project gallery and live search.
- Light and dark themes with a flash-free bootstrap script, and a graphite + gold design-token system.
- Lazy-loaded three.js wireframe hero scene, Lottie animations, Motion entrance and tilt effects.
- Reduced-motion handling for the hero scene and Lottie animations.

### Changed

- Positioning moved from "Full Stack web developer" to "Full-Stack Engineer · Backend-Focused" with an AI-agent focus.
- Live URL moved to Vercel.

### Removed

- Create React App toolchain and unused legacy files.

## [0.1.0] - 2023-10-07

### Added

- First version of the portfolio (Create React App), with resume updates through 2024-04-25.

[Unreleased]: https://github.com/AhmedElbialy148/Portfolio/compare/fe5d7e5...HEAD
[1.0.0]: https://github.com/AhmedElbialy148/Portfolio/compare/dd98bba...fe5d7e5
[0.1.0]: https://github.com/AhmedElbialy148/Portfolio/commits/dd98bba
