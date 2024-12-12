import { Provider } from "./index.ts";
import { NotificationBody, StatusTypes } from "../types.ts";
import ProviderError from "./error.ts";

class Email implements Provider {
  url: string;
  apiKey: string;

  constructor(url: string, apiKey: string) {
    this.url = url;
    this.apiKey = apiKey;
  }

  async send(notification: NotificationBody): Promise<StatusTypes> {
    const headers = {
      "Content-type": "application/json",
      "Authorization": "Bearer " + this.apiKey,
    };
    const body = {
      from: {
        email: "info@grade.com",
        name: "Grade AB",
      },
      to: [{
        email: notification.contact.email,
        name:
          `${notification.contact.first_name} ${notification.contact.last_name}`,
      }],
      subject: notification.content.subject,
      text: notification.content.body,
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error(await response.text());
      throw new ProviderError("Failed to send email");
    }
    return "success";
  }
}

const emailApiKey = Deno.env.get("EMAIL_API_KEY");
const emailUrl = Deno.env.get("EMAIL_URL");

if (!emailApiKey || !emailUrl) {
  throw new Error("Missing Email provider config");
}

export default new Email(emailUrl, emailApiKey);
