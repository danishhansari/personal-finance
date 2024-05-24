import app from "./app";

Bun.serve({
  port: 8000,
  fetch: app.fetch,
});

console.log("server running");
