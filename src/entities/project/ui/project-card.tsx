/**
 * @file entities/project/ui/project-card.tsx
 * Card displaying a portfolio project with 3D hover tilt and screenshot.
 */

import { ExternalLink, Github } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import type { MouseEvent } from "react"
import type { Project } from "@/shared/config/site-data"
import { ASSET_SLOTS, getProjectGradient } from "@/shared/config/asset-slots"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"
import { cn } from "@/shared/lib/cn"

/** Props for {@link ProjectCard}. */
export interface ProjectCardProps {
  /** The project to display. */
  project: Project
  /** Additional class names. */
  className?: string
  /** Stagger index for scroll entrance animation. */
  index?: number
}

/**
 * Renders a project card with 3D tilt hover, screenshot, tags, and action links.
 *
 * @param props - see {@link ProjectCardProps}
 */
export function ProjectCard({ project, className, index = 0 }: ProjectCardProps) {
  const gradient = getProjectGradient(project.imageSlot)
  const screenshotUrl = ASSET_SLOTS.projectScreenshot(project.id)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  /** Updates tilt values from pointer position over the card. */
  function handlePointerMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  /** Resets tilt when the pointer leaves the card. */
  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="[transform-style:preserve-3d]"
    >
      <Card
        className={cn(
          "group overflow-hidden transition-shadow duration-[var(--dur-3)] hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-2)]",
          className,
        )}
      >
        <div className={cn("relative h-44 overflow-hidden bg-gradient-to-br", gradient)}>
          <img
            src={screenshotUrl}
            alt={`${project.name} screenshot`}
            className="h-full w-full object-cover object-top transition-transform duration-[var(--dur-3)] group-hover:scale-105"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="default" size="sm" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
