/**
 * @file views/home/ui/home-view.tsx
 * Home view composition: hero, skills, experience, projects, contact.
 */

import { useEffect } from "react"
import { EducationSection } from "@/widgets/education-section"
import { ExperienceSection } from "@/widgets/experience-section"
import { HeroSection } from "@/widgets/hero-section"
import { ProjectsSection } from "@/widgets/projects-section"
import { SiteFooter } from "@/widgets/site-footer"
import { SkillsSection } from "@/widgets/skills-section"
import { PROFILE } from "@/shared/config/site-data"

/**
 * Renders the home page view.
 */
export function HomeView() {
  useEffect(function setHomePageTitle() {
    document.title = `${PROFILE.name} — ${PROFILE.role}`
  }, [])

  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SiteFooter />
    </>
  )
}
