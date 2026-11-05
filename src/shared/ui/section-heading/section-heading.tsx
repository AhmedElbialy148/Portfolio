/**
 * @file shared/ui/section-heading/section-heading.tsx
 * Reusable section title with a mono eyebrow label and optional subtitle.
 */

import { cn } from "@/shared/lib/cn"

/** Props for {@link SectionHeading}. */
export interface SectionHeadingProps {
  /** Section title text. */
  title: string
  /** Optional small uppercase label rendered above the title. */
  eyebrow?: string
  /** Optional subtitle below the title. */
  subtitle?: string
  /** Optional id for anchor linking. */
  id?: string
  /** Additional class names. */
  className?: string
}

/**
 * Renders a section heading with optional eyebrow and subtitle.
 *
 * @param props - see {@link SectionHeadingProps}
 */
export function SectionHeading({ title, eyebrow, subtitle, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 md:mb-10", className)}>
      {eyebrow ? (
        <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
          <span aria-hidden className="h-px w-6 bg-[var(--color-accent)]" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-2xl font-bold tracking-tight text-[var(--color-fg)] md:text-3xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)] md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
