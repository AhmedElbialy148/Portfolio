/**
 * @file shared/lib/use-reduced-motion.ts
 * Hook that tracks the user's reduced-motion preference.
 */

import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Returns whether the user prefers reduced motion.
 *
 * @returns true when prefers-reduced-motion: reduce is active
 */
export function useReducedMotion(): boolean {
  // Read synchronously on first render so components never mount with the wrong value.
  const [reduced, setReduced] = useState(function readInitialPreference() {
    return typeof window !== "undefined" && window.matchMedia(QUERY).matches
  })

  useEffect(function subscribeToMotionPreference() {
    const mq = window.matchMedia(QUERY)
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
