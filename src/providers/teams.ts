import { Provider } from "./index.ts";
import { NotificationBody, StatusTypes } from "../types.ts";
import ProviderError from "./error.ts";

class Teams implements Provider {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async send(notification: NotificationBody): Promise<StatusTypes> {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      "@type": "MessageCard",
      "@context": "https://schema.org/extensions",
      "summary": notification.content.subject,
      "themeColor": "0076D7",
      "title": notification.content.subject,
      "text": notification.content.body,
      "sections": [
        {
          "activityTitle":
            `${notification.contact.first_name} ${notification.contact.last_name}`,
          "activitySubtitle": notification.contact.email,
        },
      ],
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new ProviderError("Failed to send notification to Microsoft Teams");
    }

    return "success";
  }
}

const teamsWebhookUrl = Deno.env.get("TEAMS_WEBHOOK_URL");

if (!teamsWebhookUrl) {
  throw new Error("Missing Microsoft Teams provider config");
}

export default new Teams(teamsWebhookUrl);
