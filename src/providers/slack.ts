import { NotificationBody, StatusTypes } from "../types.ts";
import { Provider } from "./index.ts";

class Slack implements Provider {
  send(notification: NotificationBody): Promise<StatusTypes> {
    console.log(notification);
    return Promise.resolve("success");
  }
}

export default new Slack();
