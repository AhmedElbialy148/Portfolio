/**
 * @file features/project-search/model/use-project-search.ts
 * Filters projects by name, description, or tags.
 */

import { useMemo, useState } from "react"
import type { Project } from "@/shared/config/site-data"

/**
 * Return shape for {@link useProjectSearch}.
 */
export interface UseProjectSearchResult {
  query: string
  setQuery: (value: string) => void
  filtered: readonly Project[]
}

/**
 * Filters a project list by a search query.
 *
 * @param projects - the full project list
 * @returns query state and filtered results
 */
export function useProjectSearch(projects: readonly Project[]): UseProjectSearchResult {
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    function computeFilteredProjects() {
      const normalized = query.trim().toLowerCase()
      if (!normalized) return projects

      return projects.filter(function matchesQuery(project) {
        const haystack = [
          project.name,
          project.description,
          ...project.tags,
        ]
          .join(" ")
          .toLowerCase()
        return haystack.includes(normalized)
      })
    },
    [projects, query],
  )

  return { query, setQuery, filtered }
}
