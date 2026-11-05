/**
 * @file entities/experience/ui/experience-card.tsx
 * Timeline card for a single work experience entry with scroll animation,
 * optional "Show more" detail and a tech-stack chip row.
 */

import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"
import { useId, useState } from "react"
import type { Experience } from "@/shared/config/site-data"
import { useReducedMotion } from "@/shared/lib/use-reduced-motion"
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
 * Renders a list of highlight bullets.
 *
 * @param props - the bullet strings and optional list id
 */
function HighlightList({ items, id }: { items: readonly string[]; id?: string }) {
  return (
    <ul id={id} className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * Renders an experience entry as a timeline card with role highlights.
 *
 * @param props - see {@link ExperienceCardProps}
 */
export function ExperienceCard({ experience, className, index = 0 }: ExperienceCardProps) {
  const reducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const moreId = useId()
  const more = experience.moreHighlights ?? []

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Card className={cn("relative border-l-2 border-l-[var(--color-accent)]", className)}>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <CardTitle className="text-xl">{experience.company}</CardTitle>
            <span className="font-mono text-xs text-[var(--color-fg-muted)]">{experience.dates}</span>
          </div>
          <p className="text-sm font-medium text-[var(--color-accent)]">{experience.position}</p>
          <p className="text-xs text-[var(--color-fg-muted)]">
            {experience.location} · {experience.workType}
          </p>
        </CardHeader>
        <CardContent>
          <HighlightList items={experience.highlights} />

          {more.length > 0 ? (
            <>
              {expanded ? (
                <div className="mt-2">
                  <HighlightList items={more} id={moreId} />
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                aria-expanded={expanded}
                aria-controls={expanded ? moreId : undefined}
                className="mt-3 inline-flex items-center gap-1 rounded-[var(--radius-1)] text-xs font-medium text-[var(--color-accent)] hover:underline"
              >
                {expanded ? "Show less" : `Show ${more.length} more`}
                <ChevronDown
                  aria-hidden
                  className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
                />
              </button>
            </>
          ) : null}

          {experience.stack?.length ? (
            <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--color-border)] pt-4">
              {experience.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-[var(--radius-1)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-fg-muted)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  )
}
