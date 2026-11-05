/**
 * @file entities/skill/ui/skill-card.tsx
 * Compact skill group card: icon, title and technology chips with brand logos.
 */

import { motion } from "motion/react"
import type { SkillCategory } from "@/shared/config/site-data"
import { useReducedMotion } from "@/shared/lib/use-reduced-motion"
import { Card } from "@/shared/ui/card"
import { SkillIconTile } from "@/shared/ui/skill-icon"
import { TechIcon } from "@/shared/ui/tech-icon"
import { cn } from "@/shared/lib/cn"

/** Props for {@link SkillCard}. */
export interface SkillCardProps {
  /** The skill group to display. */
  category: SkillCategory
  /** Additional class names. */
  className?: string
  /** Stagger index for scroll entrance animation. */
  index?: number
}

/**
 * Renders a skill group as a card of technology chips.
 *
 * @param props - see {@link SkillCardProps}
 */
export function SkillCard({ category, className, index = 0 }: SkillCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="h-full"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Card
        className={cn(
          "h-full p-5 transition-colors duration-[var(--dur-2)] hover:border-[var(--color-accent)]/40",
          className,
        )}
      >
        <div className="mb-4 flex items-center gap-3">
          <SkillIconTile icon={category.icon} size="sm" />
          <h3 className="font-semibold tracking-tight text-[var(--color-fg)]">{category.title}</h3>
          <span className="ml-auto font-mono text-xs text-[var(--color-fg-muted)]">
            {String(category.items.length).padStart(2, "0")}
          </span>
        </div>
        <ul className="flex flex-wrap gap-2">
          {category.items.map((item) => (
            <li
              key={item}
              className="group/chip inline-flex items-center gap-1.5 rounded-[var(--radius-1)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 text-xs font-medium text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-fg)]"
            >
              <TechIcon name={item} />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}
