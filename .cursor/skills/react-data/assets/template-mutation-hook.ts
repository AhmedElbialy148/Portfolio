/**
 * @file features/<feature>/model/use-<action>.ts
 * Mutation hook for a feature action.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/update-profile"
import { userKeys } from "@/entities/user"

/**
 * Exposes the profile update mutation and its pending/error state.
 *
 * @returns mutation object with `mutate`, `isPending`, `error`
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: function invalidateUserDetail(data) {
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) })
    },
  })
}
