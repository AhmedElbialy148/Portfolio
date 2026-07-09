/**
 * @file shared/ui/card/card.tsx
 * Card container primitives for content sections.
 */

import type { HTMLAttributes } from "react"
import { cn } from "@/shared/lib/cn"

/**
 * Renders a card container with border and surface styling.
 *
 * @param props - standard div attributes
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-3)] border border-[var(--color-border)] bg-[var(--color-surface-1)] shadow-[var(--shadow-1)]",
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders the card header area.
 *
 * @param props - standard div attributes
 */
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
}

/**
 * Renders the card title text.
 *
 * @param props - standard heading attributes
 */
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-snug tracking-tight", className)}
      {...props}
    />
  )
}

/**
 * Renders the card description text.
 *
 * @param props - standard paragraph attributes
 */
export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-[var(--color-fg-muted)]", className)} {...props} />
  )
}

/**
 * Renders the card content area.
 *
 * @param props - standard div attributes
 */
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

/**
 * Renders the card footer area.
 *
 * @param props - standard div attributes
 */
export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}
