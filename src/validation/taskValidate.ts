import z from "zod";

export const zTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(300).optional(),
  status: z.string().optional(),
  projectId: z.string(),
  dueDate: z.coerce.date().optional(),
});

export type ITask = z.infer<typeof zTaskSchema>
