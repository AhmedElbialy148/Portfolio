/**
 * @file widgets/skills-section/ui/skills-section.tsx
 * "What I do" section with backend and cloud skill cards.
 */

import { SKILL_CATEGORIES } from "@/shared/config/site-data"
import { SkillCard } from "@/entities/skill"
import { SectionHeading } from "@/shared/ui/section-heading"

/**
 * Renders the skills section with category cards.
 */
export function SkillsSection() {
  return (
    <section id="skills" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I do"
          subtitle="Backend systems, AI agents, cloud infrastructure, and full-stack delivery — from API design to production deployment."
        />
        <div className="flex flex-col gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
