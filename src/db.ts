import { Database } from "jsr:@db/sqlite@0.12";

export const db = new Database("test.db");

export function migrate() {
  db.prepare("PRAGMA foreign_keys = ON;").run();

  db.prepare(
    `
        CREATE TABLE IF NOT EXISTS notifications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          body TEXT,
          created_at TIMESTAMP
        );
      `,
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      payload TEXT,
      handled BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      run_after TIMESTAMP,
      status TEXT DEFAULT 'pending' CHECK(status IN ('success', 'pending', 'failed'))
      );
      `,
  ).run();

  db.prepare(
    `
          CREATE TABLE IF NOT EXISTS statuses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status TEXT CHECK(status IN ('success', 'pending', 'failed')),
            notification_id INTEGER,
            message_id INTEGER,
            FOREIGN KEY (notification_id) REFERENCES notifications(id),
            FOREIGN KEY (message_id) REFERENCES messages(id)
          );
          `,
  ).run();
}
