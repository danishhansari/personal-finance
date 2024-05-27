import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import {
  createExpense,
  getAllExpensesQueryOption,
  loadingCreateExpenseQueryOptions,
} from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOption
      );
      navigate({ to: "/expenses" });

      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value,
      });
      try {
        const newExpense = await createExpense({ value });

        queryClient.setQueryData(getAllExpensesQueryOption.queryKey, {
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses],
        });

        toast("Expense created", {
          description: `Successfully created new expenses: ${newExpense.id}`,
        });
        
      } catch (error) {
        toast("Error", {
          description: "Failed to create new expense",
        });
      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });
  return (
    <div className="p-2">
      <form
        className="max-w-md mx-auto flex flex-col items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h2 className="mr-auto">Create Expenses</h2>

        <form.Field
          name="title"
          children={(field) => (
            <div className="w-full">
              <Label htmlFor={field.name}>Title</Label>
              <Input
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                id={field.name}
                placeholder="Title"
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <div className="w-full">
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                id={field.name}
                placeholder="Amount"
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button className="mt-4" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
