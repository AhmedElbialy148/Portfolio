/**
 * @file entities/experience/ui/experience-card.tsx
 * Timeline card for a single work experience entry with scroll animation.
 */

import { motion } from "motion/react"
import type { Experience } from "@/shared/config/site-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { cn } from "@/shared/lib/cn"

/** Props for {@link ExperienceCard}. */
export interface ExperienceCardProps {
  /** The experience entry to display. */
  experience: Experience
  /** Additional class names. */
  className?: string
  /** Stagger index for scroll entrance animation. */
  index?: number
}

/**
 * Renders an experience entry as a timeline card with role highlights.
 *
 * @param props - see {@link ExperienceCardProps}
 */
export function ExperienceCard({ experience, className, index = 0 }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Card className={cn("relative border-l-2 border-l-[var(--color-accent)]", className)}>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <CardTitle className="text-xl">{experience.company}</CardTitle>
            <span className="font-mono text-xs text-[var(--color-fg-subtle)]">
              {experience.dates}
            </span>
          </div>
          <p className="text-sm font-medium text-[var(--color-accent)]">{experience.position}</p>
          <p className="text-xs text-[var(--color-fg-subtle)]">
            {experience.location} · {experience.workType}
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {experience.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-fg-muted)]"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
