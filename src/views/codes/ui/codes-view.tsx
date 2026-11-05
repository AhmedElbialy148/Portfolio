/**
 * @file views/codes/ui/codes-view.tsx
 * All-projects gallery view with working search filter.
 */

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { ProjectSearchInput, useProjectSearch } from "@/features/project-search"
import { ProjectCard } from "@/entities/project"
import { PROJECTS, PROFILE } from "@/shared/config/site-data"
import { Button } from "@/shared/ui/button"
import { Container } from "@/shared/ui/container"
import { SectionHeading } from "@/shared/ui/section-heading"

/**
 * Renders the all-projects gallery view.
 */
export function CodesView() {
  const { query, setQuery, filtered } = useProjectSearch(PROJECTS)

  useEffect(function setCodesPageTitle() {
    document.title = `Projects — ${PROFILE.name}`
  }, [])

  return (
    <section className="py-12 md:py-16">
      <Container>
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </Button>

        <SectionHeading
          title="All Projects"
          subtitle="Every project in the portfolio — search by name, technology, or description."
        />

        <div className="mb-10">
          <ProjectSearchInput
            value={query}
            onChange={setQuery}
            resultCount={filtered.length}
            totalCount={PROJECTS.length}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[var(--radius-3)] border border-dashed border-[var(--color-border)] py-16 text-center">
            <p className="text-[var(--color-fg-muted)]">No projects match your search.</p>
            <Button variant="link" className="mt-2" onClick={() => setQuery("")}>
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
