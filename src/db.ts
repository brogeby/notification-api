import { Database } from "jsr:@db/sqlite@0.12";

export const db = new Database("test.db");

export function mig () {
    console.log('ehhe');
    /*
   body:
    providers: []
    contact: [{
    first_name:
    last_name:
    email:
    phone:
    teams_url:
    slack_url
    }]
    product: {
        // account details
    }
    delivery_at:  
    */
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
        CREATE TABLE IF NOT EXISTS statuses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          status TEXT CHECK(status IN ('success', 'pending', 'failed')),
          notification_id INTEGER,
          message_id INTEGER
        );
        `
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
        `
    ).run();
}