/**
 * @file widgets/education-section/ui/education-section.tsx
 * Education section with degree and internship cards.
 */

import { EDUCATION } from "@/shared/config/site-data"
import { EducationCard } from "@/entities/education"
import { Container } from "@/shared/ui/container"
import { SectionHeading } from "@/shared/ui/section-heading"

/**
 * Renders the education section.
 */
export function EducationSection() {
  return (
    <section id="education" className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Background"
          title="Education"
          subtitle="Engineering foundation with specialized training in SOA, microservices, and enterprise integration."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {EDUCATION.map((entry) => (
            <EducationCard key={entry.id} education={entry} />
          ))}
        </div>
      </Container>
    </section>
  )
}
