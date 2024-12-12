import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.text("Hello JOsef"));

export function run() {
  Deno.serve(app.fetch);
}
