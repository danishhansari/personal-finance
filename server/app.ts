import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";
import { authRoute } from "./routes/auth";

const app = new Hono().get("/", async (c) => {
  return c.json({ message: "Hello world" });
});

app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/", authRoute)
  .route("/expenses", expenseRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
