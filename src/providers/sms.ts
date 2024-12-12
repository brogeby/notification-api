import { Provider } from "./index.ts";
import { NotificationBody, Status, StatusTypes } from "../types.ts";
import ProviderError from "./error.ts";

class SMS implements Provider {
  private url: string;
  private apiKey: string;

  constructor(url: string, apiKey: string) {
    this.url = url;
    this.apiKey = apiKey;
  }

  async send(notification: NotificationBody): Promise<StatusTypes> {
    const message = new URLSearchParams(notification.content);
    const body = {
      from: "GRADE_AB",
      to: notification.contact.phone,
      message: message.toString(),
    };
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new ProviderError(
        `Failed to send SMS`,
      );
    }

    return "success";
  }
}

const smsApiKey = Deno.env.get("SMS_API_KEY");
const smsUrl = Deno.env.get("SMS_URL");

if (!smsApiKey || !smsUrl) {
  throw new Error("Missing Email provider config");
}

export default new SMS(smsUrl, smsApiKey);
