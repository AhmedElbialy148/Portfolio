/**
 * @file shared/ui/section-heading/section-heading.tsx
 * Reusable section title with accent underline.
 */

import { cn } from "@/shared/lib/cn"

/** Props for {@link SectionHeading}. */
export interface SectionHeadingProps {
  /** Section title text. */
  title: string
  /** Optional subtitle below the title. */
  subtitle?: string
  /** Optional id for anchor linking. */
  id?: string
  /** Additional class names. */
  className?: string
}

/**
 * Renders a section heading with optional subtitle.
 *
 * @param props - see {@link SectionHeadingProps}
 */
export function SectionHeading({ title, subtitle, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      <h2
        id={id}
        className="font-display text-3xl font-bold tracking-tight text-[var(--color-fg)] md:text-4xl"
      >
        {title}
        <span className="mt-2 block h-1 w-12 rounded-full bg-[var(--color-accent)]" />
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-[var(--color-fg-muted)]">{subtitle}</p>
      ) : null}
    </div>
  )
}
