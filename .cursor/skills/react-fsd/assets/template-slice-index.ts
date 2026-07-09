/**
 * @file <layer>/<slice>/index.ts
 * Public API for the <slice> slice. Only symbols re-exported below may be
 * consumed from outside the slice.
 */

// UI ---------------------------------------------------------------
export { ExampleComponent } from "./ui/example-component"

// Model ------------------------------------------------------------
export { useExample } from "./model/use-example"
export type { ExampleState } from "./model/types"

// API --------------------------------------------------------------
export { fetchExample } from "./api/fetch-example"
