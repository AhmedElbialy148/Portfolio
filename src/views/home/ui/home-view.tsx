/**
 * @file views/home/ui/home-view.tsx
 * Home view composition: hero, services, skills, experience, education, projects, contact.
 */

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { EducationSection } from "@/widgets/education-section"
import { ExperienceSection } from "@/widgets/experience-section"
import { HeroSection } from "@/widgets/hero-section"
import { ProjectsSection } from "@/widgets/projects-section"
import { ServicesSection } from "@/widgets/services-section"
import { SiteFooter } from "@/widgets/site-footer"
import { SkillsSection } from "@/widgets/skills-section"
import { PROFILE } from "@/shared/config/site-data"

/**
 * Renders the home page view.
 */
export function HomeView() {
  const location = useLocation()

  useEffect(function setHomePageTitle() {
    document.title = `${PROFILE.name} — ${PROFILE.role}`
  }, [])

  // The router doesn't scroll to hash targets; header nav links rely on this.
  useEffect(
    function scrollToHashTarget() {
      if (!location.hash) return
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      target?.scrollIntoView({ behavior: "smooth", block: "start" })
    },
    [location.hash, location.key],
  )

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SiteFooter />
    </>
  )
}
