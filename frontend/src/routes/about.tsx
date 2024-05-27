import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      In today's fast-paced world, managing personal finances efficiently is
      crucial for maintaining financial stability and achieving long-term
      financial goals. An expense tracker serves as an invaluable tool in this
      endeavor, offering numerous benefits:
    </div>
  );
}
