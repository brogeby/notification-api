import { NotificationBody, StatusTypes } from "./../types.ts";

export abstract class Provider {
  abstract send(notification: NotificationBody): Promise<StatusTypes>;
}
