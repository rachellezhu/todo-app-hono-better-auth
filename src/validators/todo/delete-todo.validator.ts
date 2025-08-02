import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const deleteTodoSchema = z
  .object({
    id: z.uuid(),
  })
  .strict();

export const deleteTodoValidator = zValidator(
  "json",
  deleteTodoSchema,
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
