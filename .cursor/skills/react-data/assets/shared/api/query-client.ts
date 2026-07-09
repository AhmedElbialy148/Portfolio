/**
 * @file shared/api/query-client.ts
 * TanStack Query client with sensible defaults for the SPA.
 */

import { QueryClient } from "@tanstack/react-query"

/** Application-wide TanStack Query client. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
})
