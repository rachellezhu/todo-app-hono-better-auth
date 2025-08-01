import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { todos } from "@/db/schema";
import { auth } from "@/lib/auth";

export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;
export type UpdateTodo = Pick<NewTodo, "title" | "description" | "completed">;

export type HonoEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};
