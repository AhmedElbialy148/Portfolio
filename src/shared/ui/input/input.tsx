/**
 * @file shared/ui/input/input.tsx
 * Text input primitive for search and forms.
 */

import type { InputHTMLAttributes } from "react"
import { cn } from "@/shared/lib/cn"

/** Props for {@link Input}. */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * Renders a styled text input.
 *
 * @param props - standard input attributes
 */
export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-2)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-4 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}
