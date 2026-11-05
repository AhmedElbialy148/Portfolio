/**
 * @file widgets/skills-section/ui/skills-section.tsx
 * Tech stack section — skill groups as a dense grid of chip cards.
 */

import { SKILL_CATEGORIES } from "@/shared/config/site-data"
import { SkillCard } from "@/entities/skill"
import { Container } from "@/shared/ui/container"
import { SectionHeading } from "@/shared/ui/section-heading"

/**
 * Renders the skills section with grouped technology chips.
 */
export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Tech stack"
          title="Skills & technologies"
          subtitle="The tools I use day to day, grouped by where they sit in the stack."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
