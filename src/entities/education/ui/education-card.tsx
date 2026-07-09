/**
 * @file entities/education/ui/education-card.tsx
 * Card for a single education entry.
 */

import type { Education } from "@/shared/config/site-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { cn } from "@/shared/lib/cn"

/** Props for {@link EducationCard}. */
export interface EducationCardProps {
  /** The education entry to display. */
  education: Education
  /** Additional class names. */
  className?: string
}

/**
 * Renders an education entry card.
 *
 * @param props - see {@link EducationCardProps}
 */
export function EducationCard({ education, className }: EducationCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <CardTitle className="text-lg">{education.institution}</CardTitle>
          <span className="font-mono text-xs text-[var(--color-fg-subtle)]">
            {education.dates}
          </span>
        </div>
        <p className="text-sm font-medium text-[var(--color-accent)]">{education.degree}</p>
        <p className="text-xs text-[var(--color-fg-subtle)]">{education.location}</p>
      </CardHeader>
      {education.details ? (
        <CardContent>
          <ul className="space-y-2">
            {education.details.map((item) => (
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
      ) : null}
    </Card>
  )
}
