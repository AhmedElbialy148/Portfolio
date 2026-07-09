/**
 * @file features/theme-toggle/ui/theme-toggle.tsx
 * Button that toggles between light and dark themes.
 */

import { Moon, Sun } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { useTheme } from "../model/theme-context"

/**
 * Renders a theme toggle button with sun/moon icons.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
