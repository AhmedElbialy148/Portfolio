/**
 * @file widgets/hero-section/ui/hero-section.tsx
 * Hero section: intro copy, CTAs, availability, socials, profile photo and stats strip.
 */

import { ArrowRight, Briefcase, FileDown, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { motion } from "motion/react"
import { PROFILE, SITE_LINKS, STATS } from "@/shared/config/site-data"
import { ASSET_SLOTS } from "@/shared/config/asset-slots"
import { useReducedMotion } from "@/shared/lib/use-reduced-motion"
import { Button } from "@/shared/ui/button"
import { Container } from "@/shared/ui/container"

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, email: Mail } as const

const EASE = [0.2, 0.8, 0.2, 1] as const

/**
 * Renders the portfolio hero section.
 */
export function HeroSection() {
  const reducedMotion = useReducedMotion()
  const [firstName, ...rest] = PROFILE.name.split(" ")
  const lastName = rest.join(" ")
  const socials = SITE_LINKS.filter(
    (l): l is typeof l & { id: keyof typeof SOCIAL_ICONS } => l.id in SOCIAL_ICONS,
  )

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background: dot grid fading out, plus an accent glow behind the photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border-strong)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[var(--color-accent-glow)] opacity-60 blur-[120px]"
      />

      <Container className="relative grid items-center gap-14 pb-12 pt-12 md:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:pb-16 lg:pt-20">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            <span aria-hidden className="h-px w-6 bg-[var(--color-accent)]" />
            Hello, I&apos;m
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-fg)] sm:text-5xl lg:text-[3.5rem]">
            {firstName} <span className="text-[var(--color-accent)]">{lastName}</span>
          </h1>
          <p className="mt-4 flex items-center text-lg font-medium text-[var(--color-fg)] md:text-xl">
            {PROFILE.role}
            <span
              aria-hidden
              className="ml-1 inline-block h-6 w-0.5 bg-[var(--color-accent)] motion-safe:animate-pulse"
            />
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
            {PROFILE.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="group h-11 px-6" asChild>
              <a href={`mailto:${PROFILE.email}`}>
                Get in touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button variant="outline" className="h-11 px-6" asChild>
              <a href={ASSET_SLOTS.resume} target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              {PROFILE.availability}
            </p>
            <p className="flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
              <MapPin className="h-4 w-4 text-[var(--color-accent)]" aria-hidden />
              {PROFILE.location}
            </p>
          </div>

          <ul className="mt-6 flex gap-2">
            {socials.map((link) => {
              const Icon = SOCIAL_ICONS[link.id]
              const isMail = link.href.startsWith("mailto:")
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-2)] border border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              )
            })}
          </ul>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-64 sm:w-72 lg:w-80"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <div
            aria-hidden
            className="absolute -inset-[10%] rounded-full border border-[var(--color-accent)]/40"
          />
          <div
            aria-hidden
            className="absolute -inset-[22%] rounded-full border border-dashed border-[var(--color-border-strong)] motion-safe:animate-[spin_60s_linear_infinite]"
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[var(--color-surface-1)] bg-[var(--color-surface-2)] shadow-[var(--shadow-3)]">
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-[var(--color-accent)]"
            >
              {firstName?.[0]}
              {lastName[0]}
            </div>
            <img
              src={ASSET_SLOTS.profile}
              alt={PROFILE.name}
              width={320}
              height={320}
              className="relative h-full w-full object-cover object-top"
            />
          </div>

          <div className="absolute -bottom-3 -left-4 flex items-center gap-3 rounded-[var(--radius-2)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/90 px-4 py-3 shadow-[var(--shadow-2)] backdrop-blur sm:-left-10">
            <Briefcase className="h-4 w-4 text-[var(--color-accent)]" aria-hidden />
            <div className="leading-tight">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">
                Currently at{" "}
                <span className="text-[var(--color-accent)]">{PROFILE.currently.company}</span>
              </p>
              <p className="text-sm font-semibold text-[var(--color-fg)]">{PROFILE.currently.focus}</p>
            </div>
          </div>
        </motion.div>
      </Container>

      <Container className="relative pb-14 md:pb-20">
        <dl className="grid grid-cols-2 overflow-hidden rounded-[var(--radius-3)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 backdrop-blur md:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                "flex flex-col gap-1 px-5 py-5 md:px-6",
                index % 2 === 1 ? "border-l border-[var(--color-border)]" : "",
                index >= 2 ? "border-t border-[var(--color-border)] md:border-t-0" : "",
                index === 2 ? "md:border-l" : "",
              ].join(" ")}
            >
              <dt className="order-2 text-xs text-[var(--color-fg-muted)] md:text-sm">{stat.label}</dt>
              <dd className="order-1 font-display text-2xl font-bold text-[var(--color-fg)] md:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
