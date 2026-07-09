/**
 * @file features/project-search/ui/project-search-input.tsx
 * Search input for filtering the project gallery.
 */

import { Search } from "lucide-react"
import { Input } from "@/shared/ui/input"

/** Props for {@link ProjectSearchInput}. */
export interface ProjectSearchInputProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
  totalCount: number
}

/**
 * Renders a project search input with result count.
 *
 * @param props - see {@link ProjectSearchInputProps}
 */
export function ProjectSearchInput({
  value,
  onChange,
  resultCount,
  totalCount,
}: ProjectSearchInputProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-fg-subtle)]" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search projects by name, tech, or description…"
          className="pl-10"
          aria-label="Search projects"
        />
      </div>
      <p className="text-xs text-[var(--color-fg-subtle)]">
        Showing {resultCount} of {totalCount} projects
      </p>
    </div>
  )
}
