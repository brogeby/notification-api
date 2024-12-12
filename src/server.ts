import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "./db.ts";
import * as queue from "./queue.ts";
import { NotificationBody } from "./types.ts";

const app = new Hono();

app.use("*", cors());

app.post("/send-notification", async (c) => {
  const body = await c.req.json<NotificationBody>();
  // queue.pushNotification(body);
  queue.pushMessage(body);

  return c.text("OK", 200);
});

app.get("/status/:id", (c) => {
  const id = c.req.param("id");

  const messages = db.prepare(
    `
    select *
    from messages
    where id = ?;
    `,
  ).all(id);
  return c.json(messages);
});

app.post("/webhook/:provider", (c) => {
  return c.json({ message: "ok", provider: c.req.param("provider") });
});

export function run() {
  Deno.serve(app.fetch);
}
