/**
 * @file shared/ui/badge/badge.tsx
 * Small label badge for tags and status.
 */

import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/shared/lib/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-full)] border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
        outline: "border-[var(--color-border)] text-[var(--color-fg-muted)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

/** Props for {@link Badge}. */
export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Renders a small badge label.
 *
 * @param props - see {@link BadgeProps}
 */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
