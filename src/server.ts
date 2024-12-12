import { Hono } from "hono";
import { cors } from "hono/cors";
import * as queue from "./queue.ts";

const app = new Hono();

app.use("*", cors());

app.post("/send-notification", (c) => {
  queue.push("waddup");
  return c.text("OK", 200);
});

export function run() {
  Deno.serve(app.fetch);
}
