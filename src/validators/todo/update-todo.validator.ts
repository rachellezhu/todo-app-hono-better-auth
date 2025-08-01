import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const updateTodoSchema = z
  .object({
    id: z.uuid(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    completed: z.boolean().default(false),
  })
  .strict();

export const updateTodoValidator = zValidator(
  "json",
  updateTodoSchema,
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          errors: result.error.issues.map((issue) => issue.message),
        },
        400
      );
    }
  }
);
