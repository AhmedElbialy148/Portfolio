/**
 * @file shared/ui/skill-icon/skill-icon.tsx
 * Maps a {@link SkillIcon} key to its Lucide glyph inside an accent tile.
 */

import { Brain, Cloud, Database, Layers, Server, Workflow, type LucideIcon } from "lucide-react"
import type { SkillIcon } from "@/shared/config/site-data"
import { cn } from "@/shared/lib/cn"

const ICONS: Record<SkillIcon, LucideIcon> = {
  server: Server,
  cloud: Cloud,
  brain: Brain,
  layers: Layers,
  database: Database,
  workflow: Workflow,
}

/** Props for {@link SkillIconTile}. */
export interface SkillIconTileProps {
  /** Which glyph to render. */
  icon: SkillIcon
  /** Tile size. */
  size?: "sm" | "md"
  /** Additional class names. */
  className?: string
}

/**
 * Renders a skill glyph in a rounded, accent-tinted tile.
 *
 * @param props - see {@link SkillIconTileProps}
 */
export function SkillIconTile({ icon, size = "md", className }: SkillIconTileProps) {
  const Icon = ICONS[icon]

  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[var(--radius-2)] border border-[var(--color-accent)]/25 bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
        size === "md" ? "h-12 w-12 [&>svg]:h-6 [&>svg]:w-6" : "h-9 w-9 [&>svg]:h-[18px] [&>svg]:w-[18px]",
        className,
      )}
    >
      <Icon />
    </div>
  )
}
