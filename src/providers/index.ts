import {
  NotificationBody,
  Provider as ProviderTypes,
  StatusTypes,
} from "./../types.ts";
import email from "./email.ts";
import teams from "./teams.ts";
import slack from "./slack.ts";
import sms from "./sms.ts";

const providers: Record<ProviderTypes, Provider> = {
  email,
  teams,
  slack,
  sms,
};

export default providers;

export abstract class Provider {
  abstract send(notification: NotificationBody): Promise<StatusTypes>;
}
