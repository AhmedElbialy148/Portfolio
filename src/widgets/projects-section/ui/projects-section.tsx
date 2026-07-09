/**
 * @file widgets/projects-section/ui/projects-section.tsx
 * Featured projects grid for the home page.
 */

import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects } from "@/shared/config/site-data"
import { ProjectCard } from "@/entities/project"
import { Button } from "@/shared/ui/button"
import { SectionHeading } from "@/shared/ui/section-heading"

/**
 * Renders the featured projects section on the home page.
 */
export function ProjectsSection() {
  const featured = getFeaturedProjects()

  return (
    <section id="projects" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="Personal Projects"
            subtitle="Selected work — full gallery available on the projects page."
            className="mb-0"
          />
          <Button variant="outline" asChild>
            <Link to="/codes">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
