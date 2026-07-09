/**
 * @file widgets/site-header/ui/site-header.tsx
 * Sticky site header with logo, nav links, theme toggle, and mobile menu.
 */

import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeToggle } from "@/features/theme-toggle"
import { PROFILE, SITE_LINKS } from "@/shared/config/site-data"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/cn"

/**
 * Renders the sticky site header with navigation and theme toggle.
 */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const externalLinks = SITE_LINKS.filter((l) => l.external)

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
        >
          {PROFILE.name.split(" ")[0]}
          <span className="text-[var(--color-accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link
            to="/codes"
            className={cn(
              "rounded-[var(--radius-2)] px-3 py-2 text-sm font-medium transition-colors",
              location.pathname === "/codes"
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
            )}
          >
            Projects
          </Link>
          {externalLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[var(--radius-2)] px-3 py-2 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)] px-5 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            <Link
              to="/codes"
              onClick={() => setMobileOpen(false)}
              className="rounded-[var(--radius-2)] px-3 py-3 text-sm font-medium text-[var(--color-fg)]"
            >
              All Projects
            </Link>
            {externalLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="rounded-[var(--radius-2)] px-3 py-3 text-sm font-medium text-[var(--color-fg-muted)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
