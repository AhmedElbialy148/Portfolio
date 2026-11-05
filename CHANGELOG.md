# Changelog

All notable changes to this portfolio are recorded here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- Project documentation under `docs/`: guides, reference, C4 architecture, ADRs and a portfolio review.
- This changelog.

### Changed

- README rewritten as an entry point that links into `docs/`, and the live-URL label now matches its link.
- CV (`public/Ahmed_Adel_CV.pdf`) updated.

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
