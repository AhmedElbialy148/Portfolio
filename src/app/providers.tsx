/**
 * @file app/providers.tsx
 * Global providers: Motion config (honours prefers-reduced-motion) and theme context.
 */

import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/features/theme-toggle"

/** Props for {@link Providers}. */
export interface ProvidersProps {
  children: ReactNode
}

/**
 * Wraps the app with global providers.
 *
 * @param props - see {@link ProvidersProps}
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>{children}</ThemeProvider>
    </MotionConfig>
  )
}
