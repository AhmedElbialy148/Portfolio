/**
 * @file entities/skill/ui/skill-card.tsx
 * Skill row with Lottie beside content — matches the original side-by-side layout.
 */

import { Brain, Cloud, Layers, Server } from "lucide-react"
import { motion } from "motion/react"
import type { SkillCategory } from "@/shared/config/site-data"
import { Card } from "@/shared/ui/card"
import { LottieAnimation } from "@/shared/ui/lottie-animation"
import { cn } from "@/shared/lib/cn"

/** Props for {@link SkillCard}. */
export interface SkillCardProps {
  /** The skill category to display. */
  category: SkillCategory
  /** Additional class names. */
  className?: string
  /** Stagger index for scroll entrance animation. */
  index?: number
}

const ICONS = {
  server: Server,
  cloud: Cloud,
  brain: Brain,
  layers: Layers,
} as const

/**
 * Renders a skill row with Lottie animation beside the bullet list.
 *
 * @param props - see {@link SkillCardProps}
 */
export function SkillCard({ category, className, index = 0 }: SkillCardProps) {
  const Icon = ICONS[category.icon as keyof typeof ICONS] ?? Server

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Card className={cn("overflow-hidden p-0", className)}>
        <div className="grid items-center gap-6 p-6 md:grid-cols-[minmax(200px,1fr)_1.2fr] md:gap-8 md:p-8">
          {category.lottieSrc ? (
            <div className="mx-auto w-full max-w-xs md:max-w-none">
              <LottieAnimation
                src={category.lottieSrc}
                className="aspect-square w-full"
                ariaLabel={`${category.title} animation`}
              />
            </div>
          ) : null}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-2)] bg-[var(--color-accent-soft)]">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-[var(--color-fg)]">
                {category.title}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-fg-muted)]"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
