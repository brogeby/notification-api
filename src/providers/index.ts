import { NotificationBody, StatusTypes } from "./../types.ts";
type Notification = {
  content: string;
};

export interface Provider {
  send: (notification: NotificationBody) => Promise<StatusTypes>;
}
