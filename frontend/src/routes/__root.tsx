import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
interface MyRouteContext {
  queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: Root,
});

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between p-2 max-w-2xl m-auto items-baseline">
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold">Expense Tracker</h1>
        </Link>

        <div className="flex gap-2 md:gap-4">
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/expenses" className="[&.active]:font-bold">
            Expenses
          </Link>
          <Link to="/create-expense" className="[&.active]:font-bold">
            Create Expense
          </Link>
          <Link to="/profile" className="[&.active]:font-bold">
            Profile
          </Link>
        </div>
      </div>
    </>
  );
};

function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <div className="p-2 max-w-2xl m-auto">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}
