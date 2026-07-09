/**
 * @file entities/<entity>/model/types.ts
 * Entity types and Zod schemas for boundary validation.
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

/** Zod schema for partial user updates. */
export const UpdateUserSchema = UserSchema.pick({ name: true, email: true }).partial()

/** Partial user update payload. */
export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>
