import { run } from "./server.ts";
import { migrate } from "./db.ts";
import { start } from "./queue.ts";

migrate();
run();
start();
