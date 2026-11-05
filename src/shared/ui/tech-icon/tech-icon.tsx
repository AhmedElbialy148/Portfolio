/**
 * @file shared/ui/tech-icon/tech-icon.tsx
 * Brand logos for technology chips, from Simple Icons (CC0). Only the icons imported
 * here are bundled. Labels without an entry (AWS services, concepts) render text-only.
 */

import type { CSSProperties } from "react"
import {
  siCelery,
  siDocker,
  siExpo,
  siExpress,
  siFastapi,
  siFastify,
  siGit,
  siGoogleappsscript,
  siGooglecloud,
  siGooglesheets,
  siGraphql,
  siHtml5,
  siJavascript,
  siKubernetes,
  siLangchain,
  siLanggraph,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSelenium,
  siSpringboot,
  siSupabase,
  siTypescript,
  type SimpleIcon,
} from "simple-icons"
import { cn } from "@/shared/lib/cn"

/** Chip label (as written in site-data) → Simple Icons entry. */
const TECH_ICONS: Readonly<Record<string, SimpleIcon>> = {
  "Node.js": siNodedotjs,
  Express: siExpress,
  NestJS: siNestjs,
  Fastify: siFastify,
  Python: siPython,
  FastAPI: siFastapi,
  Celery: siCelery,
  "Spring Boot": siSpringboot,
  GraphQL: siGraphql,
  LangChain: siLangchain,
  LangGraph: siLanggraph,
  "GCP Cloud Run": siGooglecloud,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  Nginx: siNginx,
  Git: siGit,
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "React Native (Expo)": siExpo,
  JavaScript: siJavascript,
  "HTML / CSS": siHtml5,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  MongoDB: siMongodb,
  Redis: siRedis,
  "Apps Script": siGoogleappsscript,
  "Google Sheets": siGooglesheets,
  Pandas: siPandas,
  Selenium: siSelenium,
}

/**
 * Returns the hover colour for a brand. Near-black brand colours (Express, Next.js …)
 * would vanish on the dark theme, so they fall back to the foreground colour.
 *
 * @param hex - brand colour without `#`
 * @returns a CSS colour value
 */
function brandColor(hex: string): string {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number]
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance < 0.15 ? "var(--color-fg)" : `#${hex}`
}

/** Props for {@link TechIcon}. */
export interface TechIconProps {
  /** Technology label, matched exactly against the icon map. */
  name: string
  /** Additional class names. */
  className?: string
}

/**
 * Renders a monochrome brand logo that takes the brand colour when an ancestor
 * with the `group/chip` class is hovered. Renders nothing for unknown labels.
 *
 * @param props - see {@link TechIconProps}
 */
export function TechIcon({ name, className }: TechIconProps) {
  const icon = TECH_ICONS[name]
  if (!icon) return null

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="currentColor"
      style={{ "--brand": brandColor(icon.hex) } as CSSProperties}
      className={cn(
        "h-3.5 w-3.5 shrink-0 transition-colors duration-[var(--dur-2)] group-hover/chip:text-[var(--brand)]",
        className,
      )}
    >
      <path d={icon.path} />
    </svg>
  )
}
