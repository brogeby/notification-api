import { db } from "./db.ts";
import ProviderError from "./providers/error.ts";
import { Message, NotificationBody, Status } from "./types.ts";
import email from "./providers/email.ts";
import teams from "./providers/teams.ts";

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
            email.send(JSON.parse(message.payload));

            db.prepare(
              `
              update messages
              set handled = 1, status = 'success'
              where id = ?
            `,
            ).run(message.id);
            break;

          case "teams":
            teams.send(JSON.parse(message.payload));

            db.prepare(
              `
              update messages
              set handled = 1, status = 'success'
              where id = ?
            `,
            ).run(message.id);
            break;

          default:
            throw new Error("Could not find a matching provider");
        }
      } catch (err) {
        if (err instanceof ProviderError) {
          // pushMessage(message);
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

export function pushMessage(notificationBody: NotificationBody) {
  for (const provider of notificationBody.providers) {
    db.prepare(
      `
      insert into messages (name, payload)
      values (?, ?);
      `,
    ).run(provider, JSON.stringify(notificationBody));
  }
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
