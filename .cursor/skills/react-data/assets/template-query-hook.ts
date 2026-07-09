/**
 * @file entities/<entity>/model/use-<entity>.ts
 * TanStack Query hook for loading a single entity.
 */

import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../api/fetch-user"
import { userKeys } from "../api/query-keys"

/**
 * Loads a user by id and exposes TanStack Query state.
 *
 * @param id - the user's uuid
 * @returns query result with `data`, `isPending`, `error`
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: function queryUser() {
      return fetchUser(id)
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  })
}
