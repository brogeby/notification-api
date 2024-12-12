import { db } from './db.ts';
import * as providers from "./providers/index.ts";
om './providers/index.ts';

type Message = {
    id: number,
    name: string
}

export async function start () {
    console.log('queue started');
    setInterval(() => {
        const messages = db.prepare(
            `
            select *
            from messages
            where handled = false;
            `
        ).all<Message>();

        for (const message of messages) {
            try {
            switch (message.name) {
                case "email":
                    providers.email.default(message);
                    break;
                
                default:
                    throw new Error('Could not find a matching provider');
            }
            } catch (err) {
                if (err instanceof providers.ProviderError) {
                    push(message.name);
                }

                db.prepare(
                    `
                    update messages
                    set status = "failed"
                    where id = ?
                    `
                ).run(message.id);
            }

            // db.prepare(
            //     `
            //     update messages
            //     set status = "success"
            //     where 
            //     `
            // )
        }
    }, 2000);
};

export function push (name: string) {
    db.prepare(
        `
        insert into messages (name)
        values (?);
        `
    ).run(name);
}