import { db } from "@/db/db";
import { todos } from "@/db/schema";
import { NewTodo, Todo } from "@/types";
import { eq } from "drizzle-orm";

export const insertTodo = async (todo: NewTodo): Promise<Todo> => {
  const [result] = await db.insert(todos).values(todo).returning();

  return result;
};

export const getTodosByUserId = async (
  userId: Todo["userId"]
): Promise<Todo[]> => {
  const todoList = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(todos.createdAt);

  return todoList;
};
