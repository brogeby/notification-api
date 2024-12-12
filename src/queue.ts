import { db } from "./db.ts";
import * as providers from "./providers/index.ts";
import ProviderError from "./providers/error.ts";
import { Message, NotificationBody, Status } from "./types.ts";
import email from "./providers/email.ts";

export function start() {
  console.log("queue started");
  setInterval(() => {
    const messages = db
      .prepare(
        `
            select *
            from messages
            where handled = false;
            `,
      )
      .all<Message>();

    for (const message of messages) {
      try {
        switch (message.name) {
          case "email":
            email.send(message);
            break;

          default:
            throw new Error("Could not find a matching provider");
        }
      } catch (err) {
        if (err instanceof ProviderError) {
          pushMessage(message.name);
        }

        db.prepare(
          `
            update messages
            set status = 'failed'
            where id = ?
          `,
        ).run(message.id);
      }
    }
  }, 2000);
}

export function pushMessage(message: Message) {
  db.prepare(
    `
        insert into messages (name)
        values (?);
        `,
  ).run(message.name);
}

export function pushNotification(body: string) {
  db.prepare(
    `
        insert into notifications (body)
        values (?);
        `,
  ).run(body);
}

export function pushStatus(
  { status, notification_id, message_id }: Status,
) {
  db.prepare(
    `
    INSERT INTO statuses (status, notification_id, message_id)
    VALUES (?, ?, ?);
    `,
  ).run(status, notification_id, message_id);
}
