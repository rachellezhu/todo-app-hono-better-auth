import { db } from "@/db/db";
import { todos } from "@/db/schema";
import { NewTodo, Todo, UpdateTodo } from "@/types";
import { and, eq } from "drizzle-orm";

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

export const updateTodo = async (
  id: Todo["id"],
  userId: Todo["userId"],
  todo: UpdateTodo
): Promise<Todo> => {
  const [result] = await db
    .update(todos)
    .set(todo)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)))
    .returning();

  return result;
};

export const deleteTodo = async (
  id: Todo["id"],
  userId: Todo["userId"]
): Promise<Todo> => {
  const [result] = await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)))
    .returning();

  return result;
};
