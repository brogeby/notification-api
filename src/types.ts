export type Provider = "teams" | "email" | "slack";

export type Contact = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  teams_url: string;
  slack_url: string;
};

export type Content = {
  subject: string;
  body: string;
};

export type NotificationBody = {
  providers: Provider;
  contact: Contact;
  content: Content;
  delivery_at: string;
  product: Record<string, string>;
};

export type Message = {
  id: number;
  name: string;
};

export type Status = {
  status: StatusTypes;
  message_id: number;
  notification_id: number;
};

export type StatusTypes = "success" | "failed" | "pending";
