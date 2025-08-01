import { auth } from "@/lib/auth";
import { HonoEnv } from "@/types";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null!);
    c.set("session", null!);
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
