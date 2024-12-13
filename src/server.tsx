import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "npm:@hono/zod-validator";

import { db } from "./db.ts";
import * as queue from "./queue.ts";
import { Message, NotificationBody, StatusTypes } from "./types.ts";
import { NotificationBodySchema } from "./schemas.ts";

const app = new Hono();

app.use("*", cors());

app.post(
  "/send-notification",
  zValidator("json", NotificationBodySchema),
  async (c: Context) => {
    const body = await c.req.json<NotificationBody>();
    queue.pushMessage(body);

    return c.text("OK", 200);
  },
);

app.get("/messages", (c: Context) => {
  const colorMap: Record<StatusTypes, string> = {
    success: "green",
    failed: "red",
    pending: "orange",
  };

  const messages = db.prepare(`select * from messages`).all<Message>();

  return c.html(
    <div>
      <ul>
        {messages.map((message) => {
          return (
            <li key={message.id}>
              {message.id} {message.name}{" "}
              <span style={{ color: colorMap[message.status] }}>
                {message.status}
              </span>
              <br />
              <pre style="background-color: lightgray; padding: 1rem; display: inline-block; border-radius: 10px;">{JSON.stringify(JSON.parse(message.payload), null, 2)}</pre>
            </li>
          );
        })}
      </ul>
    </div>,
  );
});

app.get("/messages/:messageId", (c: Context) => {
  const messageId = c.req.param("messageId");

  const messages = db.prepare(
    `
    select * from messages where id = ?
    `,
  ).all<Message>(messageId);

  if (!messages.length) {
    return c.text("Message not found", 404);
  }

  return c.json(messages[0]);
});

app.post("/webhook/:provider", (c: Context) => {
  return c.json({ message: "ok", provider: c.req.param("provider") });
});

export function run() {
  Deno.serve(app.fetch);
}
