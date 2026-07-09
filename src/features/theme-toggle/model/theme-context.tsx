/**
 * @file features/theme-toggle/model/theme-context.tsx
 * Theme provider with localStorage persistence and system preference fallback.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

/** Supported theme values. */
export type Theme = "light" | "dark"

/** Theme context value shape. */
export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "theme"

/** Reads the stored theme or defaults to dark. */
function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark") return stored
  return "dark"
}

/** Props for {@link ThemeProvider}. */
export interface ThemeProviderProps {
  children: ReactNode
}

/**
 * Provides theme state and applies data-theme on the document element.
 *
 * @param props - see {@link ThemeProviderProps}
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(function syncThemeToDocument() {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback(function applyTheme(next: Theme) {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(function flipTheme() {
    setThemeState(function resolveNextTheme(current) {
      return current === "dark" ? "light" : "dark"
    })
  }, [])

  const value = useMemo(
    function buildThemeContextValue() {
      return { theme, setTheme, toggleTheme }
    },
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * Returns the current theme context.
 *
 * @returns theme context value
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
