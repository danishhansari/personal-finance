import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getUser } from "../kinde";
import { expenses as expenseTable } from "../db/schema/expenses";
import { db } from "../db";
import { eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(25),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;
const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: "30" },
  { id: 2, title: "Rent", amount: "90" },
  { id: 3, title: "Cab", amount: "80" },
];

export const expenseRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id));

    return c.json({ expenses: expenses });
  })
  .get("/total-spent", getUser, (c) => {
    const total = fakeExpenses.reduce(
      (acc, example) => acc + +example.amount,
      0
    );
    return c.json({ total });
  })
  .post("/", zValidator("json", createPostSchema), getUser, async (c) => {
    const expense = c.req.valid("json");
    const user = c.var.user;

    const result = await db
      .insert(expenseTable)
      .values({ ...expense, userId: user.id })
      .returning();
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json({ result });
  })
  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
