/**
 * @file widgets/site-header/ui/site-header.tsx
 * Sticky site header with logo, in-page section nav, Projects page link, theme toggle and CTA.
 */

import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeToggle } from "@/features/theme-toggle"
import { NAV_ITEMS, PROFILE } from "@/shared/config/site-data"
import { Button } from "@/shared/ui/button"
import { Container } from "@/shared/ui/container"
import { cn } from "@/shared/lib/cn"

const NAV_LINK =
  "rounded-[var(--radius-2)] px-3 py-2 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"

/**
 * Renders the sticky site header with navigation and theme toggle.
 */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const onProjectsPage = location.pathname === "/codes"

  function closeMenu() {
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
        >
          {PROFILE.name.split(" ")[0]}
          <span className="text-[var(--color-accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} to={{ pathname: "/", hash: `#${item.id}` }} className={NAV_LINK}>
              {item.label}
            </Link>
          ))}
          <span aria-hidden className="mx-2 h-5 w-px bg-[var(--color-border)]" />
          <Link
            to="/codes"
            className={cn(
              NAV_LINK,
              onProjectsPage && "bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
            )}
          >
            All projects
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" className="hidden h-9 px-4 sm:inline-flex" asChild>
            <a href={`mailto:${PROFILE.email}`}>Let&apos;s talk</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      {mobileOpen ? (
        <nav
          className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)] lg:hidden"
          aria-label="Mobile navigation"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={{ pathname: "/", hash: `#${item.id}` }}
                onClick={closeMenu}
                className="rounded-[var(--radius-2)] px-3 py-3 text-sm font-medium text-[var(--color-fg)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/codes"
              onClick={closeMenu}
              className="rounded-[var(--radius-2)] px-3 py-3 text-sm font-medium text-[var(--color-fg)]"
            >
              All projects
            </Link>
            <Button className="mt-2 sm:hidden" asChild>
              <a href={`mailto:${PROFILE.email}`} onClick={closeMenu}>
                Let&apos;s talk
              </a>
            </Button>
          </Container>
        </nav>
      ) : null}
    </header>
  )
}
