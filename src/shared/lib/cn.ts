/**
 * @file shared/lib/cn.ts
 * Merges Tailwind class names with conflict resolution.
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names and resolves Tailwind conflicts.
 *
 * @param inputs - class name values
 * @returns merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
