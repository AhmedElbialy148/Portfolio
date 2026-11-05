# Architecture Decision Records

Decisions that have already been made, with the reasoning behind them. ADRs are immutable once accepted. To change a decision, add a new ADR that supersedes the old one.

| ADR                                              | Title                                         | Status   | Date       |
| ------------------------------------------------ | --------------------------------------------- | -------- | ---------- |
| [0001](0001-feature-sliced-design.md)            | Organise `src/` with Feature-Sliced Design    | accepted | 2026-07-09 |
| [0002](0002-content-as-typed-config.md)          | Keep all site content in one typed config file | accepted | 2026-07-09 |
| [0003](0003-vite-spa-over-ssr.md)                | Ship as a Vite SPA, not an SSR/SSG framework  | accepted | 2026-07-09 |
| [0004](0004-lazy-load-3d-hero.md)                | Lazy-load the three.js hero scene             | accepted | 2026-07-09 |

The dates are those of the refactor commit (`5b63b10`) that introduced these choices. The ADRs were written retroactively on 2026-11-05.
