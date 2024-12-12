import { run } from './server.ts';
import { mig } from './db.ts';
import { start } from './queue.ts';

mig();
run();
start();