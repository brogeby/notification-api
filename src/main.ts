import { run } from "./server.tsx";
import { migrate } from "./db.ts";
import { start } from "./queue.ts";

migrate();
run();
start();
