/**
 * @file widgets/site-footer/ui/site-footer.tsx
 * Contact section and site footer with social links.
 */

import { Mail, MapPin, Phone } from "lucide-react"
import { PROFILE, SITE_LINKS } from "@/shared/config/site-data"
import { ASSET_SLOTS } from "@/shared/config/asset-slots"
import { Button } from "@/shared/ui/button"
import { SectionHeading } from "@/shared/ui/section-heading"

/**
 * Renders the contact section and site footer.
 */
export function SiteFooter() {
  const externalLinks = SITE_LINKS.filter((l) => l.external)

  return (
    <footer id="contact" className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)]">
      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionHeading
                title="Let's connect"
                subtitle="Open to full-stack and backend engineering roles, AI agent projects, and freelance collaborations."
              />
              <div className="flex flex-wrap gap-4 text-sm text-[var(--color-fg-muted)]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                  {PROFILE.location}
                </span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)]"
                >
                  <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                  {PROFILE.email}
                </a>
                <a
                  href={`tel:${PROFILE.phone}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)]"
                >
                  <Phone className="h-4 w-4 text-[var(--color-accent)]" />
                  {PROFILE.phone}
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {externalLinks.map((link) => (
                  <Button key={link.id} variant="outline" size="sm" asChild>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative h-40 w-40 overflow-hidden rounded-[var(--radius-3)] border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-accent-soft)] to-[var(--color-surface-2)] shadow-[var(--shadow-2)]">
                <img
                  src={ASSET_SLOTS.profile}
                  alt={PROFILE.name}
                  className="relative z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-2)] font-display text-4xl font-bold text-[var(--color-accent)]">
                  AE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--color-border)] px-5 py-6">
        <p className="mx-auto max-w-6xl text-center text-xs text-[var(--color-fg-subtle)]">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React + Vite.
        </p>
      </div>
    </footer>
  )
}
