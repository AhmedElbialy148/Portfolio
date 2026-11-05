# Design tokens reference

Reference for the CSS custom properties in [src/shared/config/tokens.css](../../src/shared/config/tokens.css). Components use them through Tailwind arbitrary values, for example `bg-[var(--color-surface-1)]` and `rounded-[var(--radius-3)]`. A small subset is re-exposed to Tailwind's theme in [src/index.css](../../src/index.css) via `@theme inline`.

The theme is selected with `data-theme="light" | "dark"` on `<html>`. Dark is the default. An inline script in [index.html](../../index.html) sets it before first paint from `localStorage["theme"]` to avoid a flash, and `ThemeProvider` keeps it in sync afterwards. The system `prefers-color-scheme` setting isn't consulted.

## Colour

| Token                  | Light                      | Dark                       | Used for                          |
| ---------------------- | -------------------------- | -------------------------- | --------------------------------- |
| `--color-bg`           | `#fafaf9`                  | `#0a0a0b`                  | Page background                   |
| `--color-surface-1`    | `#ffffff`                  | `#111113`                  | Cards, footer                     |
| `--color-surface-2`    | `#fafaf9`                  | `#18181b`                  | Hover fills, photo backdrop       |
| `--color-band`         | `#f5f5f4`                  | `#0e0e10`                  | Alternating section bands, between bg and surface-1 so cards stand out |
| `--color-fg`           | `#1c1917`                  | `#ededef`                  | Primary text                      |
| `--color-fg-muted`     | `#78716c`                  | `#9b9ba3`                  | Body copy, bullets                |
| `--color-fg-subtle`    | `#a8a29e`                  | `#6c6c75`                  | Dates, captions, placeholders     |
| `--color-border`       | `#e7e5e4`                  | `#26262b`                  | Card borders                      |
| `--color-border-strong`| `#d6d3d1`                  | `#34343a`                  | Outline buttons                   |
| `--color-accent`       | `#b8860b`                  | `#c9a227`                  | Brand gold: links, eyebrow, primary button |
| `--color-accent-fg`    | `#ffffff`                  | `#0a0a0b`                  | Text on accent                    |
| `--color-accent-hover` | `#9a7209`                  | `#dbb84a`                  | Defined, currently unused         |
| `--color-accent-soft`  | `rgba(184,134,11,.12)`     | `rgba(201,162,39,.14)`     | Icon tiles, selection, badges     |
| `--color-accent-glow`  | `rgba(184,134,11,.25)`     | `rgba(201,162,39,.30)`     | Hero radial glow                  |
| `--color-danger`       | `#c0392b`                  | —                          | Defined, currently unused         |
| `--color-success`      | `#1a7a4c`                  | —                          | Defined, currently unused         |

### Measured contrast (WCAG 2.x)

| Pair                                  | Ratio  | AA normal text (4.5) |
| ------------------------------------- | ------ | -------------------- |
| Light: accent on white                | 3.25   | ✗                    |
| Light: white text on accent button    | 3.25   | ✗                    |
| Light: fg-muted on white              | 4.80   | ✓                    |
| Light: fg-subtle on white             | 2.52   | ✗                    |
| Dark: accent on surface-1             | 7.80   | ✓                    |
| Dark: fg-muted on surface-1           | 6.84   | ✓                    |
| Dark: fg-subtle on surface-1          | 3.63   | ✗                    |
| Dark: button text on accent           | 8.18   | ✓                    |

## Typography

| Token            | Value                                       |
| ---------------- | ------------------------------------------- |
| `--font-sans`    | Space Grotesk, system-ui (Google Fonts)     |
| `--font-display` | Space Grotesk, system-ui                    |
| `--font-mono`    | JetBrains Mono, ui-monospace                |
| `--text-md`      | 16 px, body only                            |
| `--leading-*`    | tight 1.15 · snug 1.3 · normal 1.55         |

Components use Tailwind's text scale (`text-sm`, `text-3xl` …). **Don't define `--text-xs` to `--text-9xl` here.** Tailwind v4 compiles `text-xl` to `font-size: var(--text-xl)`, so a `:root` token with that name overrides the utility site-wide. That bug inflated every heading until 2026-11-05.

Page width and side padding come from the `Container` component ([shared/ui/container](../../src/shared/ui/container/container.tsx)): `max-w-7xl` (1280 px), `px-5` / `md:px-8`.

## Spacing, radius, shadow

| Token group  | Values                                                       |
| ------------ | ------------------------------------------------------------ |
| `--space-1…9`| 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px (defined, mostly unused; components use Tailwind spacing) |
| `--radius-1/2/3/full` | 6 · 10 · 16 · 999 px                                 |
| `--shadow-1/2/3` | Hairline · raised · overlay (dark theme overrides)       |

## Motion

| Token        | Value                           |
| ------------ | ------------------------------- |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| `--dur-1/2/3`| 120 · 180 · 260 ms              |

Under `prefers-reduced-motion: reduce`, CSS animations and transitions are reduced to about 0 ms. JavaScript-driven Motion animations aren't covered by that rule. The hero's 3D scene and Lottie files check the preference themselves, but the card entrance animations don't.

## Layering

| Token        | Value |
| ------------ | ----- |
| `--z-sticky` | 30 (site header) |
| `--z-modal`  | 50 (reserved)    |
