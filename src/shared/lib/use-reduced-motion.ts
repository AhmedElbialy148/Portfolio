/**
 * @file shared/lib/use-reduced-motion.ts
 * Hook that tracks the user's reduced-motion preference.
 */

import { useEffect, useState } from "react"

/**
 * Returns whether the user prefers reduced motion.
 *
 * @returns true when prefers-reduced-motion: reduce is active
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(function subscribeToMotionPreference() {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    function handleChange(e: MediaQueryListEvent) {
      setReduced(e.matches)
    }
    mq.addEventListener("change", handleChange)
    return function unsubscribeFromMotionPreference() {
      mq.removeEventListener("change", handleChange)
    }
  }, [])

  return reduced
}
