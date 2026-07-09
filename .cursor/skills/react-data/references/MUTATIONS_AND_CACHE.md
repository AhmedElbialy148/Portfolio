# Mutations and cache management

## Mutation hook placement

Mutations live in `features/<feature>/model/use-<action>.ts` and call `features/<feature>/api/<action>.ts`.

```ts
/**
 * @file features/edit-profile/model/use-update-profile.ts
 * Mutation hook for updating the user's profile.
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
```

## Invalidation rules

| After this mutation | Invalidate |
|---------------------|------------|
| Create entity | `entityKeys.lists()` |
| Update entity | `entityKeys.detail(id)` + optionally `entityKeys.lists()` |
| Delete entity | `entityKeys.detail(id)` + `entityKeys.lists()` |
| Login / logout | All auth-dependent queries (`userKeys.all`, etc.) |

Never `queryClient.invalidateQueries()` with no key — that nukes the entire cache.

## Optimistic updates

For mutations where the UI should update before the server confirms:

```ts
return useMutation({
  mutationFn: updateTodo,
  onMutate: async function optimisticallyUpdateTodo(variables) {
    await queryClient.cancelQueries({ queryKey: todoKeys.detail(variables.id) })
    const previous = queryClient.getQueryData(todoKeys.detail(variables.id))
    queryClient.setQueryData(todoKeys.detail(variables.id), variables)
    return { previous }
  },
  onError: function revertOptimisticUpdateTodo(_err, variables, context) {
    if (context?.previous) {
      queryClient.setQueryData(todoKeys.detail(variables.id), context.previous)
    }
  },
  onSettled: function settleTodoUpdate(_data, _err, variables) {
    void queryClient.invalidateQueries({ queryKey: todoKeys.detail(variables.id) })
  },
})
```

## Local store patches (no refetch)

When the API response contains the updated entity, patch the cache directly instead of invalidating:

```ts
onSuccess: function patchTodoInCache(updatedTodo) {
  queryClient.setQueryData(todoKeys.detail(updatedTodo.id), updatedTodo)
  queryClient.setQueryData<Todo[]>(todoKeys.lists(), function updateListInCache(old) {
    if (!old) return old
    return old.map(function replaceTodo(t) {
      return t.id === updatedTodo.id ? updatedTodo : t
    })
  })
}
```

Prefer cache patches over invalidation when the response is authoritative.

## Mutation error handling in UI

```tsx
const { mutate, isPending, error } = useUpdateProfile()

function handleSave() {
  mutate(formData, {
    onError: function showUpdateError(err) {
      toast.error(isApiError(err) ? err.message : "Failed to save profile")
    },
  })
}
```

## Pending state in UI

Show inline pending state on the triggering control, not a full-page spinner:

```tsx
<Button disabled={isPending} onClick={handleSave}>
  {isPending ? "Saving…" : "Save"}
</Button>
```
