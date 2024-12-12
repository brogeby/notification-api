import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from './db.ts';
import { push } from './queue.ts';

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.text("Hello JOsef"));

app.get('/hehe', (c) => {
  const pep = db.prepare('select * from people')
  return c.body(JSON.stringify(pep));
});

app.post('/send-notification', (c) => {
  push('waddup');
  return c.text('OK!!!!!');
});

export function run() {
  Deno.serve(app.fetch);
}
