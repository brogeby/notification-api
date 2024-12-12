import { Hono } from "jsr:@hono/hono"; 

const app = new Hono();

app.get("/", c => c.text("Hello world"));

export function run () {
  Deno.serve(app.fetch);
};
