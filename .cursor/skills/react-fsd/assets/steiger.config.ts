/**
 * Steiger — FSD-aware architecture linter.
 *
 * Install:
 *   pnpm add -D steiger @feature-sliced/steiger-plugin
 *
 * Run:
 *   pnpm steiger ./src
 */
import { defineConfig } from "steiger"
import fsd from "@feature-sliced/steiger-plugin"

export default defineConfig([
  ...fsd.configs.recommended,

  {
    files: ["./src/**"],
    rules: {
      "fsd/public-api": "error",
      "fsd/no-cross-imports": "error",
      "fsd/no-higher-level-imports": "error",
      "fsd/excessive-slicing": "warn",
      "fsd/segments-by-purpose": "warn",
      "fsd/insignificant-slice": "warn",
    },
  },

  {
    files: ["./src/views/**"],
    settings: {
      "fsd/layer-alias": "pages",
    },
  },

  {
    ignores: ["./src/app/**"],
  },
])
