import z from "zod";

export const zUserSchema = z.object({
  firstName: z.string().min(2).max(50).trim(),
  lastName: z.string().min(2).max(50).trim(),
  email: z.email("Invalid email format").lowercase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterInput = z.infer<typeof zUserSchema>