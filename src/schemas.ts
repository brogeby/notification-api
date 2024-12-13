import { z } from "npm:zod";

export const ProviderSchema = z.enum(["teams", "email", "slack", "sms"]);

export const ContactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  teams_url: z.string().url().optional(),
  slack_url: z.string().url().optional(),
});

export const ContentSchema = z.object({
  subject: z.string(),
  body: z.string(),
});

export const NotificationBodySchema = z
  .object({
    providers: z.array(ProviderSchema),
    contact: ContactSchema,
    content: ContentSchema,
    run_after: z.string().optional(),
    product: z.record(z.string()),
  })
  .refine(
    (data) =>
      !data.providers.includes("teams") ||
      (data.contact.teams_url && data.contact.teams_url.trim() !== ""),
    {
      message:
        "If 'teams' is included in providers, 'contact.teams_url' must be provided and non-empty.",
      path: ["contact", "teams_url"],
    },
  )
  .refine(
    (data) =>
      !data.providers.includes("sms") ||
      (data.contact.phone && data.contact.phone.trim() !== ""),
    {
      message:
        "If 'sms' is included in providers, 'contact.phone' must be provided and non-empty.",
      path: ["contact", "phone"],
    },
  )
  .refine(
    (data) =>
      !data.providers.includes("slack") ||
      (data.contact.slack_url && data.contact.slack_url.trim() !== ""),
    {
      message:
        "If 'slack' is included in providers, 'contact.slack_url' must be provided and non-empty.",
      path: ["contact", "slack_url"],
    },
  ).refine(
    (data) =>
      !data.providers.includes("email") ||
      (data.contact.email && data.contact.email.trim() !== ""),
    {
      message:
        "If 'email' is included in providers, 'contact.email' must be provided and non-empty.",
      path: ["contact", "email"],
    },
  );

export const StatusTypesSchema = z.enum(["success", "failed", "pending"]);

export const MessageSchema = z.object({
  id: z.number(),
  name: ProviderSchema,
  payload: z.string(),
  handled: z.boolean(),
  created_at: z.date(),
  run_after: z.date().nullable(),
  status: StatusTypesSchema,
});

export const StatusSchema = z.object({
  status: StatusTypesSchema,
  message_id: z.number(),
  notification_id: z.number(),
});
