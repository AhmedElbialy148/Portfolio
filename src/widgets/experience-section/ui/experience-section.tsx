/**
 * @file widgets/experience-section/ui/experience-section.tsx
 * Work experience timeline section.
 */

import { EXPERIENCES } from "@/shared/config/site-data"
import { ExperienceCard } from "@/entities/experience"
import { SectionHeading } from "@/shared/ui/section-heading"

/**
 * Renders the experience section with timeline cards.
 */
export function ExperienceSection() {
  return (
    <section id="experience" className="bg-[var(--color-surface-2)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Experience"
          subtitle="Production engineering across AI systems, cloud-native apps, and enterprise integrations."
        />
        <div className="grid gap-5">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
