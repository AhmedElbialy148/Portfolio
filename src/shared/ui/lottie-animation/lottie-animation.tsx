/**
 * @file shared/ui/lottie-animation/lottie-animation.tsx
 * Lazy-loaded Lottie player with reduced-motion fallback.
 */

import Lottie from "lottie-react"
import { useEffect, useState } from "react"
import { cn } from "@/shared/lib/cn"

/** Props for {@link LottieAnimation}. */
export interface LottieAnimationProps {
  /** URL path to the Lottie JSON file. */
  src: string
  /** Additional class names for the wrapper. */
  className?: string
  /** Whether the animation loops. */
  loop?: boolean
  /** Accessible label for the animation. */
  ariaLabel?: string
}

/**
 * Renders a Lottie animation fetched from a public JSON path.
 *
 * @param props - see {@link LottieAnimationProps}
 */
export function LottieAnimation({
  src,
  className,
  loop = true,
  ariaLabel = "Animation",
}: LottieAnimationProps) {
  const [data, setData] = useState<object | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(function detectReducedMotion() {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    function handleMotionPreferenceChange(e: MediaQueryListEvent) {
      setReducedMotion(e.matches)
    }
    mq.addEventListener("change", handleMotionPreferenceChange)
    return function removeMotionPreferenceListener() {
      mq.removeEventListener("change", handleMotionPreferenceChange)
    }
  }, [])

  useEffect(function fetchLottieData() {
    let cancelled = false
    async function loadAnimation() {
      try {
        const res = await fetch(src)
        const json: object = await res.json()
        if (!cancelled) setData(json)
      } catch {
        if (!cancelled) setData(null)
      }
    }
    void loadAnimation()
    return function cancelLottieFetch() {
      cancelled = true
    }
  }, [src])

  if (reducedMotion || !data) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-[var(--radius-3)] bg-[var(--color-accent-soft)]",
          className,
        )}
        aria-hidden
      >
        <div className="h-16 w-16 rounded-full border-2 border-dashed border-[var(--color-accent)]/40" />
      </div>
    )
  }

  return (
    <div className={cn("pointer-events-none", className)} aria-label={ariaLabel} role="img">
      <Lottie animationData={data} loop={loop} className="h-full w-full" />
    </div>
  )
}
