import { insertExpenseSchema } from "./db/schema/expenses";
export const expenseSchema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true,
});

export const createExpenseSchema = expenseSchema.omit({ id: true });
