/**
 * @file app/providers.tsx
 * Global providers: theme context.
 */

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
  return <ThemeProvider>{children}</ThemeProvider>
}
