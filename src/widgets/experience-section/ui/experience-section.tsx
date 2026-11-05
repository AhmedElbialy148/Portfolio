/**
 * @file widgets/experience-section/ui/experience-section.tsx
 * Work experience timeline section.
 */

import { EXPERIENCES } from "@/shared/config/site-data"
import { ExperienceCard } from "@/entities/experience"
import { Container } from "@/shared/ui/container"
import { SectionHeading } from "@/shared/ui/section-heading"

/**
 * Renders the experience section with timeline cards.
 */
export function ExperienceSection() {
  return (
    <section id="experience" className="border-y border-[var(--color-border)] bg-[var(--color-band)] py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          subtitle="Production engineering across AI systems, cloud-native apps, and enterprise integrations."
        />
        <div className="grid gap-5">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
