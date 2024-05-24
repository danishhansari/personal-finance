import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";

const app = new Hono();
app.use("*", logger());
app.route("/api/expense", expenseRoute);
app.get("/", (c) => c.text("Hono!"));

app.get("/test", (c) => c.json("Hello test"));

export default app;
