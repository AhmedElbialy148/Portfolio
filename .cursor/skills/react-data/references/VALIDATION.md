# Boundary validation with Zod

Any value crossing into the app from outside goes through a Zod schema before it becomes a typed value.

## Where schemas live

| Source | Schema location |
|--------|-----------------|
| Entity from API | `entities/<entity>/model/types.ts` |
| Form input | `features/<feature>/model/<form>-schema.ts` |
| URL params | `views/<view>/model/params-schema.ts` |
| localStorage | `shared/lib/storage-schemas.ts` |

## Entity schema pattern

```ts
/**
 * @file entities/user/model/types.ts
 * User entity types and Zod schemas.
 */
import { z } from "zod"

/** Zod schema for a user returned by the API. */
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.coerce.date(),
})

/** A user as returned by the API. */
export type User = z.infer<typeof UserSchema>

/** Zod schema for a list of users. */
export const UserListSchema = z.array(UserSchema)
```

## Parsing in fetch functions

```ts
export async function fetchUser(id: string): Promise<User> {
  const json: unknown = await apiClient.get(`/users/${id}`)
  return UserSchema.parse(json)
}
```

`parse()` throws `ZodError` on mismatch. The API client or a wrapper maps it to `ValidationError`.

## Safe parse for optional validation

When validation failure is expected and handled:

```ts
const result = UserSchema.safeParse(json)
if (!result.success) {
  throw new ValidationError("Invalid user response", result.error.flatten())
}
return result.data
```

## Form validation

```ts
export const LoginFormSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type LoginFormValues = z.infer<typeof LoginFormSchema>
```

Use with react-hook-form + `@hookform/resolvers/zod`:

```ts
const form = useForm<LoginFormValues>({
  resolver: zodResolver(LoginFormSchema),
})
```

## URL param validation

```ts
const SearchParamsSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
})

const params = SearchParamsSchema.parse(Object.fromEntries(searchParams))
```

## Never type-assert boundary data

```ts
// ❌
const user = json as User

// ❌
const user: User = await res.json()

// ✅
const json: unknown = await res.json()
const user = UserSchema.parse(json)
```

## Partial updates

For PATCH bodies, use `.partial()` or a dedicated update schema:

```ts
export const UpdateUserSchema = UserSchema.pick({ name: true, email: true }).partial()
```

Don't reuse the full entity schema for mutations — the server may accept a subset.
