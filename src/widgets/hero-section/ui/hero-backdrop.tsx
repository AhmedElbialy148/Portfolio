/**
 * @file widgets/hero-section/ui/hero-backdrop.tsx
 * Decorative layers for the hero: the section backdrop (grid, spotlight, vignette) and the
 * halo behind the portrait (glowing arc, orbit ring, particles). All layers are aria-hidden
 * and pointer-events-none; animation only runs when motion is allowed.
 */

import { useId, type CSSProperties } from "react"

/** Glowing particles around the portrait, as % of the portrait box. */
const PARTICLES: ReadonlyArray<{ x: number; y: number; size: number; delay: number }> = [
  { x: -6, y: 14, size: 3, delay: 0 },
  { x: 2, y: 42, size: 2, delay: 1.2 },
  { x: -10, y: 64, size: 4, delay: 2.1 },
  { x: 14, y: 4, size: 2, delay: 0.6 },
  { x: 84, y: 6, size: 3, delay: 1.8 },
  { x: 104, y: 22, size: 4, delay: 0.3 },
  { x: 110, y: 48, size: 2, delay: 2.6 },
  { x: 98, y: 70, size: 3, delay: 1.1 },
  { x: 62, y: -4, size: 2, delay: 2.3 },
  { x: 30, y: -6, size: 3, delay: 1.5 },
]

/**
 * Section-wide backdrop: a fine line grid that fades out from the portrait side,
 * a spotlight behind the portrait and a soft vignette toward the bottom edge.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_70%_at_72%_40%,#000_10%,transparent_75%)] opacity-70" />
      <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[var(--color-accent-glow)] opacity-50 blur-[120px]" />
      <div className="absolute right-[8%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,var(--color-accent-soft),transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-bg)]" />
    </div>
  )
}

/**
 * Halo drawn behind the portrait cutout: a faint full ring, a bright glowing arc over the
 * head and shoulder, a slow dashed orbit with a marker, and pulsing particles.
 * The parent must be `position: relative`; ring geometry is centred at 50% / 38%.
 */
export function PortraitHalo() {
  const gradientId = useId()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -inset-[15%] bg-[radial-gradient(circle_at_50%_30%,var(--color-accent-glow),transparent_55%)] blur-2xl" />

      <svg
        viewBox="0 0 100 100"
        className="absolute left-1/2 top-[38%] aspect-square w-full -translate-x-1/2 -translate-y-1/2 overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0 }} />
            <stop offset="45%" style={{ stopColor: "var(--color-accent)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="49.5"
          fill="none"
          strokeWidth="0.3"
          style={{ stroke: "var(--color-accent)", strokeOpacity: 0.3 }}
        />
        {/* Bright arc from 12 o'clock round to about 4 o'clock. */}
        <circle
          cx="50"
          cy="50"
          r="49.5"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="36 64"
          transform="rotate(-95 50 50)"
          className="[filter:drop-shadow(0_0_2px_var(--color-accent))]"
        />
      </svg>

      <div className="absolute left-1/2 top-[38%] aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--color-border-strong)] motion-safe:animate-[spin_60s_linear_infinite]">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
      </div>

      {PARTICLES.map((p) => (
        <span
          key={`${p.x}-${p.y}`}
          className="absolute rounded-full bg-[var(--color-accent)] opacity-70 shadow-[0_0_8px_var(--color-accent)] motion-safe:animate-pulse"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: "3s",
            } satisfies CSSProperties
          }
        />
      ))}
    </div>
  )
}
