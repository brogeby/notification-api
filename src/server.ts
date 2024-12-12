import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "./db.ts";
import * as queue from "./queue.ts";

const app = new Hono();

app.use("*", cors());

app.post("/send-notification", (c) => {
  queue.push("waddup");
  return c.text("OK", 200);
});

app.get("/status/:id", (c) => {
  const id = c.req.param('id');

  const messages = db.prepare(
    `
    select *
    from messages
    where id = ?;
    `
   ).all(id);
  return c.json(messages);
});

app.post("/webhook/:provider", (c) => {
  return c.json({ message: 'ok', provider: c.req.param('provider') });
});

export function run() {
  Deno.serve(app.fetch);
}
