/**
 * @file shared/config/asset-slots.ts
 * Documents where to drop real binary assets (screenshots, resume, photo).
 */

/** Asset slot paths — replace placeholders with real files at these locations. */
export const ASSET_SLOTS = {
  /** Resume PDF at public/Ahmed_Adel_CV.pdf */
  resume: "/Ahmed_Adel_CV.pdf",
  /** Hero portrait at public/assets/profile-cutout.webp — 800x1200 WebP with a transparent background. */
  portrait: "/assets/profile-cutout.webp",
  /** Lottie animations served from public/assets/lotties/ */
  lotties: {
    coding: "/assets/lotties/codinglottie.json",
    stacks: "/assets/lotties/stackslottie.json",
    cloud: "/assets/lotties/cloudlottie.json",
    ai: "/assets/lotties/ai-lottie.json",
    frontend: "/assets/lotties/frontend-lottie.json",
  },
  projectScreenshot: (id: string) => `/assets/projects/${id}.png`,
} as const

/** Gradient placeholder classes keyed by imageSlot id. */
export const GRADIENT_PLACEHOLDERS: Record<string, string> = {
  "gradient-1": "from-amber-900/80 via-stone-900 to-zinc-950",
  "gradient-2": "from-yellow-800/70 via-neutral-900 to-black",
  "gradient-3": "from-orange-900/60 via-stone-950 to-zinc-900",
  "gradient-4": "from-amber-800/50 via-neutral-950 to-black",
  "gradient-5": "from-yellow-900/40 via-stone-900 to-zinc-950",
  "gradient-6": "from-amber-700/50 via-neutral-900 to-black",
  "gradient-7": "from-yellow-800/60 via-stone-950 to-zinc-900",
  "gradient-8": "from-orange-800/50 via-neutral-950 to-black",
}

/**
 * Returns the Tailwind gradient classes for a project image slot.
 *
 * @param slot - the imageSlot id from site-data
 * @returns gradient class string
 */
export function getProjectGradient(slot: string): string {
  return GRADIENT_PLACEHOLDERS[slot] ?? GRADIENT_PLACEHOLDERS["gradient-1"] ?? ""
}
