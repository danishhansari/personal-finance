import {
  pgTable,
  serial,
  index,
  text,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("expenses_user_id_idx").on(expenses.userId),
    };
  }
);

export const insertExpenseSchema = createInsertSchema(expenses, {
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  amount: z.number().positive().max(9999999999.99, {
    message: "Amount must be a valid number with up to 2 decimal places",
  }),
});

export const selectExpenseSchema = createSelectSchema(expenses);
