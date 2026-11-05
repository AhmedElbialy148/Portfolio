/**
 * @file shared/ui/container/container.tsx
 * Page-width container — the single source of truth for content width and side padding.
 */

import type { HTMLAttributes } from "react"
import { cn } from "@/shared/lib/cn"

/**
 * Renders a centred, max-width content wrapper with responsive side padding.
 *
 * @param props - standard div attributes
 */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-8", className)} {...props} />
  )
}
