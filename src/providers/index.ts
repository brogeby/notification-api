import { NotificationBody, StatusTypes } from "./../types.ts";

export interface Provider {
  send: (notification: NotificationBody) => Promise<StatusTypes>;
}
