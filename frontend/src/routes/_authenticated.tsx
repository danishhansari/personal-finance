import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/api";
import { Outlet, createFileRoute } from "@tanstack/react-router";

const Login = () => {
  return (
    <div>
      <p>You have to login</p>
      <a href="/api/login">
        <Button>Login</Button>
      </a>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (error) {
      return { user: null };
    }
  },
  component: Component,
});
