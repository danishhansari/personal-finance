import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

// const [date, setDate] = React.useState<Date | undefined>(new Date());
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: "",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("server error");
      }
      navigate({ to: "/expenses" });
    },
  });
  return (
    <div className="p-2">
      <h2>Create Expenses</h2>
      <form
        className="max-w-xl mx-auto flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => (
            <div>
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
            <div>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                id={field.name}
                placeholder="Amount"
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="date"
          children={(field) => {
            <div className="self-care">
              <Calendar
                mode="single"
                selected={field.state.value}
                onSelect={(e) => field.handleChange(e.target.value)}
                className="rounded-md border"
              />
              ;
            </div>;
          }}
        />
        ;
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
