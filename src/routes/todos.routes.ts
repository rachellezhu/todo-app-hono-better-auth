import { getTodosByUserId, insertTodo, updateTodo } from "@/db/queries";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { HonoEnv } from "@/types";
import { createTodoValidator } from "@/validators/create-todo.validator";
import { updateTodoValidator } from "@/validators/update-todo.validator";
import { Hono } from "hono";

export const todos = new Hono<HonoEnv>();

todos.use(authMiddleware);

todos.get("/", async (c) => {
  const user = c.get("user");

  try {
    const todoList = await getTodosByUserId(user.id);
    return c.json(todoList);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return c.json(
      {
        error: "Failed to fetch todos",
      },
      500
    );
  }
});

todos.post("/", createTodoValidator, async (c) => {
  const user = c.get("user");
  const todoData = c.req.valid("json");

  try {
    const newTodo = await insertTodo({ ...todoData, userId: user.id });
    return c.json(newTodo, 201);
  } catch (error) {
    console.error("Error creating todo", error);
    return c.json(
      {
        error: "Failed to create todo",
      },
      500
    );
  }
});

todos.patch("/", updateTodoValidator, async (c) => {
  const user = c.get("user");
  const { id, title, description, completed } = c.req.valid("json");

  try {
    const updatedTodo = await updateTodo(id, user.id, {
      title,
      description,
      completed,
    });
    return c.json(updatedTodo, 200);
  } catch (error) {
    return c.json(
      {
        error: "Failed to update todo",
      },
      500
    );
  }
});
