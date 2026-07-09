/**
 * @file widgets/hero-section/ui/hero-section.tsx
 * Hero section with Lottie animation, 3D wireframe accent, and intro copy.
 */

import { lazy, Suspense } from "react"
import { ArrowDown, FileDown } from "lucide-react"
import { motion } from "motion/react"
import { PROFILE } from "@/shared/config/site-data"
import { ASSET_SLOTS } from "@/shared/config/asset-slots"
import { useReducedMotion } from "@/shared/lib/use-reduced-motion"
import { Button } from "@/shared/ui/button"
import { LottieAnimation } from "@/shared/ui/lottie-animation"

const HeroScene = lazy(function loadHeroScene() {
  return import("@/shared/ui/scene-3d").then(function resolveHeroScene(m) {
    return { default: m.HeroScene }
  })
})

/**
 * Renders the portfolio hero section.
 */
export function HeroSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-accent-glow),transparent_50%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {PROFILE.role} · {PROFILE.location}
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.1] tracking-tight text-[var(--color-fg)] md:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-amber-200 bg-clip-text text-transparent">
              {PROFILE.name}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-muted)] md:text-xl">
            {PROFILE.bio}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href={ASSET_SLOTS.resume} target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" />
                Resume
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">
                <ArrowDown className="h-4 w-4" />
                View work
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {!reducedMotion ? (
            <Suspense fallback={null}>
              <HeroScene className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70" />
            </Suspense>
          ) : null}

          <LottieAnimation
            src={ASSET_SLOTS.lotties.coding}
            className="relative z-10 h-full w-full"
            ariaLabel="Coding animation"
          />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-20 hidden max-w-6xl md:block">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>
    </section>
  )
}
