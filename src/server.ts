import { Hono } from "@hono/hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.text("Hello world"));

export function run() {
  Deno.serve(app.fetch);
}
