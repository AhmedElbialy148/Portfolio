/**
 * @file widgets/services-section/ui/services-section.tsx
 * "What I do" section — four compact service cards on a contrasting band.
 */

import { motion } from "motion/react"
import { SERVICES } from "@/shared/config/site-data"
import { useReducedMotion } from "@/shared/lib/use-reduced-motion"
import { Card } from "@/shared/ui/card"
import { Container } from "@/shared/ui/container"
import { SectionHeading } from "@/shared/ui/section-heading"
import { SkillIconTile } from "@/shared/ui/skill-icon"

/**
 * Renders the services section.
 */
export function ServicesSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="services"
      className="border-y border-[var(--color-border)] bg-[var(--color-band)] py-16 md:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="What I do"
          title="From API design to production"
          subtitle="Backend systems, AI agents, cloud infrastructure and full-stack delivery."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              className="h-full"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Card className="group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-[var(--dur-2)] hover:-translate-y-1 hover:border-[var(--color-accent)]/50 hover:shadow-[var(--shadow-2)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--color-accent-glow)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <SkillIconTile icon={service.icon} />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-fg)]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {service.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
