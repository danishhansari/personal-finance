import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

interface MyRouteContext {
  queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: Root,
});

const Navbar = () => {
  return (
    <>
      <div className="p-2 md:p-4 flex justify-center md:justify-start gap-2 md:gap-4">
        {/* Navigation Links */}
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
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
    </>
  );
}
