/**
 * @file widgets/site-footer/ui/site-footer.tsx
 * Contact section and site footer with contact details and social links.
 */

import { ArrowRight, Github, Languages, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { PROFILE, SITE_LINKS } from "@/shared/config/site-data"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Container } from "@/shared/ui/container"
import { SectionHeading } from "@/shared/ui/section-heading"

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, email: Mail } as const

/**
 * Renders the contact section and site footer.
 */
export function SiteFooter() {
  const socials = SITE_LINKS.filter(
    (l): l is typeof l & { id: keyof typeof SOCIAL_ICONS } => l.id in SOCIAL_ICONS,
  )

  const details = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
    { icon: MapPin, label: "Location", value: PROFILE.location },
    { icon: Languages, label: "Languages", value: PROFILE.spokenLanguages.join(" · ") },
  ]

  return (
    <footer id="contact" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[var(--color-accent-glow)] opacity-40 blur-[120px]"
      />
      <section className="relative py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="Let's build something together"
              subtitle="Open to full-stack and backend engineering roles, AI agent projects and freelance collaborations. I usually reply within a day."
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button className="group h-11 px-6" asChild>
                <a href={`mailto:${PROFILE.email}`}>
                  Send me an email
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              {socials
                .filter((link) => link.id !== "email")
                .map((link) => {
                  const Icon = SOCIAL_ICONS[link.id]
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-2)] border border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
            </div>
          </div>

          <Card className="divide-y divide-[var(--color-border)] overflow-hidden p-0">
            {details.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-2)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-medium text-[var(--color-fg)]">
                      {value}
                    </span>
                  </span>
                </>
              )
              const rowClass = "flex items-center gap-4 px-5 py-4"
              return href ? (
                <a
                  key={label}
                  href={href}
                  className={`${rowClass} transition-colors hover:bg-[var(--color-surface-2)]`}
                >
                  {content}
                </a>
              ) : (
                <div key={label} className={rowClass}>
                  {content}
                </div>
              )
            })}
          </Card>
        </Container>
      </section>

      <div className="relative border-t border-[var(--color-border)]">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-[var(--color-fg-muted)] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
          <p>Built with React, Vite &amp; Tailwind</p>
        </Container>
      </div>
    </footer>
  )
}
